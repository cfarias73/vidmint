import type * as React from 'react';

import { cn } from '@/lib/utils';

function PremiumCard({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      data-variant="premium"
      className={cn(
        // Define --card-spacing so shadcn CardHeader/Content/Footer
        // (px-(--card-spacing)) still pad when used outside ui/Card.
        'relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/[0.09] py-0 text-card-foreground [--card-spacing:--spacing(4)]',
        'bg-zinc-950/70 backdrop-blur-2xl',
        'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04),0_0_35px_-10px_rgba(0,223,229,0.06)]',
        className
      )}
      {...props}
    >
      {/* Top vibrant ambient light edge */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 via-blue-500/40 to-transparent pointer-events-none z-20" />
      {/* Subtle inner top glow reflection */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-cyan-500/[0.03] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

export { PremiumCard };
