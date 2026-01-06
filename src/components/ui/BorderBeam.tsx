import React from 'react'
import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  borderWidth = 1.5,
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--anchor': anchor,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        'border border-transparent',
        'bg-gradient-to-r from-transparent via-transparent to-transparent',
        'before:absolute before:inset-0 before:rounded-[inherit]',
        'before:bg-[linear-gradient(var(--color-from),var(--color-to),transparent)]',
        'before:opacity-0 before:transition-opacity before:duration-[var(--duration)]',
        'hover:before:opacity-100',
        className
      )}
    />
  )
}

export default BorderBeam

