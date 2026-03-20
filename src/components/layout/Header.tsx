import Link from 'next/link'
import { Plane, Menu, X, Radio } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={className}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-600">
              <Radio className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Live Travel Alerts</span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">Real-time disruption updates</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/?severity=critical" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
              Critical
            </Link>
            <Link href="/?category=transport" className="text-sm font-medium hover:text-primary transition-colors">
              Transport
            </Link>
            <Link href="/?category=safety" className="text-sm font-medium hover:text-primary transition-colors">
              Safety
            </Link>
            <Link href="/?category=entry-rules" className="text-sm font-medium hover:text-primary transition-colors">
              Entry Rules
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Subscribe
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Get Alerts
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
