import { getReports, type ReportSummary } from "@/api/reportApi";
import { getMySubscription, MySubscription } from "@/api/subscriptionApi";
import SubscriptionPlanCard from "@/components/report-list/SubscriptionPlanCard";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import clockIcon from "../assest/icon/clock.svg";
import thunderIcon from "../assest/icon/thunder.svg";
import searchIcon from "../assest/icon/search.svg";
import Pagination from "@/components/common/Pagination";
import ReportCard from "@/components/report-list/ReportCard";

const PLAN_LABEL = {
  beginner: "Beginner Plan",
  premium: "Premium Plan",
} as const;

const ITEMS_PER_PAGE = 6;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

const ReportListPage = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [subscription, setSubscription] = useState<MySubscription | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [reportsData, subscriptionData] = await Promise.all([
          getReports(),
          getMySubscription(),
        ]);

        setReports(reportsData);
        setSubscription(subscriptionData);
      } catch {
        setErrorMessage("정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredReports = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) return reports;

    return reports.filter((report) =>
      report.oneLineSummary.toLowerCase().includes(normalizedKeyword),
    );
  }, [keyword, reports]);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredReports.slice(startIndex, endIndex);
  }, [currentPage, filteredReports]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  return (
    <div className="min-h-screen bg-[rgb(248,250,252)] px-3 py-10">
      <div className="max-w-7xl mx-auto mt-25 flex flex-col gap-8">
        {!isLoading && subscription && (
          <section className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-14 mb-20">
            <SubscriptionPlanCard
              planName={PLAN_LABEL[subscription.planType]}
            />

            <div className="flex flex-col justify-between gap-5 rounded-[28px] bg-white border border-[#EEF2F7] shadow-card px-8 py-7">
              <div className="flex justify-between ">
                <div className="">
                  <p className="text-[#62748E] text-[17px] font-semibold">
                    남은 시간
                  </p>
                  <p className="text-[#90A1B9] text-[18px] font-medium">
                    <span className="text-[#0F172B] text-[30px] font-bold mr-2">
                      {subscription.remainingMinutesToday}
                    </span>
                    / {subscription.dailyLimitMinutes}분
                  </p>
                </div>
                <div className="flex rounded-[16px] bg-[#FFFBEB] justify-center items-center h-13 w-13">
                  <img src={clockIcon} alt="시계" className="h-6" />
                </div>
              </div>

              <div className="flex gap-3 items-center bg-[#F8FAFC] border border-[#F1F5F9] rounded-[16px] p-4 text-[15px] font-medium">
                <span className="bg-[#FEF3C6] rounded-full h-10 w-10 flex justify-center items-center">
                  <img src={thunderIcon} className="h-4" />
                </span>
                꾸준함이 실력을 만듭니다
              </div>
            </div>
          </section>
        )}

        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="text-[#0F172B] text-[25px] md:text-[34px] font-bold">
              학습 리포트 보관함
            </div>
            <div className="text-[13px] md:text-[18px] text-[#62748E] font-medium">
              지금까지 진행한 총{" "}
              <span className="text-[#3C64E8] font-bold">
                {filteredReports.length}개
              </span>
              의 AI 정밀 분석 결과를 확인해보세요.
            </div>
          </div>

          <div className="relative mt-3 md:mt-7">
            <img
              src={searchIcon}
              alt="검색"
              className="absolute left-3 top-5 md:left-4.5 md:top-6.5 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 pointer-events-none"
            />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="리포트 제목 또는 키워드 검색"
              className="
                max-w-[250px]
                h-[40px]
                md:w-[320px]
                md:h-[49px]
                rounded-[13px]
                md:rounded-[16px]
                border border-[#E2E8F0]
                bg-white
                pl-8.5
                md:pl-12
                pr-6
                text-[13px]
                md:text-[14px]
                text-[#0F172B]
                placeholder:text-[#B9B9B9]
                outline-none
              "
            />
          </div>
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
          <div className="text-center rounded-[28px] bg-white border border-[#EEF2F7] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-8 py-10">
            <p className="text-[#64748B] font-medium">
              아직 생성된 리포트가 없습니다.
            </p>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          reports.length > 0 &&
          filteredReports.length === 0 && (
            <div className="text-center rounded-[28px] bg-white border border-[#EEF2F7] shadow-card px-8 py-10">
              <p className="text-[#64748B] font-medium">
                검색 결과가 없습니다.
              </p>
            </div>
          )}

        {!isLoading && !errorMessage && filteredReports.length > 0 && (
          <>
            <div className="grid lg:grid-cols-3 gap-7">
              {paginatedReports.map((report, index) => {
                const isLatest = currentPage === 1 && index === 0;

                return (
                  <ReportCard
                    key={report.id}
                    report={report}
                    isLatest={isLatest}
                    onClick={() => navigate(`/reports/${report.sessionId}`)}
                  />
                );
              })}
            </div>

            <Pagination
              currentPage={currentPage}
              totalItems={filteredReports.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReportListPage;
