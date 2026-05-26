import { getReports, type ReportSummary } from "@/api/reportApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const PLAN_LABEL = {
//   beginner: "비기너",
//   premium: "프리미엄",
// } as const;

const ReportListPage = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [subscription, setSubscription] = useState<MySubscription | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getReports();

        // const [reportsData, subscriptionData] = await Promise.all([
        //   getReports(),
        //   getMySubscription(),
        // ]);

        // setReports(reportsData);
        // setSubscription(subscriptionData);

        setReports(data);
      } catch {
        setErrorMessage("정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-3 py-10">
      <div className="max-w-7xl mx-auto mt-25 flex flex-col gap-8">
        {/* {!isLoading && subscription && (
          <section className="rounded-[28px] bg-white border border-[#EEF2F7] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-8 py-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-[20px] bg-[#F2F4FF] border border-[#DDE3FF] px-6 py-5">
                <p className="text-[#64748B] text-sm font-bold">구독 정보</p>
                <p className="mt-2 text-[#0F172B] text-2xl font-black">
                  {PLAN_LABEL[subscription.planType]}
                </p>
              </div>

              <div className="rounded-[20px] bg-white border border-[#EEF2F7] px-6 py-5">
                <p className="text-[#64748B] text-sm font-bold">
                  하루 남은 통화량
                </p>
                <p className="mt-2 text-[#316FFF] text-2xl font-black">
                  {subscription.remainingMinutesToday}분
                </p>
              </div>

              <div className="rounded-[20px] bg-white border border-[#EEF2F7] px-6 py-5">
                <p className="text-[#64748B] text-sm font-bold">
                  하루 할당 통화량
                </p>
                <p className="mt-2 text-[#0F172B] text-2xl font-black">
                  {subscription.dailyLimitMinutes}분
                </p>
              </div>
            </div>
          </section>
        )} */}

        <div>
          <h1 className="text-[#0F172B] text-3xl font-bold">리포트 목록</h1>
        </div>

        {isLoading && (
          <div className="text-center rounded-[28px] bg-white border border-[#EEF2F7] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-8 py-10">
            <p className="text-[#64748B] font-medium">
              리포트 목록을 불러오는 중입니다...
            </p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="rounded-[28px] bg-white border border-[#F9DDE3] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-8 py-10">
            <p className="text-[#E63355] font-bold">{errorMessage}</p>
          </div>
        )}

        {!isLoading && !errorMessage && reports.length === 0 && (
          <div className="rounded-[28px] bg-white border border-[#EEF2F7] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-8 py-10">
            <p className="text-[#64748B] font-medium">
              아직 생성된 리포트가 없습니다.
            </p>
          </div>
        )}

        {!isLoading && !errorMessage && reports.length > 0 && (
          <div className="grid grid-cols-1 gap-5">
            {reports.map((report) => (
              <button
                key={report.id}
                type="button"
                onClick={() => navigate(`/reports/${report.sessionId}`)}
                className="rounded-[28px] bg-white border border-[#EEF2F7] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-8 py-7 flex items-center justify-between gap-8"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-[#0F172B] text-xl font-bold leading-8">
                    {report.oneLineSummary}
                  </p>
                </div>

                <div className="shrink-0 flex gap-2">
                  <p className="text-[#0F172B] text-2xl font-black">상위</p>
                  <p className="text-[#5272FF] text-2xl font-black">
                    {report.levelPercentage}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportListPage;
