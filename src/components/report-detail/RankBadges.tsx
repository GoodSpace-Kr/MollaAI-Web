import goldMedal from "../../assest/icon/medal-gold.svg";
import platinumMedal from "../../assest/icon/medal-platinum.svg";
import excellenceMedal from "../../assest/icon/medal-excellence.svg";

export type RankRange = "5-10" | "20-30" | "40-50" | "60-70";

type BadgeItem = {
  label: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  iconSrc?: string;
  iconAlt?: string;
};

type RankBadgesProps = {
  range: RankRange;
};

const RANK_BADGE_MAP: Record<RankRange, BadgeItem[]> = {
  "5-10": [
    {
      label: "Gold Achievement",
      textColor: "#E17100",
      bgColor: "#FFFBEB",
      borderColor: "#FEF3C6",
      iconSrc: goldMedal,
      iconAlt: "Gold medal",
    },
    {
      label: "Advanced Speaker",
      textColor: "#4F39F6",
      bgColor: "#EEF2FF",
      borderColor: "#E0E7FF",
    },
  ],
  "20-30": [
    {
      label: "Platinum Rank",
      textColor: "#31BE55",
      bgColor: "#E9FEEE",
      borderColor: "#F0FFC3",
      iconSrc: platinumMedal,
      iconAlt: "Platinum medal",
    },
    {
      label: "Premium Score",
      textColor: "#4F39F6",
      bgColor: "#EEF2FF",
      borderColor: "#E0E7FF",
    },
  ],
  "40-50": [
    {
      label: "Excellence Badge",
      textColor: "#E93A62",
      bgColor: "#FFF4F8",
      borderColor: "#FFE8F0",
      iconSrc: excellenceMedal,
      iconAlt: "Excellence medal",
    },
    {
      label: "Outstanding Result",
      textColor: "#4F39F6",
      bgColor: "#EEF2FF",
      borderColor: "#E0E7FF",
    },
  ],
  "60-70": [
    {
      label: "Growth Track",
      textColor: "#FF2056",
      bgColor: "#FFF3F6",
      borderColor: "#FFF3F4",
    },
  ],
};

const RankBadges = ({ range }: RankBadgesProps) => {
  const badges = RANK_BADGE_MAP[range];

  return (
    <div className="flex gap-4">
      {badges.map((badge) => (
        <div
          key={badge.label}
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
      ))}
    </div>
  );
};

export default RankBadges;
