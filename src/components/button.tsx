'use client';

import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(className)} {...props}>
      {children}
    </button>
  );
}
