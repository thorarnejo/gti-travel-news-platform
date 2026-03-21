import { notFound } from 'next/navigation'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react'
import { getArticleBySlug, sampleArticles } from '@/lib/data'
import { StatusBadge, ArticleStatusBadge } from '@/components/ui/StatusBadge'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { ArticleSection } from '@/components/feed/ArticleSection'
import { formatDate } from '@/lib/utils'
import type { InlineMedia } from '@/types'

export const revalidate = 0
export const dynamic = 'force-dynamic'

interface ArticlePageProps {
  params: { slug: string }
}

function InlineMediaBlock({ media }: { media: InlineMedia }) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {media.type === 'map' || media.type === 'embed' ? (
          <iframe
            src={media.src}
            title={media.title || 'Embedded media'}
            loading="lazy"
            className="h-[280px] w-full md:h-[360px]"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <img src={media.src} alt={media.title || 'Inline media'} className="h-[220px] w-full object-cover md:h-[300px]" />
        )}
      </div>
      {(media.title || media.caption) && (
        <figcaption className="mt-2 text-xs text-muted-foreground">
          {media.title && <span className="font-medium text-foreground/80">{media.title}. </span>}
          {media.caption}
        </figcaption>
      )}
    </figure>
  )
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.title,
    description: article.summary,
    keywords: `${article.location.city || article.location.country}, ${article.category}, travel news, travel advisory`,
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  unstable_noStore() // Disable caching to ensure fresh data
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const categoryLabel = article.category.charAt(0).toUpperCase() + article.category.slice(1)
  const locationLabel = article.location.city ? `${article.location.city}, ${article.location.country}` : article.location.country
  const relatedArticles = article.relatedArticles
    ? sampleArticles.filter((a) => article.relatedArticles?.includes(a.slug)).slice(0, 3)
    : []

  const encodedUrl = encodeURIComponent(`https://gti.news/article/${article.slug}`)
  const encodedTitle = encodeURIComponent(article.title)

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
                <Link
                  href={`/category/${article.category}`}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full capitalize hover:bg-primary/20 transition-colors"
                >
                  {categoryLabel}
                </Link>
                <SeverityBadge severity={article.severity} />
                <StatusBadge status={article.status} />
                {article.articleStatus && <ArticleStatusBadge articleStatus={article.articleStatus} />}
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">{article.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Link
                  href={`/location/${(article.location.city || article.location.country).toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="capitalize">{locationLabel}</span>
                </Link>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Updated {formatDate(article.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          {article.heroImage && (
            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <img src={article.heroImage.src} alt={article.heroImage.alt} className="h-56 w-full object-cover md:h-80 lg:h-96" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArticleSection article={article} />

            {article.inlineMedia && article.inlineMedia.length > 0 && (
              <section className="mt-6">
                {article.inlineMedia.map((media) => (
                  <InlineMediaBlock key={media.id} media={media} />
                ))}
              </section>
            )}

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-4">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Share2 className="h-4 w-4" />
                Share
              </span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Share on X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                <strong>Published:</strong> {formatDate(article.publishedAt)}
              </p>
              <p>
                <strong>Last Updated:</strong> {formatDate(article.updatedAt)}
              </p>
            </div>

            {relatedArticles.length > 0 && (
              <section>
                <h3 className="font-semibold mb-3">Les også</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/article/${related.slug}`}
                      className="rounded-lg border border-border bg-card p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    >
                      <p className="text-xs text-primary font-medium capitalize mb-1">{related.category}</p>
                      <h4 className="text-sm font-semibold leading-snug line-clamp-2">{related.title}</h4>
                      <p className="text-xs text-muted-foreground mt-2">{formatDate(related.updatedAt)}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
