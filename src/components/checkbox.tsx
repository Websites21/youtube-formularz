'use client';

import { cn } from '@/lib/utils';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type='checkbox'
      {...props}
      className={cn(
        'mt-1 rounded border-slate-800 bg-slate-900 text-green-200 focus:ring-0 focus:ring-offset-0 transition-colors duration-200',
        className
      )}
    />
  );
}
