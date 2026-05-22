import { ReactNode } from "react";
import { Brain, CalendarClock, UserX } from "lucide-react";

// ─── 타입 정의 ───────────────────────────────────────────────────────────────

export interface Problem {
  icon: ReactNode;
  title: string;
  desc: string;
}

export interface CourseItem {
  title: string;
  desc: string;
  color: string;
}

export interface PlanItem {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  desc: string;
  features: string[];
  popular: boolean;
}

export interface ReviewItem {
  name: string;
  role: string;
  text: string;
  stars: number;
}

export interface InfoColumn {
  title: string;
  links: string[];
}

// ─── 데이터 ───────────────────────────────────────────────────────────────────

export const Problems: Problem[] = [
  {
    icon: <Brain className="text-primary" size={32} />,
    title: "틀릴까봐 두려운 마음",
    desc: "문법이 맞는지, 발음이 이상한지 머릿속으로 번역하느라 타이밍을 놓칩니다.",
  },
  {
    icon: <UserX className="text-primary" size={32} />,
    title: "불편한 시선",
    desc: "원어민 선생님의 눈빛이나 다른 수강생들의 존재가 때로는 압박으로 다가옵니다.",
  },
  {
    icon: <CalendarClock className="text-primary" size={32} />,
    title: "부족한 실전 기회",
    desc: "학원이나 화상 영어를 예약하고 시간을 맞추는 것조차 스트레스가 됩니다.",
  },
];

export const Course: CourseItem[] = [
  { title: "일상 대화", desc: "친구와의 약속, 날씨 이야기", color: "bg-blue-50" },
  { title: "비즈니스", desc: "회의, 이메일, 프리젠테이션", color: "bg-indigo-50" },
  { title: "해외 여행", desc: "호텔 체크인, 길 찾기, 주문", color: "bg-orange-50" },
  { title: "인터뷰 대비", desc: "영어 면접, 자기소개", color: "bg-emerald-50" },
  { title: "이슈/토론", desc: "최신 뉴스에 대한 의견 교환", color: "bg-purple-50" },
  { title: "생활 영어", desc: "병원, 은행, 마트 이용하기", color: "bg-rose-50" },
  { title: "감정 표현", desc: "기쁨, 슬픔, 위로 표현하기", color: "bg-amber-50" },
  { title: "취미/관심사", desc: "영화, 음악, 스포츠 이야기", color: "bg-teal-50" },
];

export const Plan: PlanItem[] = [
  {
    name: "스타터",
    monthlyPrice: "29,000",
    yearlyPrice: "23,200",
    desc: "가볍게 시작하고 싶은 입문자용",
    features: [
      "월 30분 통화",
      "기본 AI 튜터 제공",
      "학습 리포트 제공",
      "메신저 알림",
    ],
    popular: false,
  },
  {
    name: "프로",
    monthlyPrice: "59,000",
    yearlyPrice: "47,200",
    desc: "가장 많은 분들이 선택하는 요금제",
    features: [
      "월 100분 통화",
      "프리미엄 AI 튜터 제공",
      "상세 문법 교정 리포트",
      "맞춤형 학습 커리큘럼",
      "우선 고객 지원",
    ],
    popular: true,
  },
  {
    name: "비즈니스",
    monthlyPrice: "99,000",
    yearlyPrice: "79,200",
    desc: "확실한 실력 향상을 원하는 실전파",
    features: [
      "무제한 통화",
      "모든 AI 튜터 모델 사용",
      "실시간 발음 코칭",
      "비즈니스 전문 과정 포함",
      "1:1 전담 매니저 상담",
    ],
    popular: false,
  },
];

export const Review: ReviewItem[] = [
  {
    name: "김민수",
    role: "직장인",
    text: "전화 영어는 항상 예약하는 게 귀찮았는데, 이건 아무 때나 내킬 때 전화하면 되니까 너무 편해요. AI라서 부담도 없고 진짜 친구랑 통화하는 기분입니다.",
    stars: 5,
  },
  {
    name: "이지연",
    role: "취업 준비생",
    text: "면접 준비하면서 몰라 AI를 정말 많이 활용했어요. 제가 한 말을 더 자연스럽게 고쳐서 리포트로 보내주니까 복습하기에도 최고입니다.",
    stars: 5,
  },
  {
    name: "박준호",
    role: "프리랜서",
    text: "처음에는 AI가 얼마나 잘 알아들을까 싶었는데, 발음이 좀 안 좋아도 찰떡같이 알아듣고 대화를 이어나가더라고요. 매일 아침 10분씩 하고 있습니다.",
    stars: 5,
  },
];

export const Info: InfoColumn[] = [
  {
    title: "제품",
    links: ["서비스 소개", "학습 코스", "요금제", "자주 묻는 질문", "기업 도입"],
  },
  {
    title: "회사",
    links: ["회사 소개", "채용 공고", "블로그", "브랜드 가이드"],
  },
  {
    title: "법률",
    links: ["이용약관", "개인정보처리방침", "환불규정", "청소년보호정책"],
  },
];
