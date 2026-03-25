"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useScrollAnimation(
  animationCallback: (el: HTMLElement, gsapInstance: typeof gsap) => void
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    animationCallback(el, gsap);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el || el.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    };
  }, [animationCallback]);

  return ref;
}

export function useCountUp(
  target: number,
  suffix: string = ""
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.value)}${suffix}`;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, [target, suffix]);

  return ref;
}
