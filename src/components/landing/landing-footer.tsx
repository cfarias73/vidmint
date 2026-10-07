import { Link } from '@tanstack/react-router';
import { OpenStoryLogo } from '@/components/icons/openstory-logo';
import { LifeBuoy, BadgeDollarSign, Shield, Sparkles } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <OpenStoryLogo size="md" />
          <p className="text-xs text-zinc-500 text-center md:text-left max-w-sm">
            The next-generation AI cinema studio for indie creators,
            screenwriters, and production teams.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All rendering clusters operational</span>
          </div>
        </div>

        {/* Center/Right: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <Link to="/gallery" className="hover:text-cyan-300 transition-colors">
            Gallery
          </Link>
          <Link to="/pricing" className="hover:text-cyan-300 transition-colors">
            Pricing
          </Link>
          <Link to="/docs" className="hover:text-cyan-300 transition-colors">
            Guide & Documentation
          </Link>
          <Link to="/privacy" className="hover:text-cyan-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-cyan-300 transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Vidmint AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
