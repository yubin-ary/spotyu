"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SPRITE = "/assets/6795fd2b94288a677dd9e2e36b2bd2a0039b05a9.png";
const imgBackArrow = "/assets/45d8a0f6495680e676880af5da9c876d1c9d332b.svg";

const OPTIONS = [
  {
    label: "시험 공부",
    icon: { w: 52, h: 52, imgW: "324.03%", imgH: "361.38%", imgL: "-47.55%", imgT: "-53.31%" },
  },
  {
    label: "팀플",
    icon: { w: 52, h: 52, imgW: "324.03%", imgH: "361.38%", imgL: "-174.49%", imgT: "-57.2%" },
  },
  {
    label: "독서",
    icon: { w: 52, h: 52, imgW: "324.03%", imgH: "361.38%", imgL: "-46.28%", imgT: "-196.26%" },
  },
  {
    label: "자격증 공부",
    icon: { w: 52, h: 52, imgW: "324.03%", imgH: "361.38%", imgL: "-174.49%", imgT: "-198.4%" },
  },
];

export default function PurposePage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showBack, setShowBack] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowBack(new URLSearchParams(window.location.search).get("from") === "nav");
  }, []);

  return (
    <div className="pf-outer">
      <div className="pf-sizing">
        <div
          className="pf-frame bg-[#f8f8f8] border-2 border-[#111] border-solid overflow-clip relative rounded-[25px]"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Header */}
          <div className="absolute" style={{ top: 45, left: 0, right: 0, height: 56 }}>
            {showBack && (
              <button onClick={() => router.back()} className="absolute" style={{ left: 32, top: 7, width: 28, height: 28, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                <img alt="back" className="block size-full" src={imgBackArrow} />
              </button>
            )}
            <p className="absolute text-center" style={{ left: "50%", transform: "translateX(-50%)", top: 14, fontSize: 22, fontWeight: 500, color: "#111", whiteSpace: "nowrap", lineHeight: 1.5 }}>
              추천
            </p>
          </div>

          {/* STEP label */}
          <p className="absolute whitespace-nowrap" style={{ left: 23, top: 129, fontSize: 14, fontWeight: 500, color: "#111", letterSpacing: "-0.35px", lineHeight: 1.5 }}>
            STEP 1
          </p>

          {/* Question */}
          <p className="absolute whitespace-nowrap" style={{ left: 21, top: 150, fontSize: 22, fontWeight: 600, color: "#111", letterSpacing: "-0.55px", lineHeight: 1.5 }}>
            오늘 무엇을 할 예정인가요?
          </p>

          {/* Options */}
          <div className="absolute flex flex-col" style={{ left: 34, top: 225, width: 313, gap: 12 }}>
            {OPTIONS.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="flex items-center rounded-[10px]"
                  style={{
                    height: 80, width: "100%",
                    paddingLeft: 27, paddingRight: 20, gap: 12,
                    border: isSelected ? "2px solid #ffbf00" : "1px solid #f0f0f0",
                    backgroundColor: isSelected ? "#fff8e2" : "#ffffff",
                    boxShadow: isSelected ? "0px 0px 6px rgba(255,191,0,0.24)" : "none",
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{ width: opt.icon.w, height: opt.icon.h, position: "relative", flexShrink: 0, overflow: "hidden" }}>
                    <img
                      alt="" src={SPRITE}
                      style={{ position: "absolute", width: opt.icon.imgW, height: opt.icon.imgH, left: opt.icon.imgL, top: opt.icon.imgT, maxWidth: "none", pointerEvents: "none" }}
                    />
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#111", letterSpacing: "-0.4px", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={() => {
              if (selected === null) return;
              sessionStorage.setItem("spotyu_purpose", OPTIONS[selected].label);
              router.push("/status/duration");
            }}
            className="absolute flex items-center justify-center rounded-[10px]"
            style={{
              left: 24, top: 732, width: 339, height: 60,
              backgroundColor: selected !== null ? "#ffbf00" : "#e0e0e0",
              border: "none", cursor: selected !== null ? "pointer" : "not-allowed",
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: "#111", letterSpacing: "-0.4px", lineHeight: 1.5 }}>다음</span>
          </button>
        </div>
      </div>
    </div>
  );
}
