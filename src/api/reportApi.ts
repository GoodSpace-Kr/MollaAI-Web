import { authAxios } from "./axiosInstance";

export type ReportScore = {
  exam: "IELTS" | "TOEIC" | "OPIC";
  score: string;
};

export type ReportSummary = {
  id: string;
  sessionId: string;
  reportType: string;
  oneLineSummary: string;
  scores: ReportScore[];
  levelPercentage: number;
  levelAnalysis: string;
  levelResult: string | null;
  sessionDurationMinutes: number;
  createdAt: string;
};

export type GetReportsResponse = {
  code: string;
  message: string;
  data: ReportSummary[];
  timestamp: string;
};

export type CoreSentence = {
  sourceTurnIndex: number;
  originSentence: string;
  improvedSentence: string;
  keyExpression: string;
  keyExpressionKorean: string;
  sampleRate: number;
  audioKey: string;
  audioUrl: string;
};

export type HabitAnalysis = {
  habit: string;
  evidence: string;
  suggestion: string;
};

export type ReportDetail = {
  id: string;
  sessionId: string;
  reportType: string;
  oneLineSummary: string;
  coreSentences: CoreSentence[];
  habitAnalyses: HabitAnalysis[];
  scores: ReportScore[];
  weakPoints: string[];
  levelPercentage: number;
  levelAnalysis: string;
  levelResult: string | null;
  sessionStartedAt: string;
  sessionDurationMinutes: number;
  createdAt: string;
};

export type GetReportDetailResponse = {
  code: string;
  message: string;
  data: ReportDetail;
  timestamp: string;
};

export const getReports = async (): Promise<ReportSummary[]> => {
  const response = await authAxios.get<GetReportsResponse>("/api/v1/reports");

  return response.data.data;
};

export const getReportDetail = async (
  sessionId: string,
): Promise<ReportDetail> => {
  const response = await authAxios.get<GetReportDetailResponse>(
    `/api/v1/reports/${sessionId}`,
  );

  return response.data.data;
};
