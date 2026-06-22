import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const checkboxId = id ?? label

    return (
      <label
        htmlFor={checkboxId}
        className={cn('flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer text-sm', className)}
      >
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-kayan-blue focus:ring-kayan-blue"
          {...props}
        />
        <span>{label}</span>
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
