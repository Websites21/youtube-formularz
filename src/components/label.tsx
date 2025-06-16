import { cn } from '@/lib/utils';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  hasError?: boolean;
};

export function Label({ children, hasError = false, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={cn(
        'font-medium text-sm text-white mb-3 inline-block',
        hasError && 'text-red-400'
      )}
    >
      {children}
    </label>
  );
}
