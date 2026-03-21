'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react';

interface SubscribeButtonProps {
  variant?: 'hero' | 'inline' | 'footer';
  className?: string;
}

export function SubscribeButton({ variant = 'inline', className = '' }: SubscribeButtonProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
        setFirstName('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  // Hero variant - large CTA section
  if (variant === 'hero') {
    return (
      <section className={`bg-gradient-to-r from-primary/10 to-primary/5 py-16 px-4 ${className}`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full text-primary text-sm font-medium mb-4">
            <Mail className="h-4 w-4" />
            Travel Newsletter
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Get Travel News Delivered
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Stay ahead with real-time alerts on flight disruptions, visa changes, 
            and travel deals. No spam, just actionable updates.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-4 px-6 rounded-lg">
              <Check className="h-5 w-5" />
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-2 text-red-600 mt-4">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{message}</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    );
  }

  // Footer variant - compact
  if (variant === 'footer') {
    return (
      <div className={`${className}`}>
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Newsletter
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Get weekly travel updates.
        </p>
        
        {status === 'success' ? (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Check className="h-4 w-4" />
            <span>Subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-sm rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-red-600 mt-2">{message}</p>
        )}
      </div>
    );
  }

  // Inline variant - button that opens modal/form
  return (
    <div className={`${className}`}>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Subscribe
        </button>
      ) : status === 'success' ? (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
          <Check className="h-4 w-4" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
              autoFocus
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Join'
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
          
          {status === 'error' && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
