import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, ExternalLink } from 'lucide-react'
import { getArticleBySlug } from '@/lib/data'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { ArticleSection } from '@/components/feed/ArticleSection'
import { formatDate } from '@/lib/utils'

interface ArticlePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Article Not Found' }
  
  return {
    title: `${article.title} | GTI News`,
    description: article.summary,
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const categoryLabel = article.category.charAt(0).toUpperCase() + article.category.slice(1)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full capitalize">
                  {categoryLabel}
                </span>
                <SeverityBadge severity={article.severity} />
                <StatusBadge status={article.status} />
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span className="capitalize">
                    {article.location.city ? `${article.location.city}, ` : ''}{article.location.country}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Updated {formatDate(article.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArticleSection article={article} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-3">Quick Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Impact Regions */}
            {article.impactRegions && article.impactRegions.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-3">Affected Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {article.impactRegions.map((region) => (
                    <span
                      key={region}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm"
                    >
                      <MapPin className="h-3 w-3" />
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-3">Sources</h3>
              <ul className="space-y-2">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      {source.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Last Updated */}
            <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                <strong>Published:</strong> {formatDate(article.publishedAt)}
              </p>
              <p>
                <strong>Last Updated:</strong> {formatDate(article.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
