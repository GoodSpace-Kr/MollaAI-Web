import { CalendarDays, Quote } from "lucide-react";
import symbol from "../../assest/icon/Symbol.svg";

type ReportHeroCardProps = {
  badge?: string;
  subTitle?: string;
  title: string;
  date: string;
  reportType?: string;
  duration: string;
};

const ReportHeroCard = ({
  subTitle = "오늘의 주요 학습",
  title,
  date,
  reportType = "통화 분석 리포트",
  duration,
}: ReportHeroCardProps) => {
  return (
    <div
      className="relative overflow-hidden rounded-[32px] px-10 md:px-16 pt-12 pb-[45px] flex flex-col gap-4 items-start justify-end"
      style={{
        background:
          "linear-gradient(165.48deg, #316FFF 0%, #2457FDCC 50%, #0D1D43 100%)",
        boxShadow: "0px 25px 50px -12px #c6d2ff",
      }}
    >
      <img
        src={symbol}
        alt=""
        aria-hidden
        className="absolute pointer-events-none select-none opacity-10"
        style={{
          right: "0%",
          top: "58%",
          transform: "translateY(calc(-50% - 40px))",
          width: "265px",
          maxWidth: "none",
        }}
      />

      <div className="backd60rop-blur-[6px] bg-white/20 px-3.5 py-1 rounded-full shrink-0">
        <span className="text-white text-[14px] tracking-wide">
          Daily Analysis
        </span>
      </div>

      <div className="flex flex-col pt-2 w-full">
        <p className="text-[#a1b7e9] text-[20px] md:text-[28px] font-semibold leading-[1.4]">
          {subTitle}
        </p>
        <p className="text-white text-[28px] md:text-[40px] font-bold leading-[1.25]">
          {title}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[#f8fafc]">
        <CalendarDays
          className="text-[#e0e7ff] shrink-0"
          size={18}
          strokeWidth={1.5}
        />
        <p className="text-[15px] md:text-[20px] whitespace-pre">
          {date} <span>{reportType}</span>
          {"  |  "}
          {duration} <span>통화</span>
        </p>
      </div>
    </div>
  );
};

export default ReportHeroCard;
