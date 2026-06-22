import { type InputHTMLAttributes, forwardRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  error?: string
  endAdornment?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, endAdornment, className, id, ...props }, ref) => {
    const inputId = id ?? label

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ms-1">
          {label}
        </label>
        <div className="relative">
          {Icon ? (
            <span className="absolute inset-y-0 start-4 flex items-center text-slate-400 pointer-events-none">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              'w-full h-14 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl ps-12 pe-4',
              'text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-500',
              'focus:ring-2 focus:ring-kayan-blue focus:border-kayan-blue outline-none transition-shadow',
              error && 'border-red-400 focus:ring-red-400 focus:border-red-400',
              endAdornment ? 'pe-12' : undefined,
              className,
            )}
            {...props}
          />
          {endAdornment ? (
            <div className="absolute inset-y-0 end-4 flex items-center">{endAdornment}</div>
          ) : null}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-sm text-red-500 ms-1" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
