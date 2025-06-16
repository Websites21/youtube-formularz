import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import imageCompression from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function compressImage(file: File) {
  const fileType = file.type;

  const options = {
    maxSizeMB: 0.6,
    useWebWorker: true,
    fileType: fileType,
  };

  const compressedFile = await imageCompression(file, options);

  return new File([compressedFile], file.name, { type: fileType });
}
