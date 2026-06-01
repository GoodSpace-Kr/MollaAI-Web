type AuthStep = "phone" | "code" | "name";

type StepIndicatorProps = {
  step: AuthStep;
};

const StepIndicator = ({ step }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <div
        className={`h-2 w-2 rounded-full ${
          step === "phone" ? "bg-primary" : "bg-surface-container"
        }`}
      />
      <div
        className={`h-2 w-2 rounded-full ${
          step === "code" ? "bg-primary" : "bg-surface-container"
        }`}
      />
      <div
        className={`h-2 w-2 rounded-full ${
          step === "name" ? "bg-primary" : "bg-surface-container"
        }`}
      />
    </div>
  );
};

export default StepIndicator;
