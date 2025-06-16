'use client';

import { cn } from '@/lib/utils';

type MessageProps = {
  message?: string;
  type: 'error' | 'success';
};

export default function Message({ message, type }: MessageProps) {
  if (!message) return null;

  return (
    <p
      className={cn(
        'text-sm mt-3',
        type === 'error' && 'text-red-400',
        type === 'success' && 'text-green-400'
      )}
    >
      {message}
    </p>
  );
}
