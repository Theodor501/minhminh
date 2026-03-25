"use client";

import { useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimations";
import { SkillCard } from "@/components/ui/SkillCard";
import { skills } from "@/data/skills";
import type { gsap as GsapType } from "gsap";

export function Skills() {
  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      gsap.from(el.querySelectorAll(".skill-card"), {
        y: 50, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);

  return (
    <section id="skills" className="py-24 bg-bg-tertiary" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[4px] text-accent uppercase mb-2">What I Use</p>
          <h2 className="text-3xl md:text-4xl font-extrabold">Software Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <div className="inline-block bg-accent/[0.06] border border-accent/15 rounded-lg px-8 py-4">
            <p className="text-[10px] tracking-widest text-text-muted uppercase">Language</p>
            <p className="text-lg font-bold text-text-primary mt-1">English</p>
            <p className="text-sm text-accent">Intermediate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
