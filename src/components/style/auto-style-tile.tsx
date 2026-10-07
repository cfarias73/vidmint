import { cn } from '@/lib/utils';
import { ScrollText } from 'lucide-react';

type AutoStyleTileProps = {
  selected: boolean;
  disabled?: boolean;
  tabIndex: number;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
};

/**
 * The "Match script" slot in the composer strip (#1213): instead of a library
 * style, the storyboard run derives a style from the script itself. Laid out
 * like a StyleInlineTile (full-bleed still + bottom name strip) so it
 * reads as a peer style; the ScrollText badge + label are the tell (#1279).
 */
export function AutoStyleTile({
  selected,
  disabled = false,
  tabIndex,
  onSelect,
  onKeyDown,
}: AutoStyleTileProps) {
  return (
    <button
      type="button"
      data-style-tile
      onClick={onSelect}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'group relative aspect-square overflow-hidden rounded-xl border-2 whitespace-normal',
        'transition-all duration-200 hover:scale-[1.04] hover:shadow-xl',
        'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-950',
        'disabled:cursor-not-allowed disabled:opacity-50',
        selected
          ? 'border-cyan-400 shadow-[0_0_22px_rgba(0,223,229,0.4)] ring-1 ring-cyan-400/50 scale-[1.04]'
          : 'border-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,223,229,0.15)]'
      )}
      aria-label="Match script: derive a style from the script"
      title="Derive a style from the script. It stays with this sequence until you add it to your library."
    >
      <div className="h-full w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-cyan-950 flex items-center justify-center">
        <ScrollText className="size-6 text-cyan-400/80 group-hover:scale-110 transition-transform duration-200" />
      </div>
      <span
        aria-hidden
        className="absolute left-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-cyan-400 text-zinc-950 font-bold shadow-md shadow-cyan-400/30"
      >
        <ScrollText className="size-3" />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-1.5 pt-4">
        <p className="line-clamp-2 whitespace-normal text-center text-[11px] font-semibold text-zinc-100 tracking-tight leading-tight group-hover:text-white transition-colors">
          Match script
        </p>
      </div>
      {selected && (
        <div className="pointer-events-none absolute inset-0 bg-cyan-400/10 border border-cyan-400/30 rounded-xl" />
      )}
    </button>
  );
}
