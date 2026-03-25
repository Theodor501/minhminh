"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const BlobScene = dynamic(
  () => import("@/components/three/BlobScene").then((mod) => ({ default: mod.BlobScene })),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("nav", { y: -60, opacity: 0, duration: 0.5, delay: 0.5 })
        .from(".hero-label", { opacity: 0, y: 20, duration: 0.6 }, "-=0.1")
        .from(".hero-name span", { opacity: 0, x: -40, stagger: 0.2, duration: 0.6 }, "-=0.2")
        .from(".hero-title", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, "-=0.2")
        .from(".hero-tagline", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, "-=0.2")
        .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.1");

      // Blob scroll behavior: shrink and move to corner after hero
      gsap.to(".blob-container", {
        scrollTrigger: {
          trigger: "#hero",
          start: "bottom top",
          end: "+=300",
          scrub: 1,
        },
        scale: 0.3,
        x: "30vw",
        y: "-20vh",
        opacity: 0.4,
      });

      // Blob re-expands when Contact section is reached
      gsap.to(".blob-container", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        scale: 0.8,
        x: "20vw",
        y: "0vh",
        opacity: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #1b2838 100%)",
      }}
    >
      {/* Blob placeholder + Three.js scene */}
      <div className="blob-container absolute right-0 top-0 w-full h-full md:w-[55%]">
        <div className="blob-placeholder absolute inset-0" />
        <BlobScene />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-xl">
          <p className="hero-label text-xs tracking-[4px] text-accent uppercase mb-4">
            Hello, I&apos;m
          </p>
          <h1 className="hero-name text-5xl md:text-7xl font-black leading-tight">
            <span className="block text-text-primary">Quang</span>
            <span className="block text-accent">Minh</span>
          </h1>
          <p className="hero-title text-base md:text-lg text-text-secondary tracking-widest mt-4">
            Graphic Designer <span className="text-accent">(Full-Stack)</span>
          </p>
          <div className="hero-line w-16 h-0.5 bg-accent mt-6" />
          <p className="hero-tagline text-sm text-text-muted mt-4 max-w-sm leading-relaxed">
            Creating visual experiences that connect brands with people.
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="#portfolio"
              className="hero-cta px-6 py-3 bg-accent text-white text-xs font-semibold tracking-widest rounded hover:bg-accent-light transition-colors"
            >
              VIEW WORK
            </a>
            <a
              href="#contact"
              className="hero-cta px-6 py-3 border border-accent text-accent text-xs font-semibold tracking-widest rounded hover:bg-accent/10 transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <ScrollIndicator />
      </div>
    </section>
  );
}
