import { OpenStoryLogo } from '@/components/icons/openstory-logo';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Film, Sparkles } from 'lucide-react';

export function LandingNavbar() {
  const { data: user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-zinc-950/75 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Badge */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <OpenStoryLogo size="md" className="h-7 w-auto" />
          </Link>
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300">
            <Sparkles className="size-3 text-cyan-400" />
            <span>Studio v2.5</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a
            href="#showcase"
            className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            Showcase
          </a>
          <a
            href="#features"
            className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            Features
          </a>
          <a
            href="#workflow"
            className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            Workflow
          </a>
          <a
            href="#pricing"
            className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            Pricing
          </a>
          <Link
            to="/docs"
            className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            Docs
          </Link>
        </nav>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-3">
          {user ? (
            <Button
              asChild
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link to="/sequences">
                <Film className="mr-1.5 size-4" />
                <span>Go to Studio</span>
                <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-xl"
              >
                <Link to="/login">Sign In</Link>
              </Button>

              <Button
                asChild
                className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link to="/sequences/new">
                  <span>Start Directing</span>
                  <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
