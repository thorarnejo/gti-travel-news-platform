'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AlertTriangle, AlertCircle, Info, XCircle, TrendingUp, Shield, CheckCircle, MapPin, FileText } from 'lucide-react'
import type { Article, Source } from '@/types'
import { sampleArticles } from '@/lib/data'

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

export function ArticleSection({ article, className }: ArticleSectionProps) {
  const categoryLabel = article.category.charAt(0).toUpperCase() + article.category.slice(1)
  const locationLabel = article.location.city 
    ? `${article.location.city}, ${article.location.country}`
    : article.location.country

  // Group sources by type
  const officialSources = article.sources.filter(s => s.type === 'official' || s.isOfficial)
  const newsSources = article.sources.filter(s => s.type === 'news' || (!s.type && !s.isOfficial))

  // Get related articles
  const relatedArticles = article.relatedArticles 
    ? sampleArticles.filter(a => article.relatedArticles?.includes(a.slug)).slice(0, 3)
    : []

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

      {/* SEO Body Section - The News Story */}
      {article.body && article.body.length > 0 && (
        <section className="border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-md bg-slate-100">
              <FileText className="h-4 w-4 text-slate-700" />
            </div>
            <h3 className="font-semibold text-lg">What Happened</h3>
          </div>
          <div className="space-y-4">
            {article.body.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border border-border rounded-lg p-5">
          <h3 className="font-semibold mb-4">Related News</h3>
          <div className="space-y-3">
            {relatedArticles.map((relatedArticle) => {
              const relatedLocationLabel = relatedArticle.location.city 
                ? `${relatedArticle.location.city}, ${relatedArticle.location.country}`
                : relatedArticle.location.country
              return (
                <Link
                  key={relatedArticle.id}
                  href={`/article/${relatedArticle.slug}`}
                  className="block p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link
                          href={`/category/${relatedArticle.category}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-medium text-primary hover:underline capitalize"
                        >
                          {relatedArticle.category}
                        </Link>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{relatedLocationLabel}</span>
                      </div>
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              )
            })}
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
