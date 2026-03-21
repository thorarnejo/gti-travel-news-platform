import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MapPin, Clock, ExternalLink, ChevronRight, Home } from 'lucide-react'
import { getArticleBySlug } from '@/lib/data'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { ArticleSection } from '@/components/feed/ArticleSection'
import { formatDistanceToNow, format } from 'date-fns'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  const publishedTime = article.published_at ? new Date(article.published_at).toISOString() : undefined
  const modifiedTime = new Date(article.updated_at).toISOString()
  const canonicalUrl = `https://gtinews.com/article/${article.slug}`
  const ogImage = article.image_url || 'https://gtinews.com/og-default.png'

  return {
    title: article.headline,
    description: article.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.headline,
      description: article.summary,
      type: 'article',
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.headline }],
      publishedTime,
      modifiedTime,
      authors: ['GTI News'],
      tags: article.locations.map(l => l.name),
      siteName: 'GTI News',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.headline,
      description: article.summary,
      images: [ogImage],
    },
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
  const updatedFull = format(new Date(article.updated_at), 'MMM d, yyyy \'at\' HH:mm')
  const canonicalUrl = `https://gtinews.com/article/${article.slug}`
  const ogImage = article.image_url || 'https://gtinews.com/og-default.png'

  // Build JSON-LD structured data - NewsArticle (Google Rich Results compliant)
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.summary,
    image: ogImage,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: 'GTI News',
      url: 'https://gtinews.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GTI News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gtinews.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: article.category?.name,
    keywords: article.locations.map(l => l.name).join(', '),
    about: article.locations.map(l => ({
      '@type': 'Place',
      name: l.name,
    })),
  }

  // BreadcrumbList schema for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://gtinews.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category?.name || 'Articles',
        item: `https://gtinews.com/category/${article.category?.slug || 'articles'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.headline,
        item: canonicalUrl,
      },
    ],
  }

  // FAQ Schema - only include if TLDR items exist
  const faqSchema = article.tldr.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.tldr.map((item, idx) => ({
      '@type': 'Question',
      name: item,
      acceptedAnswer: {
        '@type': 'Answer',
        text: article.what_to_do?.split('\n').filter(Boolean)[idx] || 'See article for detailed guidance.',
      },
    })),
  } : null

  // Extract what_to_do items for mobile action bar
  const actionItems = article.what_to_do?.split('\n').filter(Boolean) || []

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumbs - lightweight, SEO-friendly */}
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Home className="h-3.5 w-3.5" />
                <span className="sr-only">Home</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <Link href={`/category/${article.category?.slug || 'articles'}`} className="hover:text-foreground transition-colors">
                {article.category?.name || 'Articles'}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">{article.headline}</span>
            </nav>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Feed
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {article.category && (
                    <Link
                      href={`/category/${article.category.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {article.category.icon && <span>{article.category.icon}</span>}
                      {article.category.name}
                    </Link>
                  )}
                  <SeverityBadge severity={article.severity} />
                  <StatusBadge status={article.status} />
                </div>

                {/* Headline */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  {article.headline}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {article.locations && article.locations.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-foreground">
                        {article.locations.map((l, i) => (
                          <span key={l.id}>
                            <Link href={`/location/${l.slug}`} className="hover:underline">{l.name}</Link>
                            {i < article.locations.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Updated {updatedDate}
                  </span>
                </div>
              </div>
            </div>

            {article.image_url && (
              <div className="mt-8 relative aspect-video overflow-hidden rounded-xl border border-border">
                <Image
                  src={article.image_url}
                  alt={article.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Action Bar - sticky at bottom, visible above fold */}
        <div className="lg:hidden sticky bottom-0 z-10 bg-white border-t border-border shadow-lg">
          <div className="px-4 py-3">
            <p className="text-xs font-bold text-emerald-700 mb-1">ACTION REQUIRED</p>
            <p className="text-sm font-semibold text-emerald-900 line-clamp-2">
              {actionItems[0]?.replace(/^\d+\.\s*/, '').trim() || 'Check article for guidance'}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <ArticleSection article={article} />
            </div>

            {/* Sidebar - Desktop only */}
            <div className="hidden lg:block space-y-6">
              {/* Action Card - prominent green guidance */}
              {article.what_to_do && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm sticky top-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-md bg-emerald-100">
                      <svg className="h-4 w-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-emerald-900 text-lg">What to do now</h3>
                  </div>
                  <ul className="space-y-2">
                    {actionItems.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-emerald-900 font-medium">{action.replace(/^\d+\.\s*/, '').trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Affected Areas */}
              {article.locations && article.locations.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    Affected Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.locations.map((location) => (
                      <Link
                        key={location.id}
                        href={`/location/${location.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-sm font-medium hover:bg-muted/80 transition-colors"
                      >
                        {location.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="space-y-2 text-sm">
                  {publishedDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Published</span>
                      <span className="font-medium">{publishedDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">{updatedFull}</span>
                  </div>
                </div>
              </div>

              {/* Sources */}
              {article.sources && article.sources.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    Sources
                  </h3>
                  <ul className="space-y-2">
                    {article.sources.map((source) => (
                      <li key={source.id}>
                        <a
                          href={source.website_url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {source.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
