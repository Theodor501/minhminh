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
    <section id="contact" className="py-24 bg-white relative overflow-hidden" ref={sectionRef}>
      <div className="deco-blob w-[500px] h-[500px] bg-gradient-to-br from-accent/8 to-accent-light/5 -bottom-60 -right-60" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-xs tracking-[4px] text-accent uppercase bg-accent/5 px-4 py-2 rounded-full font-semibold">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 text-text-primary">Let&apos;s Work Together</h2>
        </div>

        <div className="card-soft p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="contact-info flex-1 space-y-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-text-muted font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-text-primary hover:text-accent transition-colors font-medium">{item.value}</a>
                    ) : (
                      <p className="text-sm text-text-primary font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="contact-form flex-1 space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-bg-primary border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" />
              <input type="email" placeholder="Your Email" className="w-full bg-bg-primary border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" />
              <textarea placeholder="Message..." rows={4} className="w-full bg-bg-primary border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all resize-none" />
              <button type="submit" className="w-full py-3.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-light transition-all shadow-[0_4px_16px_rgba(59,94,232,0.3)] flex items-center justify-center gap-2">
                Send Message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-gray-100">
          <div className="flex justify-center gap-6 mb-4">
            {[
              { label: "Behance", href: "https://behance.net/minhle123" },
              { label: "Email", href: "mailto:quangminh14320@gmail.com" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-text-muted hover:text-accent transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-text-muted">&copy; 2025 Quang Minh. Designed with creativity.</p>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-accent/20 text-text-primary px-6 py-3 rounded-xl shadow-[0_8px_32px_rgba(59,94,232,0.15)] z-[200] text-sm">
          Coming soon! Please{" "}
          <a href="mailto:quangminh14320@gmail.com" className="text-accent underline font-medium">email me directly</a>.
        </div>
      )}
    </section>
  );
}
