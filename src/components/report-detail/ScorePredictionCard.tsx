type ScorePredictionCardProps = {
  title: string;
  score: string;
  maxScore?: string;
  logoSrc: string;
  logoAlt: string;
};

const ScorePredictionCard = ({
  title,
  score,
  maxScore,
  logoSrc,
  logoAlt,
}: ScorePredictionCardProps) => {
  return (
    <div className="relative h-[190px] rounded-[24px] bg-white border border-[#eef0f4] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-8 py-7 overflow-hidden">
      <div className="flex items-start justify-between">
        <p className="text-[#B9B9B9] text-[18px] font-semibold tracking-[-0.02em]">
          {title}
        </p>

        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-8 w-auto object-contain"
        />
      </div>

      <div className="absolute left-8 bottom-11 flex items-baseline gap-4">
        <span className="text-[#3A3939] text-[48px] font-bold leading-none tracking-[-0.04em]">
          {score}
        </span>

        {maxScore && (
          <span className="text-[#b8b8b8] text-[20px] font-semibold">
            / {maxScore}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScorePredictionCard;
