import { createFileRoute } from '@tanstack/react-router';
import { publicStylesQueryOptions } from '@/lib/style/public-styles-query';
import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingShowcase } from '@/components/landing/landing-showcase';
import { LandingBentoFeatures } from '@/components/landing/landing-bento-features';
import { LandingHowItWorks } from '@/components/landing/landing-how-it-works';
import { LandingPricingPreview } from '@/components/landing/landing-pricing-preview';
import { LandingFooter } from '@/components/landing/landing-footer';
import { ScriptView } from '@/components/script/script-view';
import { useStyles } from '@/hooks/use-styles';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Play, ArrowRight, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { AuthGateProvider } from '@/components/auth/auth-gate-provider';
import { z } from 'zod';

const searchSchema = z.object({
  style: z.string().optional(),
  prefill: z.enum(['style']).optional(),
});

export const Route = createFileRoute('/')({
  validateSearch: searchSchema,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(publicStylesQueryOptions),
  component: LandingRootPage,
});

function LandingRootPage() {
  const navigate = useNavigate();
  const { data: styles } = useStyles();

  const handleSuccess = (sequenceIds: string[]) => {
    const [firstId] = sequenceIds;
    if (firstId) {
      void navigate({
        to: '/sequences/$id/scenes',
        params: { id: firstId },
      });
    }
  };

  return (
    <AuthGateProvider>
      <div className="relative min-h-screen bg-[#08090d] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        {/* Dynamic Aurora Ambient Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="absolute inset-0 studio-grid-pattern [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,#000_60%,transparent_100%)] opacity-35" />
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-gradient-to-b from-cyan-500/[0.14] via-purple-600/[0.09] to-transparent blur-3xl animate-pulse-glow" />
          <div className="absolute top-[45%] right-[-15%] w-[800px] h-[600px] rounded-full bg-purple-600/[0.06] blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[600px] rounded-full bg-cyan-600/[0.06] blur-3xl" />
        </div>

        {/* Floating Glass Navigation */}
        <LandingNavbar />

        {/* Main Content Container */}
        <main className="relative z-10 flex flex-col">
          {/* Hero Section */}
          <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-cyan-300 backdrop-blur-xl shadow-[0_0_20px_rgba(0,223,229,0.15)] mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
              <Sparkles className="size-4 text-cyan-400 animate-spin-slow" />
              <span className="tracking-wide">
                Next-Generation Generative AI Cinema Engine
              </span>
            </div>

            {/* Majestic Hero Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-balance max-w-5xl mx-auto mb-6 bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Direct Films with AI.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,223,229,0.3)]">
                From First Line to Final Cut.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10 text-pretty">
              Create multi-scene cinematic sequences with rock-solid character
              consistency, synchronized multitrack audio, and intelligent
              screenplay beat breakdowns.
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Button
                asChild
                size="lg"
                className="relative group h-13 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-base font-bold text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Link to="/sequences/new">
                  <span>Start Directing Free</span>
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-13 px-7 rounded-2xl border-white/[0.12] bg-white/[0.04] backdrop-blur-xl text-base font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-all"
              >
                <a href="#showcase">
                  <Play className="mr-2 size-4 text-cyan-400 fill-cyan-400/20" />
                  <span>Explore Showreel</span>
                </a>
              </Button>
            </div>

            {/* Interactive Live Studio Composer in Hero */}
            <div
              className="max-w-4xl mx-auto text-left scroll-mt-24"
              id="compose"
            >
              <div className="relative rounded-3xl border border-white/[0.12] bg-zinc-950/70 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.05]">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs font-mono text-zinc-400">
                      interactive_studio_cockpit.tsx
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400/90 font-medium">
                    <Film className="size-3.5" />
                    <span>Live Sandbox</span>
                  </div>
                </div>

                <ScriptView
                  key="landing-hero-composer"
                  loading={false}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          </section>

          {/* Cinematic Showcase Section */}
          <LandingShowcase styles={styles} />

          {/* Bento Grid Features */}
          <LandingBentoFeatures />

          {/* Director Workflow */}
          <LandingHowItWorks />

          {/* Pricing Matrix */}
          <LandingPricingPreview />

          {/* Final CTA Banner */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center">
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-zinc-950 p-8 sm:p-14 shadow-[0_0_80px_rgba(0,223,229,0.12)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00DFE5]" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  Ready to Direct Your First Masterpiece?
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Join thousands of filmmakers, studios, and creators producing
                  high-fidelity generative cinema with OpenStory.
                </p>
                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="h-13 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-base font-bold text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Link to="/sequences/new">
                      <span>Launch Studio Free</span>
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Cinematic Footer */}
          <LandingFooter />
        </main>
      </div>
    </AuthGateProvider>
  );
}
