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
  const isActiveOrCompleted = isActive || isCompleted;
  const isAccessible = step === currentStep || isCompleted;

  return (
    <button
      className={cn(
        'flex cursor-pointer gap-4 items-center',
        !isAccessible && 'cursor-not-allowed'
      )}
      onClick={() => {
        if (isAccessible) {
          setCurrentStep(step);
          setCurrentQuestion(1);
        }
      }}
    >
      <span className='text-right flex flex-col gap-0.5'>
        <span
          className={cn(
            'text-neutral-950 font-semibold',
            isActiveOrCompleted && 'text-neutral-950'
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'text-sm text-neutral-950',
            isActiveOrCompleted && 'text-neutral-950'
          )}
        >
          Krok {step}
        </span>
      </span>
      <span
        className={cn(
          'rounded-full p-3',
          !isActiveOrCompleted && 'bg-neutral-950 stroke-neutral-50',
          (isActive || isCompleted) && 'bg-green-200 stroke-neutral-950'
        )}
      >
        {icon}
      </span>
    </button>
  );
}
