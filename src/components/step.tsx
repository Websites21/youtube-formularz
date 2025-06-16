import { cn } from '@/lib/utils';

type StepProps = {
  title: string;
  step: number;
  icon: React.ReactNode;
  isActive: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setCurrentQuestion: (question: number) => void;
};

export function Step({
  title,
  step,
  icon,
  isActive,
  currentStep,
  setCurrentStep,
  setCurrentQuestion,
}: StepProps) {
  const isCompleted = currentStep > step;
  const isAccessible = step === currentStep || isCompleted;

  return (
    <button
      className={cn(
        'flex cursor-pointer gap-4 items-center text-white transition-all duration-300',
        !isAccessible && 'cursor-not-allowed opacity-50'
      )}
      onClick={() => {
        if (isAccessible) {
          setCurrentStep(step);
          setCurrentQuestion(1);
        }
      }}
    >
      <span className='text-right flex flex-col gap-0.5'>
        <span className='font-semibold'>{title}</span>
        <span className='text-sm'>Krok {step}</span>
      </span>
      <span
        className={cn(
          'rounded-full p-3 transition-all duration-300 bg-white stroke-black',
          (isActive || isCompleted) && 'bg-green-200'
        )}
      >
        {icon}
      </span>
    </button>
  );
}
