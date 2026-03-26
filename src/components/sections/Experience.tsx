"use client";

import { useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimations";
import { TimelineEntry } from "@/components/ui/TimelineEntry";
import { experience, education } from "@/data/experience";
import type { gsap as GsapType } from "gsap";

export function Experience() {
  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      gsap.from(el.querySelector(".timeline-line"), {
        scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
      el.querySelectorAll(".timeline-entry").forEach((entry, i) => {
        gsap.from(entry, {
          x: i % 2 === 0 ? -50 : 50, opacity: 0, duration: 0.7,
          scrollTrigger: { trigger: entry, start: "top 80%", once: true },
        });
      });
      gsap.from(el.querySelector(".education-section"), {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: el.querySelector(".education-section"), start: "top 85%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);

  return (
    <section id="experience" className="py-24 bg-bg-primary relative overflow-hidden" ref={sectionRef}>
      <div className="deco-blob w-[400px] h-[400px] bg-gradient-to-tr from-accent/10 to-transparent -top-40 -right-40" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-[4px] text-accent uppercase bg-accent/5 px-4 py-2 rounded-full font-semibold">My Journey</span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 text-text-primary">Experience</h2>
        </div>

        <div className="relative">
          <div className="timeline-line absolute left-1.5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent/10" />
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        <div className="education-section mt-16">
          <h3 className="text-center text-lg font-bold text-text-primary mb-6">Education</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {education.map((edu) => (
              <div key={edu.degree} className="card-soft px-6 py-5 text-center flex-1">
                <p className="text-sm font-semibold text-text-primary">{edu.degree}</p>
                <p className="text-xs text-accent font-medium mt-1">{edu.school}</p>
                <p className="text-xs text-text-muted mt-1">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
