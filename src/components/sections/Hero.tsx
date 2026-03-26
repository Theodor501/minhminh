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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("nav", { y: -60, opacity: 0, duration: 0.5, delay: 0.5 })
        .from(".hero-badge", { opacity: 0, y: 20, scale: 0.9, duration: 0.6 }, "-=0.1")
        .from(".hero-name span", { opacity: 0, y: 40, stagger: 0.15, duration: 0.7 }, "-=0.2")
        .from(".hero-title", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-tagline", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, "-=0.2")
        .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.1")
        .from(".hero-float-card", { opacity: 0, y: 30, stagger: 0.2, duration: 0.6 }, "-=0.5");

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
        opacity: 0.3,
      });

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
        opacity: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary"
    >
      {/* Decorative gradient blobs */}
      <div className="deco-blob w-[600px] h-[600px] bg-gradient-to-br from-accent/20 to-accent-light/10 -top-40 -right-40" />
      <div className="deco-blob w-[400px] h-[400px] bg-gradient-to-tr from-accent-light/15 to-transparent bottom-20 -left-40" />

      {/* Three.js blob */}
      <div className="blob-container absolute right-0 top-0 w-full h-full md:w-[50%]">
        <div className="blob-placeholder absolute inset-0" />
        <BlobScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
        <div className="max-w-2xl">
          <div className="hero-badge inline-flex items-center gap-2 bg-white border border-accent/15 rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(59,94,232,0.1)] mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-text-secondary">Graphic Designer <span className="text-accent font-semibold">(Full-Stack)</span></span>
          </div>

          <h1 className="hero-name text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
            <span className="block text-text-primary">Creative Design</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">By Quang Minh</span>
          </h1>

          <p className="hero-tagline text-base md:text-lg text-text-secondary mt-6 max-w-md leading-relaxed">
            Creating visual experiences that connect brands with people. From brand identity to video production.
          </p>

          <div className="flex gap-4 mt-8">
            <a
              href="#portfolio"
              className="hero-cta px-7 py-3.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-light transition-all shadow-[0_4px_20px_rgba(59,94,232,0.35)] flex items-center gap-2"
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a
              href="#about"
              className="hero-cta px-7 py-3.5 bg-white border border-gray-200 text-text-primary text-sm font-semibold rounded-full hover:border-accent hover:text-accent transition-all shadow-sm"
            >
              About Me
            </a>
          </div>
        </div>

        {/* Floating info cards like the reference image */}
        <div className="hidden lg:flex gap-4 mt-16">
          <div className="hero-float-card card-soft px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-lg font-bold">3+</div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Years Experience</p>
              <p className="text-xs text-text-muted">Full-stack design</p>
            </div>
          </div>
          <div className="hero-float-card card-soft px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-lg font-bold">50+</div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Projects Done</p>
              <p className="text-xs text-text-muted">Branding, print & social</p>
            </div>
          </div>
          <div className="hero-float-card card-soft px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-lg font-bold">5K</div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Monthly Views</p>
              <p className="text-xs text-text-muted">On Behance portfolio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <ScrollIndicator />
      </div>
    </section>
  );
}
