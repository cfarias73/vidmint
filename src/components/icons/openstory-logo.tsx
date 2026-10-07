import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

const vidmintLogoVariants = cva(
  'inline-flex items-center gap-2.5 select-none shrink-0 transition-opacity',
  {
    variants: {
      size: {
        xs: 'h-4 text-sm',
        sm: 'h-5 text-base',
        md: 'h-7 text-lg',
        lg: 'h-9 text-2xl',
        xl: 'h-12 text-3xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const vidmintIconSizes = {
  xs: 'h-4 w-auto',
  sm: 'h-5 w-auto',
  md: 'h-6 w-auto',
  lg: 'h-8 w-auto',
  xl: 'h-10 w-auto',
};

const vidmintTextSizes = {
  xs: 'text-sm font-bold tracking-tight',
  sm: 'text-base font-bold tracking-tight',
  md: 'text-lg font-extrabold tracking-tight',
  lg: 'text-2xl font-extrabold tracking-tight',
  xl: 'text-3xl font-black tracking-tight',
};

export type VidmintLogoProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof vidmintLogoVariants>;

export type VidmintIconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const VidmintIcon: React.FC<VidmintIconProps> = ({
  className,
  size = 'md',
  alt = 'Vidmint',
  ...props
}) => {
  return (
    <img
      src="/iconologovidmint.png"
      alt={alt}
      className={cn(
        'inline-block shrink-0 object-contain drop-shadow-[0_0_8px_rgba(0,223,229,0.3)]',
        vidmintIconSizes[size] || vidmintIconSizes.md,
        className
      )}
      {...props}
    />
  );
};

export const VidmintLogo: React.FC<VidmintLogoProps> = ({
  className,
  size = 'md',
  ...props
}) => {
  const iconSize = size ?? 'md';
  return (
    <div
      className={cn(vidmintLogoVariants({ size }), className)}
      {...props}
    >
      <img
        src="/iconologovidmint.png"
        alt="Vidmint"
        className={cn(
          'shrink-0 object-contain drop-shadow-[0_0_10px_rgba(0,223,229,0.35)]',
          vidmintIconSizes[iconSize]
        )}
      />
      <span className={cn('leading-none flex items-center', vidmintTextSizes[iconSize])}>
        <span className="text-white drop-shadow-sm font-bold">Vid</span>
        <span className="bg-gradient-to-r from-[#00dfe5] via-[#00c9db] to-[#00b4d8] bg-clip-text text-transparent font-bold">
          mint
        </span>
      </span>
    </div>
  );
};

// Aliases for compatibility
export const OpenStoryIcon = VidmintIcon;
export const OpenStoryLogo = VidmintLogo;
