import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const TIERS = [
  {
    name: 'Starter',
    badge: 'Free Trial',
    price: '$0',
    description:
      'Perfect for trying out Vidmint and generating your first short sequences.',
    credits: '$18.70 included credits',
    features: [
      'Multi-scene screenplay splitting',
      'Consistent character casting',
      'Access to 10+ standard film styles',
      '720p HD sequence rendering',
      'Standard audio & music generation',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Director Pro',
    badge: 'Most Popular',
    price: '$29',
    period: '/month',
    description:
      'For content creators, indie filmmakers, and creative studios.',
    credits: '$45 monthly generation balance',
    features: [
      'Everything in Starter',
      'Priority fast-lane GPU rendering',
      '4K Ultra-HD Upscaling',
      'Custom character talent library',
      'All premium models (BytePlus, Kling Pro, FLUX)',
      'High-bitrate master exports (No watermark)',
      'Commercial usage rights',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Studio',
    badge: 'Production Teams',
    price: '$99',
    period: '/month',
    description:
      'For high-volume production houses and creative marketing teams.',
    credits: '$160 monthly generation balance',
    features: [
      'Everything in Director Pro',
      'Dedicated high-throughput GPU pool',
      'Team collaboration & shared libraries',
      'Custom fine-tuned styles & LoRAs',
      'API & webhook access',
      'Dedicated 24/7 technical director support',
    ],
    cta: 'Get Studio',
    popular: false,
  },
];

export function LandingPricingPreview() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-zinc-950/90">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,223,229,0.12)]">
            <Sparkles className="size-3.5 text-cyan-400" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Simple Plans for Every Storyteller
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Pay only for what you generate. Top up credits anytime without
            hidden subscription locks.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl transition-all duration-300 ${
                  tier.popular
                    ? 'border-2 border-cyan-400/80 bg-zinc-900/90 shadow-[0_0_40px_rgba(0,223,229,0.2)] scale-[1.03] z-10'
                    : 'border border-white/[0.09] bg-zinc-950/60 shadow-xl hover:border-white/[0.2]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 px-3.5 py-0.5 text-xs font-bold text-zinc-950 shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-zinc-400 min-h-[32px]">
                      {tier.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-sm text-zinc-400">
                        {tier.period}
                      </span>
                    )}
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-cyan-300">
                    ⚡ {tier.credits}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Included
                    </div>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs text-zinc-300"
                        >
                          <Check className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    to="/pricing"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 text-zinc-950 shadow-[0_0_20px_rgba(0,223,229,0.35)] hover:brightness-105'
                        : 'border border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-cyan-500/30'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
