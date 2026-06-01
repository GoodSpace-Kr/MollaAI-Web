import { Instagram, Twitter, Facebook, Github } from "lucide-react";
import logo from "../../assest/logo-name.svg";
import { Info } from "../../constants/mockData";
import { useState } from "react";

const Footer = () => {
  const [policyOpen, setPolicyOpen] = useState(false);

  return (
    <footer
      onClick={() => setPolicyOpen(false)}
      className="bg-surface py-10 px-6 md:px-12 border-t border-surface-container"
    >
      {/* <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center">
            <img src={logo} alt="Molla AI Logo" className="h-24 w-auto" />
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            우리는 누구나 영어로 자유롭게 <br /> 꿈꿀 수 있는 세상을 만듭니다.{" "}
            <br />
            AI와 함께하는 가장 안전한 학습 공간.
          </p>
        </div>

        {Info.map((col, i) => (
          <div key={i} className="space-y-6">
            <h4 className="font-bold text-on-surface uppercase tracking-widest text-xs">
              {col.title}
            </h4>
            <ul className="space-y-4">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-on-surface-variant/60 text-sm">
          © 2026 MollaTalk Inc. All rights reserved.
        </p>
        <div className="relative group" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setPolicyOpen((prev) => !prev)}
            className="
              inline-flex items-center gap-1.5
              rounded-full
              border border-surface-container
              bg-white/70
              px-3 py-1.5
              text-xs
              text-on-surface-variant/70
              hover:text-primary
              hover:border-primary/30
              transition-colors
              font-medium
              cursor-pointer
            "
          >
            개인정보 수집 및 이용약관
            <span className="text-[10px] text-primary">보기</span>
          </button>

          <div
            className={`
              p-2

              absolute bottom-full mb-3
              left-1/2 -translate-x-1/2
              md:left-auto md:translate-x-0 md:right-0

              w-[calc(100vw-32px)]
              max-w-[520px]
              max-h-[500px]


              rounded-3xl
              border border-[#E2E8F0]
              bg-white
              shadow-[0_20px_40px_rgba(15,23,42,0.12)]

              transition-all
              duration-200
              z-50

              ${
                policyOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              }

              md:group-hover:opacity-100
              md:group-hover:visible
              md:group-hover:translate-y-0
            `}
          >
            <div
              className="
                max-h-[460px]
                overflow-y-auto
                px-4
                py-4
                pr-5

                scrollbar
                scrollbar-w-1.5
                scrollbar-thumb-rounded-full
                scrollbar-thumb-[#CBD5E1]
                scrollbar-track-transparent
              "
            >
              <div className="space-y-6">
                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    1. 개인정보 수집 및 이용 목적
                  </h4>

                  <div>
                    Molla AI는 다음과 같은 목적으로 회원의 개인정보를 수집 및
                    이용합니다.
                  </div>

                  <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[#64748B]">
                    <li>
                      회원 관리 : 회원 가입, 본인 인증, 계정 관리, 부정 이용
                      방지
                    </li>
                    <li>
                      AI 영어 회화 서비스 제공 : AI 기반 전화 영어 회화, 음성
                      인식(STT), 음성 응답(TTS), 맞춤형 회화 피드백 리포트 제공
                    </li>
                    <li>
                      서비스 개선 및 AI 학습 : 음성 데이터, 회화 데이터, 이용
                      패턴 분석을 통한 AI 모델 성능 개선 및 서비스 품질 향상
                    </li>
                    <li>
                      고객 지원 : 문의사항 처리, 신고 접수 및 서비스 운영 지원
                    </li>
                    <li>
                      결제 및 유료 서비스 운영 : 구독 서비스 제공, 결제 처리 및
                      이용 내역 관리
                    </li>
                    <li>법적 의무 준수 : 관련 법령 및 약관 준수를 위한 조치</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    2. 수집하는 개인정보 항목
                  </h4>
                  <div>
                    Molla AI는 서비스 제공을 위해 다음과 같은 정보를 수집합니다.
                  </div>

                  <div className="mt-2 text-sm text-[#64748B] space-y-2">
                    <p>
                      <span className="font-semibold text-[#334155]">
                        2-1. 필수 정보
                      </span>
                    </p>
                    <ul>
                      <li>이름</li>
                      <li>전화번호</li>
                      <li>통신사</li>
                      <li>생년월일</li>
                      <li>이메일</li>
                      <li>비밀번호</li>
                    </ul>
                  </div>
                  <div className="mt-2 text-sm text-[#64748B] space-y-2">
                    <p>
                      <span className="font-semibold text-[#334155]">
                        2-2. 서비스 이용 과정에서 수집되는 정보
                      </span>
                    </p>
                    <ul>
                      <li>음성 데이터</li>
                      <li>통화 녹음 데이터</li>
                      <li>STT 변환 텍스트</li>
                      <li>회화 분석 및 피드백 리포트</li>
                      <li>발화 시간 및 서비스 이용 기록</li>
                      <li>접속 로그 및 기기 정보</li>
                    </ul>
                  </div>

                  <div className="mt-2 text-sm text-[#64748B] space-y-2">
                    <p>
                      <span className="font-semibold text-[#334155]">
                        2-3. 자동 수집 정보
                      </span>
                    </p>
                    <ul>
                      <li>IP 주소</li>
                      <li>쿠키</li>
                      <li>접속 기록</li>
                      <li>서비스 이용 통계</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    3. 개인정보 보유 및 이용 기간
                  </h4>

                  <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[#64748B]">
                    <li>
                      회원 탈퇴 시 개인정보는 즉시 파기하는 것을 원칙으로
                      합니다.
                    </li>
                    <li>
                      단, 관련 법령에 따라 일정 기간 보관이 필요한 정보는 해당
                      기간 동안 보관될 수 있습니다.
                    </li>
                    <li>
                      음성 데이터, 통화 기록 및 STT 데이터는 서비스 제공, AI
                      학습 및 품질 개선 목적 범위 내에서 보관될 수 있습니다.
                    </li>
                    <li>
                      전자상거래법 등 관련 법령에 따라 결제 기록 및 거래 정보는
                      일정 기간 보관될 수 있습니다.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[rgb(15,23,43)]">
                    4. 개인정보의 제3자 제공
                  </h4>

                  <div>
                    Molla AI는 원칙적으로 회원의 개인정보를 외부에 제공하지
                    않습니다. 다만 아래의 경우에는 예외로 합니다.
                  </div>

                  <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[#64748B]">
                    <li>회원의 사전 동의를 받은 경우</li>
                    <li>법령에 따라 제공 의무가 발생한 경우</li>
                    <li>
                      AI 서비스 제공 과정에서 필요한 범위 내에서 외부 API 및
                      클라우드 서비스와 연동되는 경우
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    5. 개인정보 처리 위탁
                  </h4>

                  <div>
                    Molla AI는 원활한 서비스 제공을 위해 아래와 같은 외부
                    서비스를 이용할 수 있습니다.
                  </div>

                  <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[#64748B]">
                    <li>ClawOps : AI 서비스 및 데이터 처리</li>
                    <li>
                      회사는 개인정보 보호 관련 법령에 따라 위탁 업체를 관리 및
                      감독합니다.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    6. 회원의 권리와 의무
                  </h4>

                  <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[#64748B]">
                    <li>
                      회원은 언제든 자신의 개인정보를 조회, 수정, 삭제할 수
                      있습니다.
                    </li>
                    <li>
                      회원은 개인정보 변경 시 즉시 수정하여 최신 정보를 유지해야
                      합니다.
                    </li>
                    <li>
                      회원은 타인의 개인정보 및 계정을 도용하거나 서비스 운영을
                      방해해서는 안 됩니다.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    7. 미성년자 이용 안내
                  </h4>

                  <div>
                    Molla AI는 미성년자의 서비스 이용이 가능하며, 관련 법령에
                    따라 필요한 경우 법정대리인의 동의를 받을 수 있습니다.
                  </div>
                </section>

                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    8. 개인정보 보호책임자 및 문의
                  </h4>

                  <div>
                    개인정보 보호 관련 문의는 아래 이메일로 연락해주시기
                    바랍니다.
                  </div>

                  <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[#64748B]">
                    <li>운영 주체 : 굿스페이스</li>
                    <li>이메일 : goodspace82@gmail.com</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#0F172B]">
                    9. 개인정보 처리방침의 변경
                  </h4>

                  <div>
                    회사는 개인정보 처리방침을 변경할 수 있으며, 변경 시 서비스
                    내 공지사항 등을 통해 사전에 안내합니다.
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
