import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { personalInfo, heroContent } from "../data/portfolioData";

// Dynamically load the hero cutout
const heroImages = import.meta.glob("../assets/hero/hero-portrait.*", {
  eager: true,
  import: "default",
});
const heroSrc = Object.values(heroImages)[0] || null;

export default function Hero() {
  const brandName = (personalInfo.brandName || personalInfo.name || "PORTFOLIO").toUpperCase();
  const finalWord = (heroContent.finalWord || "PORTFOLIO").toUpperCase();

  const [displayText, setDisplayText] = useState(brandName);

  const typographyRef = useRef(null);
  const personRef = useRef(null);
  const subtitleRef = useRef(null);
  const controlsRef = useRef(null);

  // Split role for first word bold, rest italic
  const roleWords = (personalInfo.role || "").split(" ");
  const firstRoleWord = roleWords[0] || "";
  const remainingRoleWords = roleWords.slice(1).join(" ");

  useEffect(() => {
    // Save elements for cleanup
    const typoEl = typographyRef.current;
    const personEl = personRef.current;
    const subEl = subtitleRef.current;
    const ctrlEl = controlsRef.current;

    // Lock page scroll at start
    document.body.style.overflow = "hidden";

    // Initial GSAP positions
    if (personEl) gsap.set(personEl, { y: "100vh" });
    if (subEl && ctrlEl) gsap.set([subEl, ctrlEl], { opacity: 0, y: 50 });

    let scrambleInterval = null;
    let pauseTimeout = null;
    let initialTimeout = null;
    let tl = null;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const startAnimationSequence = () => {
      // Step 2: Wait ~1s after load
      initialTimeout = setTimeout(() => {
        let lockedCount = 0;
        let stepCount = 0;
        const targetLen = finalWord.length;

        // Step 3: Scramble text update every 50ms, lock 1 letter every 100ms (every 2 steps)
        scrambleInterval = setInterval(() => {
          stepCount++;
          if (stepCount % 2 === 0 && lockedCount < targetLen) {
            lockedCount++;
          }

          let result = "";
          for (let i = 0; i < targetLen; i++) {
            if (i < lockedCount) {
              result += finalWord[i];
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          setDisplayText(result);

          if (lockedCount >= targetLen) {
            clearInterval(scrambleInterval);
            scrambleInterval = null;
            setDisplayText(finalWord);

            // Step 4: Pause briefly ~0.4s
            pauseTimeout = setTimeout(() => {
              const isMobile = window.innerWidth < 768;
              const targetTop = isMobile ? "20%" : "45%";

              // Step 5: ONE gsap.timeline
              tl = gsap.timeline({
                onComplete: () => {
                  document.body.style.overflow = "auto";
                },
              });

              if (typoEl) {
                tl.to(
                  typoEl,
                  {
                    top: targetTop,
                    duration: 1.5,
                    ease: "power3.inOut",
                  },
                  0
                );
              }

              if (personEl) {
                tl.to(
                  personEl,
                  {
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                  },
                  0
                );
              }

              if (subEl && ctrlEl) {
                tl.to(
                  [subEl, ctrlEl],
                  {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.2,
                  },
                  0.3
                );
              }
            }, 400);
          }
        }, 50);
      }, 1000);
    };

    // Step 1: Preload hero image if available
    if (heroSrc) {
      const img = new Image();
      img.src = heroSrc;
      if (img.complete) {
        startAnimationSequence();
      } else {
        img.onload = () => startAnimationSequence();
        img.onerror = () => startAnimationSequence();
      }
    } else {
      startAnimationSequence();
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
      if (initialTimeout) clearTimeout(initialTimeout);
      if (scrambleInterval) clearInterval(scrambleInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      if (tl) tl.kill();
      gsap.killTweensOf([typoEl, personEl, subEl, ctrlEl]);
    };
  }, [finalWord]);

  return (
    <header
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#050505]"
      style={{
        background: "radial-gradient(circle at center, #1c1c1f 0%, #050505 100%)",
      }}
    >
      {/* Subtle overlay with 2px backdrop blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* Main typography (z-10, behind the person) */}
      <div
        ref={typographyRef}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none px-4"
        style={{ top: "50%" }}
      >
        <h1
          aria-label={`${brandName} ${finalWord}`}
          className="text-[16vw] md:text-[10rem] 2xl:text-[14rem] font-black uppercase leading-none tracking-tighter select-none bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]"
        >
          <span aria-hidden="true">{displayText}</span>
        </h1>
      </div>

      {/* Person / Hero Image (z-20, in front of typography) */}
      <div
        ref={personRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center items-end"
      >
        {heroSrc ? (
          <img
            src={heroSrc}
            alt={`${personalInfo.name} — full portrait`}
            className="h-auto w-auto max-h-[88vh] max-w-[72vw] md:max-w-[500px] xl:max-w-[650px] object-contain [filter:drop-shadow(0_10px_30px_rgba(0,0,0,0.8))]"
          />
        ) : (
          <div className="border border-white/20 p-4 rounded-xl text-zinc-500 text-sm">
            Portrait coming soon
          </div>
        )}
      </div>

      {/* Subtitle and Contact Controls (z-30, in front of everything) */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col md:flex-row items-center md:items-end justify-between gap-5 md:gap-0 px-6 md:px-[8%] pb-10 md:pb-[8%] z-30">
        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="text-center md:text-left text-base md:text-3xl lg:text-4xl tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]"
        >
          <span className="font-bold text-white">{firstRoleWord}</span>{" "}
          <span className="font-light italic font-serif-accent text-zinc-300">
            {remainingRoleWords}
          </span>
        </div>

        {/* Contact controls */}
        <div ref={controlsRef} className="flex items-center gap-3">
          {/* Circular icon button */}
          <a
            href="#contact"
            aria-label="Jump to contact"
            className="group h-12 w-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:border-white/50 hover:bg-black/50"
          >
            <svg
              className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M9 7h8v8"
              />
            </svg>
          </a>

          {/* Pill-shaped button */}
          <a
            href="#contact"
            className="rounded-full backdrop-blur-md bg-black/40 border border-white/20 px-8 py-3 text-white text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/40 shadow-lg"
          >
            {heroContent.ctaLabel || "Contact"}
          </a>
        </div>
      </div>
    </header>
  );
}
