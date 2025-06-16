'use client';

import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'cursor-pointer text-black py-3 px-6 font-bold flex rounded-full bg-white gap-2 items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
