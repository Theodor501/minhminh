"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.from(contentRef.current, {
        scale: window.innerWidth < 768 ? 1 : 0.9,
        y: window.innerWidth < 768 ? "100%" : 0,
        opacity: 0, duration: 0.4, delay: 0.1,
      });
    }

    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !contentRef.current) return;
      const focusable = contentRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);
    document.body.style.overflow = "hidden";
    contentRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog" aria-modal="true" aria-label={`Project: ${project.title}`}>
      <div ref={contentRef} className="bg-white max-w-2xl w-full overflow-hidden md:rounded-2xl rounded-t-2xl md:max-h-[85vh] max-h-full fixed md:relative bottom-0 md:bottom-auto overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        <div className="h-64 md:h-80" style={{ background: project.gradient }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>
              <p className="text-sm text-accent font-medium mt-1">{project.client}</p>
              <span className="inline-block text-xs tracking-widest uppercase text-text-muted mt-2 bg-accent/5 px-3 py-1 rounded-full font-medium">
                {project.category}
              </span>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary text-2xl leading-none p-2 hover:bg-bg-tertiary rounded-full transition-colors" aria-label="Close modal">
              &times;
            </button>
          </div>
          <p className="text-text-secondary leading-relaxed">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
