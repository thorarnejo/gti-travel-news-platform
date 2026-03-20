import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock } from 'lucide-react'
import { getArticleBySlug } from '@/lib/data'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { ArticleSection } from '@/components/feed/ArticleSection'
import { formatDistanceToNow } from 'date-fns'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.headline} | GTI News`,
    description: article.summary,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const publishedDate = article.published_at
    ? formatDistanceToNow(new Date(article.published_at), { addSuffix: true })
    : null

  const updatedDate = formatDistanceToNow(new Date(article.updated_at), { addSuffix: true })

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
                {article.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {article.category.icon} {article.category.name}
                  </span>
                )}
                <SeverityBadge severity={article.severity} />
                <StatusBadge status={article.status} />
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                {article.headline}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {article.locations && article.locations.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {article.locations.map((l) => l.name).join(', ')}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Updated {updatedDate}
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
            {article.locations && article.locations.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-3">Affected areas</h3>
                <div className="flex flex-wrap gap-2">
                  {article.locations.map((location) => (
                    <Link
                      key={location.id}
                      href={`/location/${location.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm hover:bg-muted/80 transition-colors"
                    >
                      <MapPin className="h-3 w-3" />
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground border border-border">
              <p>
                <strong>Published:</strong> {publishedDate || 'Draft'}
              </p>
              <p>
                <strong>Last Updated:</strong> {updatedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
