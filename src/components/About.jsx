import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent, skillRows } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

// Dynamically load the about portrait
const aboutImages = import.meta.glob("../assets/about/about-portrait.*", {
  eager: true,
  import: "default",
});
const aboutSrc = Object.values(aboutImages)[0] || null;

export default function About() {
  const sectionRef = useRef(null);
  const desktopHeadingRef = useRef(null);
  const mobileHeadingRef = useRef(null);
  const cardRef = useRef(null);

  // Split paragraph into words for progressive scroll lighting
  const words = (aboutContent.paragraph || "").split(/\s+/);
  const highlights = (aboutContent.highlights || []).map((h) => h.toLowerCase());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading ScrollTrigger animations
      [desktopHeadingRef.current, mobileHeadingRef.current].forEach((headingEl) => {
        if (!headingEl) return;
        gsap.fromTo(
          headingEl,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingEl,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // 2. Word-by-word scroll reveal inside the glass card
      if (cardRef.current) {
        const wordEls = cardRef.current.querySelectorAll("[data-word]");
        if (wordEls.length > 0) {
          gsap.fromTo(
            wordEls,
            { color: "#52525b", opacity: 0.2 },
            {
              color: (i, el) =>
                el.dataset.highlight === "true" ? "#ffffff" : "#d4d4d8",
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                end: "bottom 50%",
                scrub: true,
              },
            }
          );
        }
      }

      // Refresh ScrollTrigger after initial layout and font loading
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);
      const timer = setTimeout(() => ScrollTrigger.refresh(), 600);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white overflow-hidden pt-20 md:pt-32"
    >
      {/* Intro section container */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-24 md:pb-36">
        {/* Mobile Heading (visible on mobile only) */}
        <div ref={mobileHeadingRef} className="block md:hidden text-center mb-8">
          <h2 className="text-[18vw] sm:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.5))] select-none">
            {aboutContent.heading || "Intro"}
          </h2>
        </div>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
          {/* LEFT: Portrait */}
          <div className="flex justify-center md:justify-start">
            {aboutSrc ? (
              <img
                src={aboutSrc}
                alt="sravanthi pachipala — Data Analyst, TAP Academy student"
                className="w-[190px] sm:w-[220px] md:w-[260px] h-auto object-contain rounded-2xl [filter:drop-shadow(0_30px_50px_rgba(0,0,0,0.7))]"
              />
            ) : (
              <div className="w-[190px] sm:w-[220px] md:w-[260px] h-[320px] border border-white/10 rounded-2xl flex items-center justify-center text-zinc-500 text-sm">
                Portrait placeholder
              </div>
            )}
          </div>

          {/* RIGHT: Heading + Glass Card */}
          <div className="flex flex-col">
            {/* Desktop Heading (visible on desktop only) */}
            <div ref={desktopHeadingRef} className="hidden md:block mb-8">
              <h2 className="text-[8rem] lg:text-[11rem] font-black uppercase leading-[0.85] tracking-tighter bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.5))] select-none">
                {aboutContent.heading || "Intro"}
              </h2>
            </div>

            {/* Glass About Card */}
            <div
              ref={cardRef}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] shadow-2xl p-6 md:p-10 transition-colors duration-500 hover:bg-white/[0.08]"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">
                {aboutContent.greeting}
              </h3>

              <p className="text-base md:text-[20px] font-light leading-relaxed text-center md:text-left text-zinc-400">
                {words.map((word, i) => {
                  const cleaned = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
                  const isHighlighted = highlights.some((h) => {
                    const hWords = h.split(/[^a-zA-Z0-9]+/).filter(Boolean);
                    return hWords.includes(cleaned);
                  });

                  return (
                    <span
                      key={i}
                      data-word="true"
                      data-highlight={isHighlighted ? "true" : "false"}
                      className={`inline-block mr-1.5 transition-colors duration-200 ${
                        isHighlighted ? "font-semibold" : ""
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Skills Ticker (full width marquee) */}
      <div className="w-full bg-[#030303] border-t border-white/5 py-8 md:py-12 overflow-hidden flex flex-col gap-5 md:gap-6">
        {(skillRows || []).map((row, index) => {
          // Triplicate items for each half so it comfortably fills any screen
          const halfItems = [...row.items, ...row.items, ...row.items];
          const isEven = index % 2 === 0;
          const animationClass = isEven ? "marquee-right" : "marquee-left";

          return (
            <div key={row.label || index} className="relative w-full overflow-hidden py-1">
              {/* Pinned Category Label with fade-out mask */}
              <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-6 md:pl-12 pr-10 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent pointer-events-none">
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
                  {row.label}
                </span>
              </div>

              {/* Seamless Scrolling Track */}
              <div className={`flex w-max ${animationClass}`}>
                {/* Half 1 */}
                <div className="flex items-center gap-6 md:gap-8 px-4">
                  {halfItems.map((item, itemIdx) => (
                    <React.Fragment key={`h1-${itemIdx}`}>
                      <span className="text-zinc-500 font-medium tracking-wider text-sm md:text-[18px] whitespace-nowrap hover:text-zinc-300 transition-colors">
                        {item}
                      </span>
                      <span className="text-zinc-700 text-xs md:text-sm">·</span>
                    </React.Fragment>
                  ))}
                </div>

                {/* Half 2 (duplicated for seamless loop, hidden from screen readers) */}
                <div
                  className="flex items-center gap-6 md:gap-8 px-4"
                  aria-hidden="true"
                >
                  {halfItems.map((item, itemIdx) => (
                    <React.Fragment key={`h2-${itemIdx}`}>
                      <span className="text-zinc-500 font-medium tracking-wider text-sm md:text-[18px] whitespace-nowrap hover:text-zinc-300 transition-colors">
                        {item}
                      </span>
                      <span className="text-zinc-700 text-xs md:text-sm">·</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
