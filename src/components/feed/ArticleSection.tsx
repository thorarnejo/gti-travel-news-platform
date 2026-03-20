'use client'

import { cn } from '@/lib/utils'
import { Info, AlertTriangle, Users, CheckCircle2, TrendingUp, AlertCircle, ExternalLink } from 'lucide-react'
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

// Dynamic ACTION REQUIRED messages based on article type
function getActionMessage(article: Article): { label: string; message: string } {
  const categorySlug = article.category?.slug
  const status = article.status

  // Transport/strike disruptions
  if (categorySlug === 'transport' || status === 'disruption') {
    return {
      label: 'ACTION REQUIRED',
      message: 'Book alternative transport or rebook flights immediately — affected routes are filling fast.',
    }
  }

  // Weather/health advisories
  if (categorySlug === 'weather' || categorySlug === 'health' || status === 'warning') {
    return {
      label: 'ACTION REQUIRED',
      message: 'Check flight status and health advisories before departure — conditions may change rapidly.',
    }
  }

  // Attractions/event closures
  if (categorySlug === 'attractions') {
    return {
      label: 'ACTION REQUIRED',
      message: 'Reserve accommodations and attractions early — peak season availability is extremely limited.',
    }
  }

  // Entry rules / visa changes
  if (categorySlug === 'entry-rules') {
    return {
      label: 'ACTION REQUIRED',
      message: 'Verify your eligibility and submit applications well ahead of planned travel dates.',
    }
  }

  // Pricing changes
  if (categorySlug === 'pricing' || status === 'price_change') {
    return {
      label: 'ACTION REQUIRED',
      message: 'Book and prepay before the price change takes effect to lock in current rates.',
    }
  }

  // Default
  return {
    label: 'ACTION REQUIRED',
    message: 'Complete these steps before departure or check-in to avoid disruption.',
  }
}

export function ArticleSection({ article, className }: ArticleSectionProps) {
  const changedItems = toList(article.what_changed)
  const affectedItems = toList(article.who_is_affected)
  const actionItems = toList(article.what_to_do)
  const actionMessage = getActionMessage(article)

  return (
    <div className={cn('space-y-6', className)}>
      {/* TL;DR Section - Most important, highest visual priority */}
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/15">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-bold text-xl text-primary">TL;DR</h2>
        </div>
        <ul className="space-y-3">
          {article.tldr.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="font-medium text-foreground leading-relaxed pt-0.5">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What Changed */}
      <section className="bg-card border-2 border-amber-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
          </div>
          <h2 className="font-bold text-xl text-amber-900">What changed</h2>
        </div>
        <ul className="space-y-3">
          {(changedItems.length > 0 ? changedItems : ['No details available.']).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                {idx + 1}
              </span>
              <span className="text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Who Is Affected */}
      <section className="bg-card border-2 border-blue-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-blue-100">
            <Users className="h-5 w-5 text-blue-700" />
          </div>
          <h2 className="font-bold text-xl text-blue-900">Who is affected</h2>
        </div>
        <ul className="space-y-3">
          {(affectedItems.length > 0 ? affectedItems : ['Travelers in listed locations and routes.']).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              <span className="text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What To Do Now - Action Box in Green */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-300 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-emerald-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-800" />
          </div>
          <h2 className="font-bold text-xl text-emerald-900">What to do now</h2>
        </div>

        <ul className="space-y-3 mb-5">
          {(actionItems.length > 0 ? actionItems : ['Monitor official updates.']).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">
                {idx + 1}
              </span>
              <span className="font-semibold text-emerald-900 leading-relaxed pt-0.5">{item}</span>
            </li>
          ))}
        </ul>

        {/* Action guidance box */}
        <div className="rounded-lg border-2 border-emerald-300 bg-white p-4">
          <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">{actionMessage.label}</p>
          <p className="text-sm font-semibold text-emerald-900">
            {actionMessage.message}
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-slate-100">
            <TrendingUp className="h-5 w-5 text-slate-700" />
          </div>
          <h2 className="font-bold text-xl text-slate-900">Sources</h2>
        </div>
        <ul className="space-y-3">
          {article.sources.map((source) => (
            <li key={source.id} className="flex items-center gap-2">
              <a
                href={source.website_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {source.name}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Last Updated - Footer timestamp */}
      <section className="bg-muted/50 rounded-lg p-4 border border-border flex items-center gap-3">
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Last Updated</p>
          <p className="text-sm font-medium text-foreground">
            {new Date(article.updated_at).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </section>
    </div>
  )
}
