import RankRing from "@/assest/rank-ring.svg?react";

type TopRankBadgeProps = {
  percent: number;
};

const getRankStyle = (percent: number) => {
  if (percent <= 9) {
    return { color: "#EC003F", label: "Exceptional Performance" };
  } else if (percent <= 19) {
    return { color: "#37D45E", label: "Excellent Progress" };
  } else if (percent <= 39) {
    return { color: "#35D4CC", label: "Top Performer" };
  } else if (percent <= 59) {
    return { color: "#3C64E8", label: "Strong Achiever" };
  } else {
    return { color: "#3A3939", label: "Growing Potential" };
  }
};

const TopRankBadge = ({ percent }: TopRankBadgeProps) => {
  const rank = getRankStyle(percent);

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
