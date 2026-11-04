import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsContent } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

// Dynamically load project cover images from src/assets/projects/
const projectImages = import.meta.glob(
  "../assets/projects/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" }
);

const getProjectImage = (id) => {
  for (const [path, src] of Object.entries(projectImages)) {
    // Match file name starting with id (e.g. project-1.png or project-1.webp)
    const fileName = path.split("/").pop();
    if (fileName && fileName.startsWith(`${id}.`)) {
      return src;
    }
  }
  return null;
};

export default function Projects({ onCtaClick = () => {} }) {
  const sectionRef = useRef(null);

  // Helper to render title lines and words wrapped in *asterisks*
  const renderTitle = (lines) => {
    const linesArray = Array.isArray(lines) ? lines : [lines];
    return linesArray.map((line, lineIdx) => {
      // Split by *italic serif word*
      const parts = line.split(/(\*[^*]+\*)/g);
      return (
        <span key={lineIdx} className="block">
          {parts.map((part, partIdx) => {
            if (part.startsWith("*") && part.endsWith("*")) {
              const word = part.slice(1, -1);
              return (
                <span
                  key={partIdx}
                  className="font-serif-accent font-light italic lowercase text-[#9CA3AF]"
                >
                  {word}
                </span>
              );
            }
            return <React.Fragment key={partIdx}>{part}</React.Fragment>;
          })}
        </span>
      );
    });
  };

  // Plain string for image alt text
  const getPlainTitle = (title) => {
    const raw = Array.isArray(title) ? title.join(" ") : String(title || "");
    return raw.replace(/\*/g, "");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectEls = sectionRef.current?.querySelectorAll("[data-project-item]");
      projectEls?.forEach((el) => {
        // Target elements inside the project row to animate with a stagger
        const animTargets = el.querySelectorAll(".project-anim");
        gsap.fromTo(
          animTargets,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = projectsContent?.items || [];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white px-6 md:px-16 pt-20 md:pt-28 pb-24 md:pb-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16 md:pb-24 border-b border-white/20">
          {/* Left: Giant Title */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none select-none inline-block">
              <span className="bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                {projectsContent?.headingMain || "Selected"}
              </span>
              <span className="font-serif-accent font-light italic lowercase text-[#9CA3AF] ml-3 md:ml-5 text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                {projectsContent?.headingAccent || "work"}
              </span>
            </h2>
          </div>

          {/* Right: Short Description & Read More Button */}
          <div className="flex flex-col items-start md:items-end gap-5 max-w-[420px]">
            <p className="text-[#9CA3AF] font-light text-sm md:text-base leading-relaxed md:text-right">
              {projectsContent?.description}
            </p>
            {projectsContent?.readMore && (
              <a
                href={projectsContent.readMore.href || "#projects"}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#CCFF00] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black border border-[#CCFF00] transition-colors hover:bg-[#b8e600]"
              >
                {projectsContent.readMore.label || "Read More"} ↗
              </a>
            )}
          </div>
        </div>

        {/* Projects List — alternating editorial layout */}
        <div className="flex flex-col gap-24 md:gap-40 mt-20 md:mt-32">
          {items.map((item, index) => {
            // Project 1 (index 0) = image LEFT; Project 2 (index 1) = image RIGHT (reversed on desktop)
            const isReversed = index % 2 === 1;
            const imgSrc = getProjectImage(item.id);
            const plainTitle = getPlainTitle(item.title);

            return (
              <div
                key={item.id || index}
                data-project-item
                className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 lg:gap-24 items-center"
              >
                {/* 1. HEAD (Number + Title) — Mobile Order 1 */}
                <div
                  className={`order-1 project-anim ${
                    isReversed
                      ? "md:col-start-1 md:row-start-1 md:self-end"
                      : "md:col-start-2 md:row-start-1 md:self-end"
                  }`}
                >
                  <span className="text-[#CCFF00] font-bold text-sm uppercase tracking-[0.3em] block mb-3">
                    {item.number}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-[clamp(1.9rem,4vw,3.5rem)] font-extrabold uppercase tracking-tight leading-[1.05] text-white">
                    {renderTitle(item.title)}
                  </h3>
                </div>

                {/* 2. IMAGE — Mobile Order 2 */}
                <div
                  className={`order-2 project-anim ${
                    isReversed
                      ? "md:col-start-2 md:row-start-1 md:row-span-2"
                      : "md:col-start-1 md:row-start-1 md:row-span-2"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] bg-zinc-900 border border-white/5">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={plainTitle}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-center">
                        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-1">
                          {item.id}
                        </span>
                        <span className="text-sm text-zinc-600 font-light">
                          Cover image placeholder
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. BODY (Description + Buttons) — Mobile Order 3 */}
                <div
                  className={`order-3 project-anim ${
                    isReversed
                      ? "md:col-start-1 md:row-start-2 md:self-start md:pt-4"
                      : "md:col-start-2 md:row-start-2 md:self-start md:pt-4"
                  }`}
                >
                  <p className="text-[#9CA3AF] font-light text-sm md:text-base leading-[1.7] max-w-[500px] mb-8">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Live Demo button */}
                    <a
                      href={item.liveUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onCtaClick("live", item)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black border border-[#CCFF00] transition-colors hover:bg-[#b8e600]"
                    >
                      Live Demo ↗
                    </a>

                    {/* GitHub button */}
                    <a
                      href={item.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onCtaClick("github", item)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black"
                    >
                      <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
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
