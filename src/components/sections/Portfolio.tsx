"use client";

import { useState, useCallback, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimations";
import { gsap } from "@/lib/gsap";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { filterProjects, filterTabs, type FilterTab, type Project } from "@/data/projects";
import type { gsap as GsapType } from "gsap";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filterProjects(activeFilter);

  const handleFilterChange = (tab: FilterTab) => {
    if (tab === activeFilter) return;
    const grid = gridRef.current;
    if (grid) {
      gsap.to(grid.children, {
        opacity: 0, scale: 0.95, duration: 0.2, stagger: 0.03,
        onComplete: () => {
          setActiveFilter(tab);
          requestAnimationFrame(() => {
            if (grid) {
              gsap.from(grid.children, { opacity: 0, scale: 0.95, y: 20, duration: 0.4, stagger: 0.06 });
            }
          });
        },
      });
    } else {
      setActiveFilter(tab);
    }
  };

  const animationCallback = useCallback(
    (el: HTMLElement, gsapInst: typeof GsapType) => {
      gsapInst.from(el.querySelectorAll(".filter-tab"), {
        y: -20, opacity: 0, stagger: 0.08, duration: 0.5,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
      gsapInst.from(el.querySelectorAll(".project-card"), {
        y: 40, opacity: 0, scale: 0.95, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 65%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);

  return (
    <section id="portfolio" className="py-24 bg-white relative overflow-hidden" ref={sectionRef}>
      <div className="deco-blob w-[500px] h-[500px] bg-gradient-to-br from-accent/8 to-accent-light/5 bottom-0 -left-60" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <span className="inline-block text-xs tracking-[4px] text-accent uppercase bg-accent/5 px-4 py-2 rounded-full font-semibold">Selected Work</span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 text-text-primary">Portfolio</h2>
        </div>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab)}
              className={`filter-tab px-5 py-2.5 rounded-full text-sm font-medium transition-all capitalize ${
                activeFilter === tab
                  ? "bg-accent text-white shadow-[0_4px_16px_rgba(59,94,232,0.3)]"
                  : "bg-bg-tertiary text-text-secondary hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, i) => (
            <div key={project.id} className={`project-card ${i === 0 ? "md:row-span-2" : ""}`}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
