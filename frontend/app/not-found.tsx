import Link from 'next/link'
import { ArrowLeft, Plane } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-6">
          <Plane className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6 max-w-sm">
          The article you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Feed
        </Link>
      </div>
    </div>
  )
}
