import {
  Edit3,
  Clapperboard,
  Sparkles,
  ArrowRight,
  Play,
  Wand2,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

const STEPS = [
  {
    step: '01',
    icon: Edit3,
    title: 'Write or Paste Your Idea',
    description:
      'Type a simple one-liner, a bulleted plot summary, or paste a full screenplay. Our LLM director breaks it into scenes, dialogue, and cinematic beats.',
    badge: 'Script Intelligence',
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
  },
  {
    step: '02',
    icon: Clapperboard,
    title: 'Direct Actors, Styles & Camera',
    description:
      'Cast consistent talent from your library, pin locations, and select iconic cinematic styles (Noir, Cyberpunk, Anime, 35mm, Award Season).',
    badge: 'Studio Control',
    color:
      'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
  },
  {
    step: '03',
    icon: Wand2,
    title: 'Render & Iterate in Seconds',
    description:
      'Watch all scenes generate simultaneously with synced voiceover, spatial sound effects, and music. Re-take or refine any individual scene on the fly.',
    badge: 'Parallel Rendering',
    color:
      'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
  },
];

export function LandingHowItWorks() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-zinc-950/80">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,223,229,0.12)]">
            <Sparkles className="size-3.5 text-cyan-400" />
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Direct Films in 3 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            From imagination to final rendered cinema, without technical
            friction or complex prompt hacks.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/[0.09] bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-lg flex flex-col justify-between group hover:border-cyan-500/40 hover:bg-zinc-900/70 transition-all duration-300"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-mono font-extrabold text-zinc-600 group-hover:text-cyan-400/80 transition-colors">
                      {item.step}
                    </span>
                    <div
                      className={`size-10 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center`}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <span className="inline-block rounded-md bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-zinc-300 border border-white/[0.06]">
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-zinc-950/80 to-purple-950/40 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white">
              Ready to create your first film?
            </h3>
            <p className="text-sm text-zinc-400">
              Get started with free starter credits. No credit card required.
            </p>
          </div>
          <Link
            to="/"
            className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 text-zinc-950 font-bold text-sm shadow-[0_0_25px_rgba(0,223,229,0.4)] hover:shadow-[0_0_35px_rgba(0,223,229,0.6)] hover:brightness-105 transition-all"
          >
            <span>Launch Studio</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
