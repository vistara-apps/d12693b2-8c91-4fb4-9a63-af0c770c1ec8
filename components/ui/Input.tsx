'use client'

import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className, onChange, ...props }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 bg-surface border border-surface rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent',
          className
        )}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

