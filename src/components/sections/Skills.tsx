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
    <section id="skills" className="py-24 bg-bg-primary relative overflow-hidden" ref={sectionRef}>
      <div className="deco-blob w-[400px] h-[400px] bg-gradient-to-bl from-accent-light/10 to-transparent top-20 -right-40" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-[4px] text-accent uppercase bg-accent/5 px-4 py-2 rounded-full font-semibold">What I Use</span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 text-text-primary">Software Skills</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="card-soft inline-block px-8 py-5">
            <p className="text-xs tracking-widest text-text-muted uppercase">Language</p>
            <p className="text-lg font-bold text-text-primary mt-1">English</p>
            <p className="text-sm text-accent font-medium">Intermediate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
