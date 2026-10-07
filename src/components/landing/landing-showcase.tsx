import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Play, Film, Clapperboard, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Style } from '@/types/database';
import { styleSlug } from '@/lib/style/style-slug';

interface LandingShowcaseProps {
  styles?: Style[];
}

const SHOWCASE_PRESETS = [
  {
    id: 'cyberpunk',
    title: 'Neon Ronin: 2088',
    category: 'Sci-Fi & Cyberpunk',
    duration: '0:24',
    scenes: 5,
    styleSlug: 'sci-fi-futuristic',
    aspectRatio: '16:9',
    description:
      'A cybernetic mercenary navigates the rainy underbelly of Neo-Shibuya to deliver a stolen quantum memory core.',
    image:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    tags: ['BytePlus Video', 'Cinematic Lighting', 'Spatial Synth Score'],
  },
  {
    id: 'noir',
    title: 'Shadows of Manhattan',
    category: 'Neo-Noir Thriller',
    duration: '0:32',
    scenes: 6,
    styleSlug: 'neo-noir-thriller',
    aspectRatio: '2.39:1',
    description:
      'Private investigator Jack Vance searches for a missing socialite through foggy 1950s docks and jazz clubs.',
    image:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    tags: ['Kling 1.5', 'High Contrast 35mm', 'Bespoke Dialogue'],
  },
  {
    id: 'anime',
    title: 'Spirits of Mount Fuji',
    category: 'Studio Anime Feature',
    duration: '0:28',
    scenes: 4,
    styleSlug: 'anime-feature',
    aspectRatio: '16:9',
    description:
      'A young shrine maiden discovers an ancient forest spirit that holds the balance between dreams and reality.',
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    tags: ['FLUX Anime', 'Consistent Character', 'Orchestral Score'],
  },
  {
    id: 'award',
    title: 'The Last Harvest',
    category: 'Award Season Drama',
    duration: '0:45',
    scenes: 7,
    styleSlug: 'award-season',
    aspectRatio: '2.39:1',
    description:
      'An aging winemaker fights to preserve his family vineyard in Tuscany against extreme climate changes.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    tags: ['Photorealistic 4K', 'Natural Sunlight', 'Emotional Monologue'],
  },
];

export function LandingShowcase({ styles = [] }: LandingShowcaseProps) {
  const [activePresetId, setActivePresetId] = useState(SHOWCASE_PRESETS[0].id);
  const activePreset =
    SHOWCASE_PRESETS.find((p) => p.id === activePresetId) ||
    SHOWCASE_PRESETS[0];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,223,229,0.12)]">
            <Film className="size-3.5 text-cyan-400" />
            <span>Cinematic Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Crafted with Vidmint Cinema Engine
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Multi-shot sequences generated with consistent characters, dynamic
            camera movement, and bespoke sound design.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SHOWCASE_PRESETS.map((preset) => {
            const isActive = preset.id === activePresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActivePresetId(preset.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,223,229,0.2)]'
                    : 'border border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
                )}
              >
                {preset.title}
              </button>
            );
          })}
        </div>

        {/* Feature Hero Card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-zinc-950/80 backdrop-blur-2xl shadow-2xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Canvas */}
            <div className="relative lg:col-span-7 aspect-video lg:aspect-auto overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePreset.image}
                alt={activePreset.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80" />

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-16 rounded-full bg-cyan-400/90 text-zinc-950 flex items-center justify-center shadow-[0_0_30px_rgba(0,223,229,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all">
                  <Play className="size-7 fill-zinc-950 ml-1" />
                </div>
              </div>

              {/* Badges on Video Preview */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-lg bg-black/70 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-semibold text-cyan-300 border border-cyan-500/30">
                  {activePreset.aspectRatio}
                </span>
                <span className="rounded-lg bg-black/70 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-semibold text-zinc-300 border border-white/[0.1]">
                  {activePreset.scenes} Scenes • {activePreset.duration}
                </span>
              </div>
            </div>

            {/* Film Meta & Directing Notes */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-zinc-900/30">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                    {activePreset.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activePreset.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activePreset.description}
                </p>

                {/* Tech Tags */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Rendered Pipeline
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activePreset.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Try Style CTA */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <Link
                  to="/"
                  search={{ style: activePreset.styleSlug }}
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(0,223,229,0.3)] transition-all"
                >
                  <span>Use this style</span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>

                <Link
                  to="/gallery"
                  className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Explore gallery →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
