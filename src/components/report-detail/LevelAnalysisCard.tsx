import RankBadges from "./RankBadges";
import TopRankBadge from "./TopRankBadge";

type LevelAnalysisCardProps = {
  description: string;
  percent: number;
};

const LevelAnalysisCard = ({ description, percent }: LevelAnalysisCardProps) => {
  return (
    <section className="rounded-[28px] bg-white px-10 md:px-16 py-10 shadow-[0_4px_12px_rgba(15,23,42,0.08)] border border-[#f1f3f5]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h2 className="text-[#3b3b3d] text-[24px] font-bold tracking-[-0.02em]">
              Comprehensive Level Analysis
            </h2>

            <p className="text-[#7D7D7D] text-[19px] font-medium leading-[1.45] whitespace-pre-line">
              {description}
            </p>
          </div>

          <RankBadges percent={percent} />
        </div>

        <div className="shrink-0">
          <TopRankBadge percent={percent} />
        </div>
      </div>
    </section>
  );
};

export default LevelAnalysisCard;
