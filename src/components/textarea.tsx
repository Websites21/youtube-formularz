'use client';

import { cn } from '@/lib/utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export default function Textarea({
  hasError = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full bg-white resize-none text-black rounded-3xl pl-5 py-4 placeholder:text-neutral-600',
        hasError && 'shadow-border-red bg-red-400/25 placeholder:text-red-400'
      )}
    />
  );
}
