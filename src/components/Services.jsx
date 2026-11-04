import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesContent } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  // Detect mobile screen width (< 768px) and update on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP ScrollTrigger entrance animation for the heading
  useEffect(() => {
    const headingEl = headingRef.current;
    if (!headingEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingEl,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingEl,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const headingLines = servicesContent?.headingLines || ["WHAT I", "CAN DO"];
  const items = servicesContent?.items || [];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white px-6 md:px-12 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Top-Right Giant Editorial Heading */}
        <div ref={headingRef} className="text-right ml-auto mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-6xl md:text-[7rem] lg:text-[8rem] font-black uppercase leading-[0.88] tracking-tight bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.5))] select-none">
            {headingLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Full-width Accordion List */}
        <div className="border-t border-white/20">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.title || index}
                className={`group border-b border-white/20 transition-colors duration-300 ${
                  isOpen
                    ? "bg-[#CCFF00] text-black"
                    : "bg-transparent text-white md:hover:bg-[#CCFF00] md:hover:text-black"
                }`}
              >
                {/* Row Header Button */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-6 md:py-10 flex items-center justify-between gap-4 md:gap-8 px-2 md:px-6 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4 md:gap-10 min-w-0 flex-1">
                    {/* Fixed-width Service Number */}
                    <span
                      className={`font-mono text-sm md:text-lg shrink-0 w-8 md:w-16 transition-colors duration-300 ${
                        isOpen
                          ? "text-black/70 font-semibold"
                          : "text-zinc-500 group-hover:text-black"
                      }`}
                    >
                      {itemNumber}
                    </span>

                    {/* Large Uppercase Title */}
                    <span
                      className={`text-lg sm:text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight truncate transition-colors duration-300 ${
                        isOpen
                          ? "text-black font-normal"
                          : "text-white group-hover:text-black"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Outlined Minimalist Arrow */}
                  <div className="shrink-0 pl-2">
                    <svg
                      viewBox="0 0 48 24"
                      className={`w-6 h-3 md:w-10 md:h-5 transition-all duration-300 transform ${
                        isOpen
                          ? "-rotate-45 text-black"
                          : "rotate-45 text-[#CCFF00] group-hover:text-black"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12h42M34 3l10 9-10 9" />
                    </svg>
                  </div>
                </button>

                {/* Smooth Expandable Content using CSS Grid Rows */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-2 md:px-6 pt-2 pb-8 md:pb-12">
                      {isMobile ? (
                        /* Mobile Single-Column Layout */
                        <div className="flex flex-col gap-6">
                          {/* Capabilities */}
                          <ul className="flex flex-col gap-3">
                            {(item.capabilities || []).map((cap, capIdx) => (
                              <li
                                key={capIdx}
                                className="flex items-center gap-3 text-sm font-light text-black"
                              >
                                <span className="w-2 h-2 shrink-0 bg-black" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Description */}
                          <p className="text-sm font-light leading-relaxed text-black/85">
                            {item.description}
                          </p>

                          {/* Optional CTA */}
                          {item.cta && (
                            <div className="pt-2">
                              <a
                                href={item.cta.href}
                                className="relative inline-flex items-center justify-center bg-black text-[#CCFF00] font-bold text-xs tracking-widest uppercase px-8 py-3 transition-colors hover:bg-zinc-900"
                              >
                                {/* Technical Corner Marks */}
                                <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#CCFF00]" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#CCFF00]" />
                                <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#CCFF00]" />
                                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#CCFF00]" />
                                {item.cta.label}
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Desktop Two-Column Layout */
                        <div className="grid grid-cols-2 gap-12 items-start">
                          {/* LEFT: Capabilities */}
                          <ul className="flex flex-col gap-3.5">
                            {(item.capabilities || []).map((cap, capIdx) => (
                              <li
                                key={capIdx}
                                className="flex items-center gap-3.5 text-base font-light text-black"
                              >
                                <span className="w-2 h-2 shrink-0 bg-black" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>

                          {/* RIGHT: Description & CTA */}
                          <div className="flex flex-col items-start gap-6 max-w-xl">
                            <p className="text-base lg:text-lg font-light leading-relaxed text-black/85">
                              {item.description}
                            </p>

                            {item.cta && (
                              <div className="pt-2">
                                <a
                                  href={item.cta.href}
                                  className="relative inline-flex items-center justify-center bg-black text-[#CCFF00] font-bold text-xs tracking-widest uppercase px-10 py-3 transition-colors hover:bg-zinc-900"
                                >
                                  {/* Technical Corner Marks */}
                                  <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#CCFF00]" />
                                  <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#CCFF00]" />
                                  <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#CCFF00]" />
                                  <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#CCFF00]" />
                                  {item.cta.label}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
