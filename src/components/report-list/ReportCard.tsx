import type { ReportSummary } from "@/api/reportApi";
import LatestSessionBadge from "./LatestSessionBadge";

type ReportCardProps = {
  report: ReportSummary;
  isLatest?: boolean;
  onClick: () => void;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

const ReportCard = ({ report, isLatest = false, onClick }: ReportCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-[32px]
        bg-white/90
        border
        shadow-card
        px-8
        pt-6
        pb-3
        text-left
        transition-all
        hover:-translate-y-1
        hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]
        ${isLatest ? "border-[#316FFF] border-2" : "border-[#EEF2F7]"}
      `}
    >
      <div className="flex flex-col justify-between gap-4">
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-[#90A1B9] text-[16px] font-normal">
              {formatDate(report.createdAt)}
            </p>

            {isLatest && <LatestSessionBadge />}
          </div>

          <p className="text-[#0F172B] text-[22px] font-bold mb-4 leading-[1.4]">
            {report.oneLineSummary}
          </p>

          <p className="text-[#62748E] text-[16px] font-normal leading-7">
            {report.levelAnalysis}
          </p>
        </div>

        <div>
          <p
            className={`
              text-right text-[40px] font-extrabold
              ${isLatest ? "text-[#5272FF]" : "text-[#62748E]"}
            `}
          >
            {report.sessionDurationMinutes}{" "}
            <span className="text-[#CAD5E2] text-[16px]">분</span>
          </p>
        </div>
      </div>
    </button>
  );
};

export default ReportCard;
