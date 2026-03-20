import Link from 'next/link'
import { Plane, Mail, Twitter, Youtube } from 'lucide-react'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={className}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">GTI News</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Real-time travel news and updates to help you make informed decisions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/flights" className="text-muted-foreground hover:text-foreground">Flights</Link></li>
              <li><Link href="/category/hotels" className="text-muted-foreground hover:text-foreground">Hotels</Link></li>
              <li><Link href="/category/destinations" className="text-muted-foreground hover:text-foreground">Destinations</Link></li>
              <li><Link href="/category/visa" className="text-muted-foreground hover:text-foreground">Visa</Link></li>
              <li><Link href="/category/safety" className="text-muted-foreground hover:text-foreground">Safety</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Locations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/location/United Kingdom" className="text-muted-foreground hover:text-foreground">United Kingdom</Link></li>
              <li><Link href="/location/Japan" className="text-muted-foreground hover:text-foreground">Japan</Link></li>
              <li><Link href="/location/Thailand" className="text-muted-foreground hover:text-foreground">Thailand</Link></li>
              <li><Link href="/location/France" className="text-muted-foreground hover:text-foreground">France</Link></li>
              <li><Link href="/location/United Arab Emirates" className="text-muted-foreground hover:text-foreground">UAE</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Global Travels Info. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
