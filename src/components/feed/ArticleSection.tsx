'use client'

import { cn } from '@/lib/utils'
import { AlertTriangle, AlertCircle, Info, CheckCircle2, TrendingUp, Users, ArrowRight } from 'lucide-react'
import type { Article } from '@/types'

interface ArticleSectionProps {
  article: Article
  className?: string
}

function toList(text: string | null | undefined): string[] {
  if (!text) return []

  return text
    .split('\n')
    .map((line) => line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim())
    .filter(Boolean)
}

export function ArticleSection({ article, className }: ArticleSectionProps) {
  const changedItems = toList(article.what_changed)
  const affectedItems = toList(article.who_is_affected)
  const actionItems = toList(article.what_to_do)

  return (
    <div className={cn('space-y-5', className)}>
      <section className="bg-primary/5 border border-primary/20 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">TL;DR</h3>
        </div>
        <ul className="text-sm space-y-2">
          {article.tldr.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-amber-100">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
          </div>
          <h3 className="font-semibold text-lg">What changed</h3>
        </div>
        <ul className="space-y-2 text-sm text-foreground">
          {(changedItems.length > 0 ? changedItems : ['No details available.']).map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-amber-700 font-semibold">{idx + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-blue-200 bg-blue-50/40 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-blue-100">
            <Users className="h-4 w-4 text-blue-700" />
          </div>
          <h3 className="font-semibold text-lg">Who is affected</h3>
        </div>
        <ul className="space-y-2 text-sm text-blue-900">
          {(affectedItems.length > 0 ? affectedItems : ['Travelers in listed locations and routes.']).map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-emerald-200 bg-emerald-50/50 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-emerald-100">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
          </div>
          <h3 className="font-semibold text-lg">What to do now</h3>
        </div>

        <ul className="space-y-2 text-sm text-emerald-900 mb-4">
          {(actionItems.length > 0 ? actionItems : ['Monitor official updates.']).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <ArrowRight className="h-3.5 w-3.5 mt-1 shrink-0 text-emerald-700" />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-md border border-emerald-300 bg-white p-3">
          <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-1">Action</p>
          <p className="text-sm font-semibold text-emerald-900">
            Do these steps before departure / check-in to avoid disruption.
          </p>
        </div>
      </section>

      <section className="border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-slate-100">
            <TrendingUp className="h-4 w-4 text-slate-700" />
          </div>
          <h3 className="font-semibold text-lg">Sources</h3>
        </div>
        <ul className="space-y-2">
          {article.sources.map((source) => (
            <li key={source.id}>
              <a
                href={source.website_url || '#'}
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

      <section className="bg-muted rounded-lg p-4 border border-border">
        <div className="flex items-center gap-2 mb-1 text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <p className="text-xs uppercase tracking-wide font-semibold">Last updated</p>
        </div>
        <p className="text-sm font-medium">{new Date(article.updated_at).toLocaleString()}</p>
      </section>
    </div>
  )
}
