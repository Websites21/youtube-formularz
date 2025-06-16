'use client';

import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export default function Input({ hasError = false, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'w-full bg-white text-black rounded-full pl-5 py-4 placeholder:text-neutral-500',
        hasError && 'shadow-border-red bg-red-400/25 placeholder:text-red-400'
      )}
    />
  );
}
