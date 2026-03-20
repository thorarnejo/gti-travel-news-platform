'use client'

import { cn } from '@/lib/utils'
import { AlertTriangle, AlertCircle, Info, XCircle, TrendingUp } from 'lucide-react'
import type { Article } from '@/types'

interface ArticleSectionProps {
  article: Article
  className?: string
}

export function ArticleSection({ article, className }: ArticleSectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* TL;DR - Summary */}
      <section className="bg-primary/5 border border-primary/20 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">TL;DR</h3>
        </div>
        <p className="text-sm leading-relaxed">{article.tl_dr}</p>
      </section>

      {/* What Changed */}
      <section className="border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-amber-100">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
          </div>
          <h3 className="font-semibold text-lg">What Changed</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{article.whatChanged}</p>
      </section>

      {/* Who Is Affected */}
      <section className="border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-blue-100">
            <AlertCircle className="h-4 w-4 text-blue-700" />
          </div>
          <h3 className="font-semibold text-lg">Who Is Affected</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{article.whoIsAffected}</p>
      </section>

      {/* What To Do */}
      <section className="border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-emerald-100">
            <XCircle className="h-4 w-4 text-emerald-700" />
          </div>
          <h3 className="font-semibold text-lg">What You Should Do</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{article.whatToDo}</p>
      </section>

      {/* Impact Regions */}
      {article.impactRegions && article.impactRegions.length > 0 && (
        <section className="border border-border rounded-lg p-5">
          <h3 className="font-semibold mb-3">Impact Regions</h3>
          <div className="flex flex-wrap gap-2">
            {article.impactRegions.map((region) => (
              <span
                key={region}
                className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm"
              >
                {region}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Sources */}
      <section className="border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-slate-100">
            <TrendingUp className="h-4 w-4 text-slate-700" />
          </div>
          <h3 className="font-semibold text-lg">Sources</h3>
        </div>
        <ul className="space-y-2">
          {article.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
