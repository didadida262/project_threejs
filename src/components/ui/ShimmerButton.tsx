import React from 'react'
import { cn } from '@/lib/utils'

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            '--shimmer-color': shimmerColor,
            '--shimmer-size': shimmerSize,
            '--shimmer-duration': shimmerDuration,
            '--radius': borderRadius,
            '--background': background,
          } as React.CSSProperties
        }
        className={cn(
          'relative z-10 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--background)] [border-radius:var(--radius)] transition-colors hover:bg-white/10',
          'before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(110deg,transparent,var(--shimmer-color),transparent),var(--background)] before:bg-[length:200%_100%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:opacity-0 before:transition-opacity before:duration-[var(--shimmer-duration)] before:ease-in-out hover:before:animate-[shimmer_2s_ease-in-out_infinite] hover:before:opacity-100',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

ShimmerButton.displayName = 'ShimmerButton'

export default ShimmerButton

