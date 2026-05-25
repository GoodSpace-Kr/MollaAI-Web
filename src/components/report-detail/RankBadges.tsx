import goldMedal from "../../assest/icon/medal-gold.svg";
import platinumMedal from "../../assest/icon/medal-platinum.svg";
import excellenceMedal from "../../assest/icon/medal-excellence.svg";

type BadgeItem = {
  label: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  iconSrc?: string;
  iconAlt?: string;
};

type RankBadgesProps = {
  percent: number;
};

const getBadge = (percent: number): BadgeItem | null => {
  if (percent <= 19) {
    return {
      label: "Gold Achievement",
      textColor: "#E17100",
      bgColor: "#FFFBEB",
      borderColor: "#FEF3C6",
      iconSrc: goldMedal,
      iconAlt: "Gold medal",
    };
  } else if (percent <= 39) {
    return {
      label: "Platinum Rank",
      textColor: "#31BE55",
      bgColor: "#E9FEEE",
      borderColor: "#F0FFC3",
      iconSrc: platinumMedal,
      iconAlt: "Platinum medal",
    };
  } else if (percent <= 59) {
    return {
      label: "Excellence Badge",
      textColor: "#E93A62",
      bgColor: "#FFF4F8",
      borderColor: "#FFE8F0",
      iconSrc: excellenceMedal,
      iconAlt: "Excellence medal",
    };
  }

  // 60~100% : 배지 없음
  return null;
};

const RankBadges = ({ percent }: RankBadgesProps) => {
  const badge = getBadge(percent);

  if (!badge) return null;

  return (
    <div className="flex gap-4">
      <div
        className="inline-flex w-fit items-center justify-center gap-2 rounded-full border px-5 py-1"
        style={{
          color: badge.textColor,
          backgroundColor: badge.bgColor,
          borderColor: badge.borderColor,
        }}
      >
        {badge.iconSrc && (
          <img
            src={badge.iconSrc}
            alt={badge.iconAlt ?? ""}
            className="h-5 w-5 object-contain"
          />
        )}

        <span className="text-[16px] font-bold leading-7">{badge.label}</span>
      </div>
    </div>
  );
};

export default RankBadges;
