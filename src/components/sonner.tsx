'use client';

import { toast as sonnerToast } from 'sonner';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
});

export function formularz(toast: ToastProps) {
  return sonnerToast.custom(() => (
    <Formularz title={toast.title} description={toast.description} />
  ));
}

function Formularz(props: ToastProps) {
  const { title, description } = props;

  return (
    <div className={`rounded-xl bg-white p-4 ${plusJakartaSans.className}`}>
      <p className='font-medium mb-0.5 text-black flex items-center gap-1'>
        {title}
      </p>
      <p className='text-sm text-black'>{description}</p>
    </div>
  );
}

type ToastProps = {
  title: string;
  description: string;
};
