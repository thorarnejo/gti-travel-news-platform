'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AlertTriangle, AlertCircle, Info, XCircle, TrendingUp, Shield, CheckCircle, MapPin, FileText } from 'lucide-react'
import type { Article, Source } from '@/types'

interface ArticleSectionProps {
  article: Article
  className?: string
}

function formatSourceDate(dateStr?: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function SourceItem({ source }: { source: Source }) {
  return (
    <li className="flex flex-col gap-1 py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          {source.name}
        </a>
        {source.isOfficial && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium border border-emerald-200">
            <CheckCircle className="h-3 w-3" />
            Official
          </span>
        )}
      </div>
      {source.lastUpdated && (
        <span className="text-xs text-muted-foreground">
          Last updated: {formatSourceDate(source.lastUpdated)}
        </span>
      )}
    </li>
  )
}

function toRichHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*)$/gm, '<h4>$1</h4>')
    .replace(/^## (.*)$/gm, '<h3>$1</h3>')
    .replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />')
}

export function ArticleSection({ article, className }: ArticleSectionProps) {
  // Group sources by type
  const officialSources = article.sources.filter(s => s.type === 'official' || s.isOfficial)
  const newsSources = article.sources.filter(s => s.type === 'news' || (!s.type && !s.isOfficial))

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
        <ul className="space-y-2">
          {Array.isArray(article.tl_dr) ? (
            article.tl_dr.map((bullet, index) => (
              <li key={index} className="text-sm leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                {bullet}
              </li>
            ))
          ) : (
            <li className="text-sm leading-relaxed">{article.tl_dr}</li>
          )}
        </ul>
      </section>


      {/* What This Means for Travelers */}
      {article.whatThisMeans && (
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-md bg-blue-100">
              <Shield className="h-4 w-4 text-blue-700" />
            </div>
            <h3 className="font-semibold text-lg">What This Means for Travelers</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{article.whatThisMeans}</p>
        </section>
      )}

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
          <h3 className="font-semibold text-lg">Action Required</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{article.whatToDo}</p>
      </section>

      {/* Body Text */}
      {article.body && article.body.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-md bg-slate-100">
              <FileText className="h-4 w-4 text-slate-700" />
            </div>
            <h3 className="font-semibold text-lg">What Happened</h3>
          </div>
          <div className="space-y-5 text-[15px] leading-8 text-foreground/90">
            {article.body.map((paragraph, index) => (
              <div
                key={index}
                className="[&>blockquote]:border-l-4 [&>blockquote]:border-primary/40 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-base [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mb-2 [&>h4]:text-base [&>h4]:font-semibold [&>h4]:mb-2"
                dangerouslySetInnerHTML={{ __html: toRichHtml(paragraph) }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Impact Regions */}
      {article.impactRegions && article.impactRegions.length > 0 && (
        <section className="border border-border rounded-lg p-5">
          <h3 className="font-semibold mb-3">Impact Regions</h3>
          <div className="flex flex-wrap gap-2">
            {article.impactRegions.map((region) => (
              <Link
                key={region}
                href={`/location/${region.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 hover:text-slate-900 transition-colors"
              >
                <MapPin className="h-3 w-3 mr-1.5" />
                {region}
              </Link>
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
        
        {/* Official Sources */}
        {officialSources.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Official Sources</h4>
            <ul className="space-y-0">
              {officialSources.map((source, index) => (
                <SourceItem key={`official-${index}`} source={source} />
              ))}
            </ul>
          </div>
        )}
        
        {/* News Sources */}
        {newsSources.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">News & Analysis</h4>
            <ul className="space-y-0">
              {newsSources.map((source, index) => (
                <SourceItem key={`news-${index}`} source={source} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
