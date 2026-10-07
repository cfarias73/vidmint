import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { GenerationMode } from '@/lib/ai/generation-mode';
import { Gauge, Zap } from 'lucide-react';
import type { FC } from 'react';

type GenerationModeToggleProps = {
  value: GenerationMode;
  onChange: (mode: GenerationMode) => void;
  disabled?: boolean;
};

/**
 * Quality | Turbo switch. Lives next to Generate: it selects the
 * recommended default in each catalog. Pickers still show the full list,
 * grouped Fast / Quality.
 */
export const GenerationModeToggle: FC<GenerationModeToggleProps> = ({
  value,
  onChange,
  disabled,
}) => (
  <div className="inline-flex items-center rounded-xl bg-zinc-900/80 border border-white/[0.08] p-0.5 shadow-inner">
    <button
      type="button"
      onClick={() => onChange('quality')}
      disabled={disabled}
      aria-label="Quality mode"
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
        value === 'quality'
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,223,229,0.2)]'
          : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
      )}
    >
      <Gauge
        className={cn(
          'size-3.5',
          value === 'quality' ? 'text-cyan-400' : 'text-zinc-400'
        )}
      />
      Quality
    </button>
    <button
      type="button"
      onClick={() => onChange('turbo')}
      disabled={disabled}
      aria-label="Turbo mode"
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
        value === 'turbo'
          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
          : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
      )}
    >
      <Zap
        className={cn(
          'size-3.5',
          value === 'turbo' ? 'text-amber-400' : 'text-zinc-400'
        )}
      />
      Turbo
    </button>
  </div>
);
