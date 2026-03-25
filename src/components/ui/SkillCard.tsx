"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Skill } from "@/data/skills";

export function SkillCard({ skill }: { skill: Skill }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      bar.style.width = `${skill.level}%`;
      return;
    }

    gsap.fromTo(bar, { width: "0%" }, {
      width: `${skill.level}%`,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: bar, start: "top 85%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === bar) t.kill();
      });
    };
  }, [skill.level]);

  return (
    <div className="bg-accent/[0.06] border border-accent/15 rounded-xl p-5 text-center backdrop-blur-sm">
      <div
        className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-sm font-extrabold"
        style={{ backgroundColor: skill.bgColor, color: skill.textColor }}
      >
        {skill.abbreviation}
      </div>
      <p className="text-sm text-text-primary mb-3">{skill.name}</p>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-light))",
            width: "0%",
          }}
        />
      </div>
      <p className="text-xs text-accent mt-2">{skill.level}%</p>
    </div>
  );
}
