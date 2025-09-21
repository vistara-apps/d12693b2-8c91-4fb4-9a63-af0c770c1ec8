'use client'

import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50'

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-surface text-text-primary border border-surface hover:bg-surface/80',
    outline: 'border border-surface text-text-primary hover:bg-surface/50',
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  )
}

