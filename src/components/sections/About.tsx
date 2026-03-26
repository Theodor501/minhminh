"use client";

import { useCallback } from "react";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimations";
import type { gsap as GsapType } from "gsap";

export function About() {
  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      gsap.from(el.querySelector(".about-photo"), {
        x: -80,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      gsap.to(el.querySelector(".about-photo"), {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      gsap.from(el.querySelectorAll(".about-text > *"), {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      gsap.from(el.querySelectorAll(".stat-card"), {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 60%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);
  const yearsRef = useCountUp(3, "+");
  const projectsRef = useCountUp(50, "+");
  const viewsRef = useCountUp(5, "K+");

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden" ref={sectionRef}>
      <div className="deco-blob w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-accent-light/5 -top-60 -left-60" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[4px] text-accent uppercase bg-accent/5 px-4 py-2 rounded-full font-semibold">About Me</span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 text-text-primary">
            Creative Designer Based in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light"> Ho Chi Minh City</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="about-photo flex-shrink-0">
            <div className="w-56 h-72 md:w-64 md:h-80 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-light/10 overflow-hidden relative shadow-[0_8px_40px_rgba(59,94,232,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/30 to-transparent" />
              <p className="absolute bottom-4 left-4 text-xs text-white/70 tracking-widest">PHOTO</p>
            </div>
            <div className="flex gap-3 mt-5 justify-center">
              {[
                { label: "Behance", href: "https://behance.net/minhle123", text: "Be" },
                { label: "Email", href: "mailto:quangminh14320@gmail.com", text: "@" },
                { label: "Phone", href: "tel:+84794759487", text: "Ph" },
              ].map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-accent/5 border border-accent/15 flex items-center justify-center text-accent text-xs font-semibold hover:bg-accent hover:text-white transition-all">
                  {social.text}
                </a>
              ))}
            </div>
          </div>

          <div className="about-text flex-1">
            <p className="text-text-secondary leading-relaxed text-base mb-8">
              A passionate graphic designer with full-stack design capabilities — from
              brand identity and print materials to video production and web design. Born
              in 2000, bringing GenZ creative energy to every project.
            </p>

            <div className="flex gap-4">
              {[
                { ref: yearsRef, label: "Years Experience" },
                { ref: projectsRef, label: "Projects Done" },
                { ref: viewsRef, label: "Views/Month" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card card-soft flex-1 p-5 text-center">
                  <span ref={stat.ref} className="text-3xl font-black text-accent block">0</span>
                  <span className="text-xs text-text-muted mt-1 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
