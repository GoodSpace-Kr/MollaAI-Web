import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReportHeroCard from "@/components/report-detail/ReportHeroCard";
import ScorePredictionCard from "@/components/report-detail/ScorePredictionCard";
import LevelAnalysisCard from "@/components/report-detail/LevelAnalysisCard";
import CoreSentenceFeedback, {
  type FeedbackItem,
} from "@/components/report-detail/CoreSentenceFeedback";
import HabitAnalysis, {
  type HabitAnalysisItem,
} from "@/components/report-detail/HabitAnalysis";
import WeakPoints, {
  type WeakPointItem,
} from "@/components/report-detail/WeakPoints";

import {
  getExamDisplayName,
  getReportDetail,
  type ReportDetail,
} from "@/api/reportApi";

import ieltsLogo from "../assest/ielts.svg";
import toeicLogo from "../assest/toeic.svg";
import opicLogo from "../assest/opic.svg";
import FullSessionScript, {
  type ScriptMessageItem,
} from "@/components/report-detail/full-script/FullSessionScript";
import { logoMap } from "@/constants/reportDetailData";

const formatDate = (dateString: string) => {
  return dateString.slice(0, 10).replace(/-/g, ".");
};

const ReportDetailPage = () => {
  const { id: sessionId } = useParams<{ id: string }>();

  const [report, setReport] = useState<ReportDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchReportDetail = async () => {
      if (!sessionId) return;

      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getReportDetail(sessionId);
        setReport(data);
      } catch {
        setErrorMessage("리포트 상세 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportDetail();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white px-3 py-10">
        <div className="max-w-7xl mx-auto mt-35 text-center mt-80">
          <p className="text-[#64748B] text-xl font-medium">
            리포트를 불러오는 중입니다...
          </p>
        </div>
      </div>
    );
  }

  if (errorMessage || !report) {
    return (
      <div className="min-h-screen bg-white px-3 py-10">
        <div className="max-w-7xl mx-auto mt-35 text-center mt-80">
          <p className="text-[#E63355] text-xl font-bold">
            {errorMessage || "리포트가 존재하지 않습니다."}
          </p>
        </div>
      </div>
    );
  }

  const scorePredictions = report.scores.map((score) => {
    const logo = logoMap[score.exam];

    return {
      title: `${getExamDisplayName(score.exam)} PREDICTED`,
      score: score.score,
      maxScore: logo.maxScore,
      logoSrc: logo.logoSrc,
      logoAlt: logo.logoAlt,
    };
  });

  const feedbackItems: FeedbackItem[] = report.coreSentences.map(
    (sentence, index) => ({
      id: sentence.sourceTurnIndex ?? index + 1,
      originalSentence: sentence.originSentence,
      improvedSentence: sentence.improvedSentence,
      keyExpression: sentence.keyExpression,
      meaning: sentence.keyExpressionKorean,
      variant: "red",
    }),
  );

  const habitAnalysisItems: HabitAnalysisItem[] = report.habitAnalyses.map(
    (habit, index) => ({
      id: index + 1,
      title: habit.habit,
      evidence: habit.evidence,
      suggestion: habit.suggestion,
    }),
  );

  const weakPointItems: WeakPointItem[] = report.weakPoints.map(
    (weakPoint, index) => ({
      id: index + 1,
      label: weakPoint,
      variant: "red",
    }),
  );

  const formatTime = (dateString: string) => dateString.slice(11, 19);

  const fullScript: ScriptMessageItem[] = report.transcript.flatMap(
    (transcript, index) => [
      {
        id: index * 2 + 1,
        speaker: "user" as const,
        name: "나",
        time: formatTime(transcript.createdAt),
        text: transcript.user.text,
        translation: "",
        audioUrl: transcript.user.audioUrl,
      },
      {
        id: index * 2 + 2,
        speaker: "ai" as const,
        name: "MOLLA",
        time: formatTime(transcript.assistant.createdAt),
        text: transcript.assistant.text,
        translation: transcript.assistant.translatedText,
      },
    ],
  );

  return (
    <div className="min-h-screen bg-white px-3 py-10">
      <div className="max-w-7xl mx-auto mt-35 flex flex-col gap-8">
        <ReportHeroCard
          title={report.oneLineSummary}
          date={formatDate(report.sessionStartedAt)}
          duration={`${report.sessionDurationMinutes}분`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {scorePredictions.map((item) => (
            <ScorePredictionCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-10">
          <LevelAnalysisCard
            percent={report.levelPercentage}
            description={report.levelAnalysis}
          />
        </div>

        <div className="mt-10">
          <CoreSentenceFeedback items={feedbackItems} />
        </div>

        <div className="flex flex-col md:flex-row gap-18 md:gap-5 mt-10">
          <HabitAnalysis items={habitAnalysisItems} />
          <WeakPoints items={weakPointItems} />
        </div>

        <div className="mt-10">
          <FullSessionScript items={fullScript} />
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
