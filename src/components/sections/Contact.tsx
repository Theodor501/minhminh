"use client";

import { useState, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimations";
import type { gsap as GsapType } from "gsap";

export function Contact() {
  const [showToast, setShowToast] = useState(false);

  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      gsap.from(el.querySelectorAll(".contact-info > *"), {
        x: -30, opacity: 0, stagger: 0.12, duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
      gsap.from(el.querySelectorAll(".contact-form > *"), {
        x: 30, opacity: 0, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const contactItems = [
    { icon: "📞", label: "PHONE", value: "+84 79 475 9487", href: "tel:+84794759487" },
    { icon: "✉️", label: "EMAIL", value: "quangminh14320@gmail.com", href: "mailto:quangminh14320@gmail.com" },
    { icon: "📍", label: "LOCATION", value: "Dist.9, Ho Chi Minh City", href: undefined },
    { icon: "🎨", label: "BEHANCE", value: "behance.net/minhle123", href: "https://behance.net/minhle123" },
  ];

  return (
    <section id="contact" className="py-24 bg-bg-secondary relative" ref={sectionRef}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[4px] text-accent uppercase mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-extrabold">Let&apos;s Work Together</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="contact-info flex-1 space-y-5">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-text-muted">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-text-primary hover:text-accent transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm text-text-primary">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="contact-form flex-1 space-y-3">
            <input type="text" placeholder="Your Name" className="w-full bg-accent/[0.06] border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
            <input type="email" placeholder="Your Email" className="w-full bg-accent/[0.06] border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
            <textarea placeholder="Message..." rows={4} className="w-full bg-accent/[0.06] border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none" />
            <button type="submit" className="w-full py-3 bg-accent text-white text-sm font-semibold tracking-widest rounded-lg hover:bg-accent-light transition-colors">
              SEND MESSAGE
            </button>
          </form>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-accent/10">
          <div className="flex justify-center gap-4 mb-4">
            {[
              { label: "Behance", href: "https://behance.net/minhle123" },
              { label: "Email", href: "mailto:quangminh14320@gmail.com" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-xs text-text-muted hover:text-accent transition-colors tracking-widest uppercase">
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-text-muted">&copy; 2025 Quang Minh. Designed with creativity.</p>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bg-tertiary border border-accent/30 text-text-primary px-6 py-3 rounded-lg shadow-lg z-[200] text-sm">
          Coming soon! Please{" "}
          <a href="mailto:quangminh14320@gmail.com" className="text-accent underline">email me directly</a>.
        </div>
      )}
    </section>
  );
}
