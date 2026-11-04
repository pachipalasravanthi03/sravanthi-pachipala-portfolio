import React from "react";
import {
  personalInfo,
  socialLinks,
  footerContent,
  academy,
} from "../data/portfolioData";

// Load the footer background image dynamically
const footerBgImages = import.meta.glob("../assets/footer/footer-bg.*", {
  eager: true,
  import: "default",
});
const footerBgSrc = Object.values(footerBgImages)[0] || null;
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const brandName = (personalInfo.brandName || personalInfo.name || "PORTFOLIO").toUpperCase();

  // Filter available social links
  const socialEntries = [
    { key: "instagram", label: "Instagram", url: socialLinks?.instagram },
    { key: "youtube", label: "YouTube", url: socialLinks?.youtube },
    { key: "linkedin", label: "LinkedIn", url: socialLinks?.linkedin },
    { key: "github", label: "GitHub", url: socialLinks?.github },
  ].filter((item) => Boolean(item.url));

  return (
    <footer
      className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-between"
      style={{
        backgroundImage: footerBgSrc
          ? `url("${footerBgSrc}")`
          : "radial-gradient(circle at 50% 100%, rgba(120, 220, 40, 0.35) 0%, transparent 60%)",
        backgroundPosition: "center bottom",
        backgroundSize: "160%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top Black Gradient Overlay for High Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/75 to-transparent pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 pt-20 md:pt-28 pb-8 md:pb-12 flex flex-col justify-between min-h-screen">
        {/* TOP CONTENT: Two columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-3 block">
              {footerContent?.connectLabel || "Connect with me"}
            </span>

            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[clamp(1.4rem,4vw,3rem)] font-semibold text-white tracking-tight transition-colors duration-200 hover:text-[#CCFF00] block mb-8"
              >
                {personalInfo.email}
              </a>
            )}

            {/* Navigation Links */}
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-400 font-normal"
            >
              {(footerContent?.navLinks || []).map((link, idx) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                  {idx < footerContent.navLinks.length - 1 && (
                    <span className="text-zinc-600 select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:items-end md:text-right">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              {footerContent?.ctaHeading || "Let's build something"}
            </h3>

            <p className="text-zinc-400 font-light text-sm md:text-base max-w-md md:ml-auto mb-6 leading-relaxed">
              {footerContent?.ctaText}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-black font-semibold text-sm px-8 py-3.5 transition-all duration-300 hover:bg-zinc-200 hover:scale-105 shadow-lg"
            >
              {footerContent?.ctaLabel || "Get in touch"}
            </a>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex flex-col w-full my-auto py-12 md:py-16">
          {/* Social Links Row */}
          {socialEntries.length > 0 && (
            <div className="border-t border-white/10 pt-8 pb-10 flex flex-wrap items-center justify-between gap-4">
              {socialEntries.map((soc) => (
                <a
                  key={soc.key}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm md:text-base font-medium text-zinc-400 hover:text-white uppercase tracking-widest transition-colors duration-200"
                >
                  {soc.label}
                </a>
              ))}
            </div>
          )}

          {/* Huge Brand Typography Signature */}
          <div className="w-full text-center py-6 select-none overflow-hidden">
            <span className="block text-[11vw] md:text-[12vw] font-bold tracking-tighter leading-none text-white whitespace-nowrap">
              {brandName}
            </span>
          </div>
        </div>

        {/* BOTTOM ROW (Minimal) */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          {/* Copyright & TAP Academy Credit */}
          <div className="text-center md:text-left flex flex-wrap items-center justify-center md:justify-start gap-1">
            <span>
              © {CURRENT_YEAR} {personalInfo?.name || "Portfolio"}. All Rights Reserved.
            </span>
            {academy?.name && academy?.url && (
              <>
                <span className="mx-1 text-zinc-700">|</span>
                <span>Trained at</span>
                <a
                  href={academy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-zinc-300 transition-colors duration-200"
                >
                  {academy.name}
                </a>
              </>
            )}
          </div>

          {/* Policy Links */}
          <div className="flex items-center gap-2">
            <a
              href="#home"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              Privacy policy
            </a>
            <span className="text-zinc-700">·</span>
            <a
              href="#home"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              Terms and conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
