import ieltsLogo from "../assest/ielts.svg";
import toeicLogo from "../assest/toeic.svg";
import opicLogo from "../assest/opic.svg";
import { FeedbackItem } from "@/components/report-detail/CoreSentenceFeedback";
import { HabitAnalysisItem } from "@/components/report-detail/HabitAnalysis";
import { WeakPointItem } from "@/components/report-detail/WeakPoints";

export const scorePredictions = [
  {
    title: "IELTS PREDICTED",
    score: "7.5",
    maxScore: "9.0",
    logoSrc: ieltsLogo,
    logoAlt: "IELTS",
  },
  {
    title: "TOEIC PREDICTED",
    score: "920",
    maxScore: "990",
    logoSrc: toeicLogo,
    logoAlt: "TOEIC Speaking",
  },
  {
    title: "OPIC PREDICTED",
    score: "IM 1",
    logoSrc: opicLogo,
    logoAlt: "ACTFL OPIc",
  },
];

export const feedbackItems: FeedbackItem[] = [
  {
    id: 1,
    originalSentence: "I have a lot of working",
    improvedSentence: "I have a lot on my plate right now.",
    keyExpression: "Have a lot on my plate",
    meaning: "할 일(책임)이 너무 많다",
    variant: "red",
  },
  {
    id: 2,
    originalSentence: "We need to talk again next week about this project.",
    improvedSentence: "Let’s touch base next week about this project.",
    keyExpression: "Touch base",
    meaning: "(짧게) 연락하다, 상황을 확인하다",
    variant: "orange",
  },
  {
    id: 3,
    originalSentence: "Everyone should contribute more to this team project.",
    improvedSentence: "Everyone needs to pull their weight on this project.",
    keyExpression: "Pull one’s weight",
    meaning: "자신의 몫을 다하다",
    variant: "orange",
  },
];

export const habitAnalysisItems: HabitAnalysisItem[] = [
  {
    id: 1,
    title: "특정 단어 반복 사용 습관",
    evidence:
      "최근 3번의 답변에서 'I think'라는 표현을 15회 이상 사용했습니다. 이는 어휘 다양성 점수를 낮추는 요인이 됩니다.",
    suggestion:
      "Believe, Assume, Consider, From my perspective 등의 유의어로 대체해 보세요.",
  },
  {
    id: 2,
    title: "문장 시작 전 필러 워드 사용",
    evidence:
      "문장을 시작하기 전에 불필요한 필러 표현이 반복적으로 나타났습니다.",
    suggestion: "Well, Umm 대신 바로 핵심 문장으로 시작하는 연습을 해보세요.",
  },
  {
    id: 3,
    title: "부사구 위치 오류",
    evidence:
      "부사구가 문장 내에서 어색한 위치에 배치되는 패턴이 확인되었습니다.",
    suggestion: "시간, 장소, 방식 부사구의 기본 위치를 다시 확인해보세요.",
  },
];

export const weakPointItems: WeakPointItem[] = [
  { id: 1, label: "주어-동사 수 일치", variant: "red" },
  { id: 2, label: "관사 사용(a/an/the)", variant: "orange" },
  { id: 3, label: "완료 시제 (Have pp)", variant: "red" },
  { id: 4, label: "관계 대명사 생략", variant: "orange" },
  { id: 5, label: "전치사 선택 오류", variant: "orange" },
];

export const EXPRESSION_STYLE = {
  red: {
    text: "text-[#F43F5E]",
    bg: "bg-[#FFF1F4]",
  },
  orange: {
    text: "text-[#F97316]",
    bg: "bg-[#FFF7ED]",
  },
} as const;

export const WEAK_POINT_STYLE = {
  red: {
    text: "text-[#E63355]",
    bg: "bg-[#FFF1F3]",
    border: "border-[#F9DDE3]",
    icon: "#E63355",
  },
  orange: {
    text: "text-[#D98224]",
    bg: "bg-[#FFFBEF]",
    border: "border-[#F6E8B7]",
    icon: "#D98224",
  },
} as const;
