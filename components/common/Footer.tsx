import { Instagram, Twitter, Facebook, Github } from "lucide-react";
import logo from "../../src/assest/logo.png";
import { Info } from "../../src/constants/mockData";

function Footer() {
  return (
    <footer className="bg-surface py-20 px-6 md:px-12 border-t border-surface-container">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center">
            <img src={logo} alt="Molla AI Logo" className="h-24 w-auto" />
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            우리는 누구나 영어로 자유롭게 <br /> 꿈꿀 수 있는 세상을 만듭니다.{" "}
            <br />
            AI와 함께하는 가장 안전한 학습 공간.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Instagram size={20} />, link: "#" },
              { icon: <Twitter size={20} />, link: "#" },
              { icon: <Facebook size={20} />, link: "#" },
              { icon: <Github size={20} />, link: "#" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-on-surface-variant"
              >
                {item.icon}
              </a>
            ))}
          </div>
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
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-on-surface-variant/60 text-sm">
          © 2024 Molla AI Inc. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-xs text-on-surface-variant/40 hover:text-primary transition-colors font-medium"
          >
            개인정보처리방침
          </a>
          <a
            href="#"
            className="text-xs text-on-surface-variant/40 hover:text-primary transition-colors font-medium"
          >
            이용약관
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
