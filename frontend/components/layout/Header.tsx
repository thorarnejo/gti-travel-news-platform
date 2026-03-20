import Link from 'next/link'
import { Plane, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={className}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">GTI News</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Live Feed
            </Link>
            <Link href="/category/flights" className="text-sm font-medium hover:text-primary transition-colors">
              Flights
            </Link>
            <Link href="/category/hotels" className="text-sm font-medium hover:text-primary transition-colors">
              Hotels
            </Link>
            <Link href="/category/safety" className="text-sm font-medium hover:text-primary transition-colors">
              Safety
            </Link>
            <Link href="/category/visa" className="text-sm font-medium hover:text-primary transition-colors">
              Visa
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Subscribe
            </Button>
            <Button size="sm">Get App</Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
