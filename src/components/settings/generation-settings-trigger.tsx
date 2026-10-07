import { Button } from '@/components/ui/button';
import { AspectRatioIcon } from '@/components/icons/aspect-ratio-icon';
import { ASPECT_RATIOS, type AspectRatio } from '@/lib/constants/aspect-ratios';
import {
  RESOLUTION_OPTIONS,
  type Resolution,
} from '@/lib/constants/resolutions';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import type { FC, ComponentProps } from 'react';

type GenerationSettingsTriggerProps = {
  aspectRatio: AspectRatio;
  resolution: Resolution;
  autoGenerateMotion?: boolean;
  autoGenerateMusic?: boolean;
} & ComponentProps<typeof Button>;

export const GenerationSettingsTrigger: FC<GenerationSettingsTriggerProps> = ({
  aspectRatio,
  resolution,
  autoGenerateMotion,
  autoGenerateMusic,
  ...props
}) => {
  const aspectRatioData = ASPECT_RATIOS.find((r) => r.value === aspectRatio);

  const autoLabels = [
    autoGenerateMotion && 'Motion',
    autoGenerateMusic && 'Music',
  ].filter(Boolean);

  return (
    <Button
      variant="outline"
      className="group h-8 px-3 rounded-xl gap-2 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-500/30 text-zinc-200 shadow-xs transition-all"
      aria-label="Generation settings"
      {...props}
    >
      {aspectRatioData && (
        <AspectRatioIcon
          width={aspectRatioData.width}
          height={aspectRatioData.height}
          size="sm"
          className="text-cyan-400 group-hover:scale-105 transition-transform"
        />
      )}
      <span className="font-mono text-xs font-semibold text-zinc-200">
        {aspectRatio}
      </span>
      <span className="font-mono text-[11px] text-zinc-400 bg-white/[0.06] px-1.5 py-0.5 rounded-md">
        {RESOLUTION_OPTIONS.find((r) => r.value === resolution)?.label}
      </span>
      {autoLabels.length > 0 && (
        <span className="hidden sm:inline text-xs text-cyan-300/80 font-medium">
          {autoLabels.join(' + ')}
        </span>
      )}
      <ChevronDown className="size-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
    </Button>
  );
};
