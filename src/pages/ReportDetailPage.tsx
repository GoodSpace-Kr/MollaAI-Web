import ReportHeroCard from "@/components/report-detail/ReportHeroCard";
import ScorePredictionCard from "@/components/report-detail/ScorePredictionCard";
import LevelAnalysisCard from "@/components/report-detail/LevelAnalysisCard";
import CoreSentenceFeedback from "@/components/report-detail/CoreSentenceFeedback";
import HabitAnalysis from "@/components/report-detail/HabitAnalysis";
import WeakPoints from "@/components/report-detail/WeakPoints";
import {
  feedbackItems,
  habitAnalysisItems,
  scorePredictions,
  weakPointItems,
} from "@/constants/reportDetailData";

const ReportDetailPage = () => {
  return (
    <div className="min-h-screen bg-white px-3 py-10">
      <div className="max-w-7xl mx-auto mt-35 flex flex-col gap-8">
        <ReportHeroCard
          title="상사와의 논리점 차이"
          date="2026.05.24"
          duration="20분"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {scorePredictions.map((item) => (
            <ScorePredictionCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-10">
          <LevelAnalysisCard
            percent={5}
            description={`전체 학습자 중 상위 5%에 해당하는 놀라운 성취입니다.
            고급 어휘 사용 빈도가 비약적으로 상승했습니다.`}
          />
        </div>

        <div className="mt-10">
          <CoreSentenceFeedback items={feedbackItems} />
        </div>

        <div className="flex gap-5 mt-10">
          <HabitAnalysis items={habitAnalysisItems} />
          <WeakPoints items={weakPointItems} />
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
