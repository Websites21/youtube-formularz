'use client';

import { cn } from '@/lib/utils';

type FileInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function FileInput({ hasError = false, ...props }: FileInputProps) {
  return (
    <input
      type='file'
      {...props}
      className={cn(
        'text-sm text-neutral-950 file:mr-4 file:py-2 file:px-4',
        'file:rounded-full file:text-sm',
        'file:bg-neutral-950 file:text-white',
        hasError && 'text-red-700 file:text-red-700 file:bg-red-700/25'
      )}
    />
  );
}
