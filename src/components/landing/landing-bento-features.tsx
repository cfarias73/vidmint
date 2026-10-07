import {
  Users,
  Split,
  Music,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function LandingBentoFeatures() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-zinc-950/60 overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/[0.06] blur-3xl" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[500px] rounded-full bg-purple-600/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.12)]">
            <Sparkles className="size-3.5 text-purple-400" />
            <span>Next-Generation Film Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Everything Required for Complete AI Cinema
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            From script breakdown to final sound mixing, Vidmint replaces
            fractured AI video tools with an integrated director’s pipeline.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Consistent Characters (Span 2) */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden border border-white/[0.09] bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.08] rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4">
              <div className="size-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Users className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Flawless Character & Location Consistency
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                Pre-cast talent in your library or generate unique actors that
                maintain the same facial structure, hair, and clothing across
                10+ camera angles and scenes.
              </p>
            </div>

            {/* Visual Micro UI */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-3">
              {[
                { label: 'Close-Up Shot', angle: 'Front 35mm' },
                { label: 'Over-The-Shoulder', angle: 'Profile 50mm' },
                { label: 'Wide Establishing', angle: 'Wide 24mm' },
              ].map((shot, i) => (
                <div
                  key={shot.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center space-y-1 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold">
                    SCENE 0{i + 1}
                  </div>
                  <div className="text-xs font-bold text-zinc-200">
                    {shot.label}
                  </div>
                  <div className="text-[10px] text-zinc-500">{shot.angle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: AI Screenplay Analysis */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.09] bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-purple-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="size-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Split className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Automatic Screenplay Beat Splitting
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Paste any script or story. Our LLM analyzes emotional beats,
                pacing, dialogues, and auto-generates prompt schemas for every
                single shot.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-medium text-purple-300">
              <CheckCircle2 className="size-4 text-purple-400 shrink-0" />
              <span>Zero prompt engineering needed</span>
            </div>
          </div>

          {/* Card 3: Multitrack Voiceover & Spatial Music */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.09] bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="size-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Music className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Multitrack Sound & Spatial Voice
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Automatic synchronization of character voice acting, realistic
                atmospheric background soundscapes, and orchestral cinematic
                music.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-medium text-blue-300">
              <CheckCircle2 className="size-4 text-blue-400 shrink-0" />
              <span>Full audio & video master export</span>
            </div>
          </div>

          {/* Card 4: Multi-Model Super Engine (Span 2) */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden border border-white/[0.09] bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Layers className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Multi-Model 4K AI Pipeline
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                Harness state-of-the-art models in one orchestrator: BytePlus,
                Fal, Kling 1.5, Gemini 2.0, FLUX, and specialized video
                upscalers.
              </p>
            </div>

            {/* Engine badges */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
              {[
                'BytePlus Video',
                'Kling 1.5 Pro',
                'FLUX 1.1 Schnell',
                'Gemini 2.0 Flash',
                'Seedance 2.5',
                '4K Upscaling',
              ].map((model) => (
                <span
                  key={model}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-zinc-300 font-medium"
                >
                  ⚡ {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
