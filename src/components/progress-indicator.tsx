type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const progressHeight =
    currentStep === 1
      ? '0%'
      : currentStep === totalSteps
      ? '100%'
      : `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  return (
    <div className='absolute top-0 -z-50 right-6 h-full w-1 bg-white/25 hidden md:block'>
      <div
        className='absolute top-0 w-1 bg-green-200 transition-all duration-1000'
        style={{ height: progressHeight }}
      />
    </div>
  );
}
