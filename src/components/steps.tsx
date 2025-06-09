import { PaperClip, Book, Camera, Lightning, User } from './icons';
import { Step } from './step';

const steps = [
  {
    title: 'Dane personalne',
    step: 1,
    icon: <User className='size-7 stroke-2' />,
  },
  {
    title: 'Obecne nawyki',
    step: 2,
    icon: <Lightning className='size-7 stroke-2' />,
  },
  {
    title: 'Szczegóły',
    step: 3,
    icon: <Book className='size-7 stroke-2' />,
  },
  {
    title: 'Zdjęcia i pomiary',
    step: 4,
    icon: <Camera className='size-7 stroke-2' />,
  },
  {
    title: 'Pliki',
    step: 5,
    icon: <PaperClip className='size-7 stroke-2' />,
  },
];

type StepsProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setCurrentQuestion: (question: number) => void;
};

export function Steps({
  currentStep,
  setCurrentStep,
  setCurrentQuestion,
}: StepsProps) {
  return (
    <div className='flex flex-col items-end gap-10'>
      {steps.map((step) => (
        <Step
          key={step.title}
          title={step.title}
          step={step.step}
          icon={step.icon}
          isActive={currentStep === step.step}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setCurrentQuestion={setCurrentQuestion}
        />
      ))}
    </div>
  );
}
