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
        'text-sm text-white file:mr-4 file:py-2 file:px-4',
        'file:rounded-full file:text-sm',
        'file:bg-white file:text-black',
        hasError && 'text-red-400 file:text-red-400 file:bg-red-400/25'
      )}
    />
  );
}
