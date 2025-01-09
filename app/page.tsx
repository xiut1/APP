"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.scss";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.set("svg", { opacity: 1 });

    gsap.to(".ball", {
      keyframes: {
        "0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
        "7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
        "25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
        "50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
        "60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
        "65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
        "100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
        easeEach: "sine.out",
      },
      duration: 1,
      repeat: -1,
      transformOrigin: "center bottom",
    });

    gsap.to(".shadow", {
      scale: 0.7,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "center",
    });
  }); // <-- scope for selector text (optional)

  return (
    <div className="page">
      <main className="main">
        <div ref={container} className={styles.demo}>
          <svg viewBox="0 0 100 200" className={styles.svg}>
            <defs>
              <linearGradient
                id="grad-1"
                x1="30"
                y1="0"
                x2="70"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.2" stopColor="#0ae448" />
                <stop offset="0.5" stopColor="#abff84" />
              </linearGradient>
            </defs>
            <ellipse
              className={styles.shadow}
              cx="50"
              cy="188"
              rx="15"
              ry="5"
            />

            <circle
              fill="url(#grad-1)"
              className="ball"
              cx="50"
              cy="22"
              r="15"
            />
          </svg>
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
