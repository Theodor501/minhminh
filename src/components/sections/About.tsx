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
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(el.querySelectorAll(".about-text > *"), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      gsap.from(el.querySelectorAll(".stat-card"), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
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
    <section id="about" className="py-24 bg-bg-secondary" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="about-photo flex-shrink-0">
            <div className="w-48 h-60 md:w-56 md:h-72 rounded-xl bg-gradient-to-br from-accent/30 to-bg-tertiary overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-4 left-4 text-xs text-text-muted tracking-widest">PHOTO</p>
            </div>
            <div className="flex gap-3 mt-4 justify-center">
              {[
                { label: "Behance", href: "https://behance.net/minhle123", text: "Be" },
                { label: "Email", href: "mailto:quangminh14320@gmail.com", text: "@" },
                { label: "Phone", href: "tel:+84794759487", text: "Ph" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-accent flex items-center justify-center text-accent text-xs hover:bg-accent/10 transition-colors"
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>
          <div className="about-text flex-1">
            <p className="text-xs tracking-[4px] text-accent uppercase mb-2">About Me</p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Creative Designer Based in{" "}
              <span className="text-accent">Ho Chi Minh City</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              A passionate graphic designer with full-stack design capabilities — from
              brand identity and print materials to video production and web design. Born
              in 2000, bringing GenZ creative energy to every project.
            </p>
            <div className="flex gap-4">
              {[
                { ref: yearsRef, label: "YEARS EXP" },
                { ref: projectsRef, label: "PROJECTS" },
                { ref: viewsRef, label: "VIEWS/MO" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card flex-1 bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <span ref={stat.ref} className="text-2xl font-extrabold text-accent block">0</span>
                  <span className="text-[10px] tracking-widest text-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
