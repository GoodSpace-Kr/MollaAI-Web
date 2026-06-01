import { ReactNode } from "react";
import { Brain, CalendarClock, TrendingUp, UserX } from "lucide-react";

// 타입 정의

type Problem = {
  icon: ReactNode;
  title: string;
  desc: string;
};

type CourseItem = {
  title: string;
  desc: string;
  color: string;
};

type PlanItem = {
  name: string;
  monthlyPrice?: string;
  yearlyPrice: string;
  desc: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  disabled?: boolean;
  showButton?: boolean;
  planType?: string;
  amount?: number;
};

type ReviewItem = {
  name: string;
  role: string;
  text: string;
  stars: number;
};

type InfoColumn = {
  title: string;
  links: string[];
};

export type NavItem = {
  label: string;
  id: string;
};

type FAQ = {
  question: string;
  answer: string;
};

// 데이터

export const Navigation: NavItem[] = [
  { label: "서비스 소개", id: "서비스 소개" },
  { label: "요금", id: "요금" },
  { label: "FAQ", id: "FAQ" },
  { label: "위치", id: "위치" },
  { label: "문의하기", id: "문의하기" },
];

export const Problems: Problem[] = [
  {
    icon: <Brain className="text-primary" size={32} />,
    title: "틀릴까봐 두려운 마음",
    desc: "문법이 맞는지, 발음이 이상한지\n머릿속으로 번역하느라 타이밍을 놓칩니다.",
  },
  // {
  //   icon: <UserX className="text-primary" size={32} />,
  //   title: "불편한 시선",
  //   desc: "원어민 선생님의 눈빛이나 다른 수강생들의 존재가 때로는 압박으로 다가옵니다.",
  // },
  {
    icon: <CalendarClock className="text-primary" size={32} />,
    title: "부족한 실전 기회",
    desc: "학원이나 화상 영어를 예약하고\n시간을 맞추는 것조차 스트레스가 됩니다.",
  },
  {
    icon: <TrendingUp className="text-primary" size={32} />,
    title: "높은 비용의 장벽",
    desc: "월 수십만 원의 비용 부담 때문에\n영어 공부를 시작하거나 지속하기 어렵습니다.",
  },
];

export const Course: CourseItem[] = [
  {
    title: "일상 대화",
    desc: "친구와의 약속, 날씨 이야기",
    color: "bg-blue-50",
  },
  {
    title: "비즈니스",
    desc: "회의, 이메일, 프리젠테이션",
    color: "bg-indigo-50",
  },
  {
    title: "해외 여행",
    desc: "호텔 체크인, 길 찾기, 주문",
    color: "bg-orange-50",
  },
  { title: "인터뷰 대비", desc: "영어 면접, 자기소개", color: "bg-emerald-50" },
  {
    title: "이슈/토론",
    desc: "최신 뉴스에 대한 의견 교환",
    color: "bg-purple-50",
  },
  {
    title: "생활 영어",
    desc: "병원, 은행, 마트 이용하기",
    color: "bg-rose-50",
  },
  {
    title: "감정 표현",
    desc: "기쁨, 슬픔, 위로 표현하기",
    color: "bg-amber-50",
  },
  {
    title: "취미/관심사",
    desc: "영화, 음악, 스포츠 이야기",
    color: "bg-teal-50",
  },
];

export const Plan: PlanItem[] = [
  {
    name: "Beginner",
    monthlyPrice: "0",
    yearlyPrice: "0",
    desc: "가볍게 시작하고 싶은 입문자용",
    features: ["하루 10분 통화", "기본 AI 튜터 제공", "학습 리포트 제공"],
    buttonText: "시작하기",
    popular: false,
    showButton: false,
  },
  {
    name: "Premium",
    monthlyPrice: "59,000",
    yearlyPrice: "47,200",
    desc: "* 데모버전 기간동안 자동적용 됩니다.",
    features: [
      "하루 300분 통화",
      "프리미엄 AI 튜터 제공",
      "상세 문법 교정 리포트",
    ],
    buttonText: "시작하기",
    popular: false,
    disabled: false,
    showButton: false,
  },
  // {
  //   name: "맥스",
  //   monthlyPrice: "12,900",
  //   yearlyPrice: "47,200",
  //   desc: "",
  //   features: [
  //     "하루 300분 통화",
  //     "프리미엄 AI 튜터 제공",
  //     "상세 문법 교정 리포트",
  //     "맞춤형 학습 커리큘럼",
  //     "우선 고객 지원",
  //   ],
  //   buttonText: "구독하기",
  //   popular: false,
  //   disabled: false,
  //   showButton: true,
  //   planType: "premium",
  //   amount: 9900,
  // },
  // {
  //   name: "프로페셔널",
  //   monthlyPrice: "19,900",
  //   yearlyPrice: "47,200",
  //   desc: "",
  //   features: [
  //     "하루 300분 통화",
  //     "프리미엄 AI 튜터 제공",
  //     "상세 문법 교정 리포트",
  //     "맞춤형 학습 커리큘럼",
  //     "우선 고객 지원",
  //   ],
  //   buttonText: "구독하기",
  //   popular: false,
  //   disabled: false,
  //   showButton: true,
  //   planType: "premium",
  //   amount: 9900,
  // },
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
    links: [
      "서비스 소개",
      "학습 코스",
      "요금제",
      "자주 묻는 질문",
      "기업 도입",
    ],
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

export const FAQ: FAQ[] = [
  {
    question: "정말 070 번호로 전화만 걸면 되나요?",
    answer:
      "네, 맞습니다.\n저희는 일반 음성통화(이동통신망)기반 서비스이며, 실제 서비스 번호로 연결하시면 언제 어디서든 통화할 수 있습니다.",
  },
  {
    question: "무료 체험은 어떻게 진행되나요?",
    answer:
      "저희 서비스는 매일 10분을 무료로 제공하고 있습니다.\n따로 가입을 하지 않아도 첫 통화를 시작할 수 있습니다.\n한국인 맞춤 AI molla와 함께 직접 대화해보고 매끄럽고 자연스러움을 느껴보세요.\n통화 후 제공되는 무료 리포트를 받아보고 결제를 고민해도 늦지 않아요.",
  },
  {
    question: "리포트는 언제 받을 수 있나요?",
    answer:
      "통화가 종료된 후 수 분 내외로 고객님 계정에서 리포트를 확인할 수 있습니다.\n대화 전체 텍스트, 문법 교정, 추천 표현, 여러 공인 시험 점수를 확인하실 수 있어요..",
  },
  {
    question: "학습 시간 제한이 있나요?",
    answer:
      "현재 데모버전에서는 고객 모두 Premium member로 전환됩니다.\n하루 최대 사용량 300분 내에서 언제, 어디서든 원하실 때 부담없이 회화 연습을 해보아요.\n정식 버전에서는 구독 전 Free member는 하루 최대 10분의 사용량,\n구독 후 Premium member는 하루 최대 300분 내에서 자유롭게 서비스를 이용하실 수 있습니다.",
  },
];

export const reports1 = [
  {
    id: 1,
    oneLineSummary:
      "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    levelAnalysis: "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    sessionDurationMinute: 3,
    createdAt: "2026.05.22",
  },
  {
    id: 2,
    oneLineSummary:
      "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    levelAnalysis: "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    sessionDurationMinute: 5,
    createdAt: "2026.05.22",
  },
  {
    id: 3,
    oneLineSummary:
      "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    levelAnalysis: "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    sessionDurationMinute: 6,
    createdAt: "2026.05.22",
  },
  {
    id: 4,
    oneLineSummary:
      "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    levelAnalysis: "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    sessionDurationMinute: 6,
    createdAt: "2026.05.22",
  },
  {
    id: 5,
    oneLineSummary:
      "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    levelAnalysis: "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    sessionDurationMinute: 6,
    createdAt: "2026.05.22",
  },
  {
    id: 6,
    oneLineSummary:
      "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    levelAnalysis: "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    sessionDurationMinute: 6,
    createdAt: "2026.05.22",
  },
  {
    id: 7,
    oneLineSummary:
      "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    levelAnalysis: "지금 바로 무료 체험을 시작하고 영어 공포증에서 탈출하세요.",
    sessionDurationMinute: 6,
    createdAt: "2026.05.22",
  },
] as const;
