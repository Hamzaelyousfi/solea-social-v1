"use client";

import { useState } from "react";

type BrandLoaderProps = {
  label?: string;
  subtext?: string;
  fullscreen?: boolean;
  className?: string;
};

export default function BrandLoader({
  label = "Solea Socials",
  subtext = "Préparation d’une expérience sur mesure…",
  fullscreen = false,
  className = "",
}: BrandLoaderProps) {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${label}. ${subtext}`}
      className={[
        "relative isolate flex w-full items-center justify-center",
        fullscreen ? "fixed inset-0 z-50 min-h-screen" : "min-h-[260px]",
        className,
      ].join(" ")}
    >
      {fullscreen ? (
        <div className="absolute inset-0 bg-background" aria-hidden="true" />
      ) : null}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className={[
            "absolute left-1/2 top-1/2 h-[360px] w-[360px]",
            "-translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70",
            "transition-opacity duration-700 motion-reduce:opacity-40",
          ].join(" ")}
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 35%, transparent), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center text-foreground">
        {showLogo ? (
          <img
            src="/assets/logo.svg"
            alt=""
            aria-hidden="true"
            className="mb-6 h-8 w-auto opacity-70"
            onError={() => setShowLogo(false)}
          />
        ) : null}

        <div className="rose-pulse">
          <svg
            viewBox="0 0 120 140"
            className="h-28 w-28 text-[color:var(--accent)] md:h-32 md:w-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              className="rose-stroke"
              d="M60 122C60 94 36 88 36 60C36 42 49 36 60 46C71 36 84 42 84 60C84 88 60 94 60 122Z"
            />
            <path
              className="rose-stroke rose-secondary"
              d="M60 46C60 26 80 20 92 30C104 40 97 60 80 62"
            />
            <path
              className="rose-stroke rose-secondary"
              d="M60 46C60 26 40 20 28 30C16 40 23 60 40 62"
            />
            <path
              className="rose-stroke"
              d="M60 72C50 66 50 56 57 52C59 51 60 51 60 53C60 51 61 51 63 52C70 56 70 66 60 72Z"
            />
            <path className="rose-stroke" d="M60 122L60 136" />
          </svg>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-lg font-semibold tracking-[0.12em] uppercase text-foreground">
            {label}
          </p>
          <p className="text-sm text-muted-foreground">{subtext}</p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-[color:var(--primary)] opacity-70">
          <span className="loader-dot h-1.5 w-1.5 rounded-full bg-current" />
          <span className="loader-dot delay-150 h-1.5 w-1.5 rounded-full bg-current" />
          <span className="loader-dot delay-300 h-1.5 w-1.5 rounded-full bg-current" />
        </div>
      </div>

      <style jsx>{`
        .rose-stroke {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: rose-draw 2.8s ease-in-out infinite;
        }

        .rose-secondary {
          opacity: 0.7;
        }

        .rose-pulse {
          animation: rose-pulse 3s ease-in-out infinite;
        }

        .loader-dot {
          animation: dot-fade 1.4s ease-in-out infinite;
        }

        .loader-dot.delay-150 {
          animation-delay: 0.2s;
        }

        .loader-dot.delay-300 {
          animation-delay: 0.4s;
        }

        @keyframes rose-draw {
          0% {
            stroke-dashoffset: 1000;
          }
          45% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -1000;
          }
        }

        @keyframes rose-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        @keyframes dot-fade {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rose-stroke,
          .rose-pulse,
          .loader-dot {
            animation: none !important;
          }

          .rose-stroke {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
