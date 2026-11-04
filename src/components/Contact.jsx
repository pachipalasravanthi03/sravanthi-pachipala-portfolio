import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  personalInfo,
  socialLinks,
  contactContent,
  emailjsConfig,
} from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const statusTimerRef = useRef(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // 1. Heading
      tl.fromTo(
        ".contact-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // 2. Info Items
      tl.fromTo(
        ".contact-info-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );

      // 3. Social Icons
      tl.fromTo(
        ".contact-social-btn",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );

      // 4. Form Fields
      tl.fromTo(
        ".contact-form-field",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );

      // 5. Submit Button
      tl.fromTo(
        ".contact-submit-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);

    const formData = new FormData(formRef.current);
    const userName = formData.get("user_name") || "";
    const userEmail = formData.get("user_email") || "";
    const userPhone = formData.get("user_phone") || "";
    const subject = formData.get("subject") || "Portfolio Inquiry";
    const message = formData.get("message") || "";

    const isConfigured =
      emailjsConfig?.serviceId &&
      emailjsConfig.serviceId !== "YOUR_EMAILJS_SERVICE_ID" &&
      emailjsConfig?.templateId &&
      emailjsConfig.templateId !== "YOUR_EMAILJS_TEMPLATE_ID" &&
      emailjsConfig?.publicKey &&
      emailjsConfig.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY";

    if (!isConfigured) {
      // Fallback: Open mailto client in a new tab/window
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        String(subject)
      )}&body=${encodeURIComponent(
        `Name: ${userName}\nEmail: ${userEmail}\nPhone: ${userPhone}\n\nMessage:\n${message}`
      )}`;

      window.open(mailtoUrl, "_blank");
      setStatus("success");
      formRef.current?.reset();

      statusTimerRef.current = setTimeout(() => {
        setStatus("idle");
      }, 4000);
      return;
    }

    // EmailJS production send
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      console.error("EmailJS submission error:", err);
      setStatus("error");
    } finally {
      statusTimerRef.current = setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }
  };

  // Filter available social links
  const socialEntries = [
    {
      key: "instagram",
      label: "Instagram",
      url: socialLinks?.instagram,
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      key: "youtube",
      label: "YouTube",
      url: socialLinks?.youtube,
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      url: socialLinks?.linkedin,
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      key: "github",
      label: "GitHub",
      url: socialLinks?.github,
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
  ].filter((item) => Boolean(item.url));

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] text-white px-6 md:px-16 py-24 md:py-32 overflow-hidden flex items-center"
    >
      {/* Subtle, soft futuristic neon-green horizon glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(120,200,40,0.18)_0%,transparent_70%)] pointer-events-none blur-3xl z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col">
          {/* Main Heading */}
          <h2 className="contact-heading text-4xl sm:text-6xl md:text-[clamp(3rem,8vw,6.5rem)] font-black uppercase tracking-tight leading-[0.9] select-none mb-12 md:mb-16">
            <span className="bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.5))]">
              {contactContent?.heading || "Get in touch"}
            </span>
          </h2>

          {/* Contact Details */}
          <div className="flex flex-col gap-8 mb-12">
            {/* Email */}
            {personalInfo?.email && (
              <div className="contact-info-item">
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1.5 font-medium">
                  Email:
                </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-lg sm:text-xl text-white tracking-wide transition-colors duration-200 hover:text-[#CCFF00]"
                >
                  {personalInfo.email}
                </a>
              </div>
            )}

            {/* Phone */}
            {personalInfo?.phone && (
              <div className="contact-info-item">
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1.5 font-medium">
                  Phone:
                </span>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                  className="text-lg sm:text-xl text-white tracking-wide transition-colors duration-200 hover:text-[#CCFF00]"
                >
                  {personalInfo.phone}
                </a>
              </div>
            )}
          </div>

          {/* Social Links */}
          {socialEntries.length > 0 && (
            <div className="contact-info-item">
              <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-3.5 font-medium">
                {contactContent?.followLabel || "Follow us"}
              </span>
              <div className="flex items-center gap-3">
                {socialEntries.map((soc) => (
                  <a
                    key={soc.key}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="contact-social-btn w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 transition-all duration-300 hover:scale-110 hover:border-white/30 hover:text-white hover:shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="w-full">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="contact-form-field">
                <label
                  htmlFor="user_name"
                  className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2 block"
                >
                  Your Name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full bg-[#111111] text-white placeholder-zinc-600 rounded-[10px] px-4 py-3.5 border border-white/5 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all text-sm md:text-base"
                />
              </div>

              <div className="contact-form-field">
                <label
                  htmlFor="user_email"
                  className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2 block"
                >
                  Email address
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#111111] text-white placeholder-zinc-600 rounded-[10px] px-4 py-3.5 border border-white/5 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all text-sm md:text-base"
                />
              </div>
            </div>

            {/* Row 2: Phone + Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="contact-form-field">
                <label
                  htmlFor="user_phone"
                  className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2 block"
                >
                  Phone
                </label>
                <input
                  id="user_phone"
                  name="user_phone"
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full bg-[#111111] text-white placeholder-zinc-600 rounded-[10px] px-4 py-3.5 border border-white/5 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all text-sm md:text-base"
                />
              </div>

              <div className="contact-form-field">
                <label
                  htmlFor="subject"
                  className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2 block"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-[#111111] text-white placeholder-zinc-600 rounded-[10px] px-4 py-3.5 border border-white/5 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all text-sm md:text-base"
                />
              </div>
            </div>

            {/* Full Width: Message */}
            <div className="contact-form-field">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2 block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Write something...."
                className="w-full bg-[#111111] text-white placeholder-zinc-600 rounded-[10px] px-4 py-3.5 border border-white/5 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all text-sm md:text-base resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="contact-submit-btn pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-white text-black font-semibold rounded-[9px] py-4 text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {status === "sending" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>

            {/* Status Messages */}
            <div className="min-h-[24px]">
              <p role="status" className="text-sm font-medium text-center">
                {status === "success" && (
                  <span className="text-[#CCFF00]">
                    Message sent successfully!
                  </span>
                )}
                {status === "error" && (
                  <span className="text-red-400">
                    Failed to send message. Please try again.
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
