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
        'flex flex-col md:flex-row cursor-pointer gap-4 items-center text-white',
        !isAccessible && 'cursor-not-allowed',
        !isActive && 'md:flex hidden'
      )}
      onClick={() => {
        if (isAccessible) {
          setCurrentStep(step);
          setCurrentQuestion(1);
        }
      }}
    >
      <span className='text-center md:text-right flex flex-col gap-0.5'>
        <span className='font-semibold'>{title}</span>
        <span className='text-sm'>Krok {step}</span>
      </span>
      <span
        className={cn(
          '-order-1 md:order-none rounded-full p-3 bg-white stroke-black transition-all duration-300 delay-300',
          (isActive || isCompleted) && 'bg-green-200',
          isActive && 'shadow-border-green'
        )}
      >
        {icon}
      </span>
    </button>
  );
}
