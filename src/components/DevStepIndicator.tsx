// 개발용 (추후 삭제)

type DevAuthStep = "phone" | "name";

type DevStepIndicatorProps = {
  step: DevAuthStep;
  isSignup: boolean;
};

const DevStepIndicator = ({ step, isSignup }: DevStepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <div
        className={`h-2 w-2 rounded-full ${
          step === "phone" ? "bg-primary" : "bg-surface-container"
        }`}
      />

      {isSignup && (
        <div
          className={`h-2 w-2 rounded-full ${
            step === "name" ? "bg-primary" : "bg-surface-container"
          }`}
        />
      )}
    </div>
  );
};

export default DevStepIndicator;
