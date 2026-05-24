import RankRing from "@/assest/rank-ring.svg?react";

export type TopRankPercent = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70;

type TopRankBadgeProps = {
  percent: TopRankPercent;
};

const RANK_STYLE = {
  5: {
    color: "#EC003F",
    label: "Exceptional Performance",
  },
  10: {
    color: "#37D45E",
    label: "Exceptional Performance",
  },
  20: {
    color: "#35D4CC",
    label: "Top Performer",
  },
  30: {
    color: "#35D4CC",
    label: "Excellent Progress",
  },
  40: {
    color: "#3C64E8",
    label: "Strong Achiever",
  },
  50: {
    color: "#3C64E8",
    label: "Above Average",
  },
  60: {
    color: "#3A3939",
    label: "Growing Potential",
  },
  70: {
    color: "#3A3939",
    label: "Growing Potential",
  },
} as const;

const TopRankBadge = ({ percent }: TopRankBadgeProps) => {
  const rank = RANK_STYLE[percent];

  return (
    <div className="relative w-[224px] h-[224px] flex items-center justify-center">
      <RankRing
        className="absolute inset-0 w-full h-full [&_path]:stroke-[var(--rank-color)] [&_circle]:stroke-[var(--rank-color)]"
        style={
          {
            "--rank-color": rank.color,
          } as React.CSSProperties
        }
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <p className="text-[#0F172B] text-[36px] font-black leading-10 tracking-[-0.04em]">
          상위 {percent}%
        </p>
        <p className="text-[#90A1B9] text-sm font-medium leading-5">
          {rank.label}
        </p>
      </div>
    </div>
  );
};

export default TopRankBadge;
