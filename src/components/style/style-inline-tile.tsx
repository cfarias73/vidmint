import { AppImage } from '@/components/ui/app-image';
import type { Style } from '@/lib/db/schema/libraries';
import { cn } from '@/lib/utils';
import { Info, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { getStyleGradient } from './style-gradient';
import { getConfigColorPalette } from '@/lib/style/style-config';

const StyleTileBackground: React.FC<{
  style: Style;
  priority?: boolean;
}> = ({ style, priority = false }) => {
  const [imgError, setImgError] = useState(false);

  return style.previewUrl && !imgError ? (
    <AppImage
      key={style.id}
      src={style.previewUrl}
      // ~65px tile; 130 is 2× so the srcset picks a retina-sized transform
      // instead of the full thumbnail.webp.
      width={130}
      height={130}
      sizes="65px"
      alt={style.name}
      className="h-full w-full object-cover"
      fetchPriority={priority ? 'high' : 'low'}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setImgError(true)}
    />
  ) : (
    <div
      className="h-full w-full"
      style={{
        background: getStyleGradient(getConfigColorPalette(style.config)),
      }}
    />
  );
};

type StyleInlineTileProps = {
  style: Style;
  selected: boolean;
  disabled?: boolean;
  reasoning?: string;
  recommended?: boolean;
  /** First-paint tiles: eager + high fetch priority so they beat lazy ones. */
  priority?: boolean;
  tabIndex: number;
  onSelect: (styleId: string) => void;
  /** Clicking the already-selected tile opens the style's detail dialog —
   *  the (i) badge on the tile signals it. */
  onShowDetails?: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
};

export function StyleInlineTile({
  style,
  selected,
  disabled = false,
  reasoning,
  recommended = false,
  priority = false,
  tabIndex,
  onSelect,
  onShowDetails,
  onKeyDown,
}: StyleInlineTileProps) {
  const opensDetails = selected && !!onShowDetails;
  return (
    <button
      type="button"
      data-style-tile
      onClick={() => (opensDetails ? onShowDetails() : onSelect(style.id))}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      disabled={disabled}
      className={cn(
        // whitespace-normal: UA button styles are nowrap (inherited), which
        // defeats line-clamp-2 on the name and truncates mid-word.
        'group relative aspect-square overflow-hidden rounded-xl border-2 whitespace-normal',
        'transition-all duration-200 hover:scale-[1.04] hover:shadow-xl',
        'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-950',
        'disabled:cursor-not-allowed disabled:opacity-50',
        selected
          ? 'border-cyan-400 shadow-[0_0_22px_rgba(0,223,229,0.4)] ring-1 ring-cyan-400/50 scale-[1.04]'
          : 'border-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,223,229,0.15)]'
      )}
      aria-label={
        opensDetails
          ? `View ${style.name} details`
          : `Select ${style.name} style`
      }
      title={reasoning}
    >
      <StyleTileBackground style={style} priority={priority} />
      {recommended && (
        <span
          aria-hidden
          className="absolute left-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-cyan-400 text-zinc-950 font-bold shadow-md shadow-cyan-400/30"
        >
          <Sparkles className="size-3" />
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-1.5 pt-4">
        <p className="line-clamp-2 whitespace-normal text-center text-[11px] font-semibold text-zinc-100 tracking-tight leading-tight group-hover:text-white transition-colors">
          {style.name}
        </p>
      </div>
      {selected && (
        <div className="pointer-events-none absolute inset-0 bg-cyan-400/10 border border-cyan-400/30 rounded-xl" />
      )}
      {opensDetails && (
        <span
          aria-hidden
          className="absolute right-1.5 top-1.5 text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] hover:text-cyan-300 transition-colors"
        >
          <Info className="size-3.5" />
        </span>
      )}
    </button>
  );
}
