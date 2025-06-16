'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  hasError?: boolean;
};

export default function Select({
  children,
  hasError = false,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={cn(
        'w-full text-black bg-white rounded-full pl-5 py-4 appearance-none',
        hasError && 'shadow-border-red bg-red-400/25 text-red-400'
      )}
    >
      {children}
    </select>
  );
}
