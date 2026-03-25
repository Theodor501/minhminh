# Quang Minh Portfolio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio website for graphic designer Quang Minh with a 3D morphing blob, cinematic GSAP scroll animations, and 6 content sections.

**Architecture:** Next.js App Router with static export. Three.js (via React Three Fiber) for the morphing blob with custom GLSL shaders. GSAP ScrollTrigger for all section animations. Tailwind CSS v4 for styling. Data files drive content so sections are easily editable.

**Tech Stack:** Next.js 15, React 19, TypeScript, Three.js + R3F + Drei, GSAP 3.12 (ScrollTrigger + ScrollToPlugin), Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-03-25-portfolio-website-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: Poppins font, metadata, body styling
│   ├── page.tsx                # Single page composing all sections
│   └── globals.css             # Tailwind v4 imports + custom CSS variables + keyframes
├── components/
│   ├── three/
│   │   ├── BlobScene.tsx       # R3F Canvas wrapper (lazy-loaded via next/dynamic)
│   │   ├── MorphBlob.tsx       # Icosahedron + custom ShaderMaterial + mouse interaction
│   │   └── shaders/
│   │       ├── blob.vert.ts    # GLSL vertex shader (simplex noise displacement)
│   │       └── blob.frag.ts    # GLSL fragment shader (Fresnel rim + gradient color)
│   ├── sections/
│   │   ├── Hero.tsx            # Hero section: text content + blob + scroll indicator
│   │   ├── About.tsx           # About section: photo + bio + stat counters
│   │   ├── Skills.tsx          # Skills section: skill card grid + language badge
│   │   ├── Portfolio.tsx       # Portfolio section: filter tabs + project grid + modal
│   │   ├── Experience.tsx      # Experience section: timeline + education
│   │   └── Contact.tsx         # Contact section: info + form + footer
│   └── ui/
│       ├── Navbar.tsx          # Fixed nav: logo, links, hamburger menu, scroll spy
│       ├── SkillCard.tsx       # Single skill card: icon + name + progress bar
│       ├── ProjectCard.tsx     # Single project card: image + overlay + tilt hover
│       ├── ProjectModal.tsx    # Full-screen project detail overlay
│       ├── TimelineEntry.tsx   # Single timeline entry: date, title, description
│       └── ScrollIndicator.tsx # Mouse icon with pulse animation
├── data/
│   ├── skills.ts              # Skills array with name, abbreviation, level, color
│   ├── projects.ts            # Projects array with title, client, category, image, description
│   └── experience.ts          # Experience + education arrays
├── hooks/
│   ├── useMousePosition.ts    # Normalized mouse position tracking
│   ├── useScrollAnimations.ts # GSAP ScrollTrigger registration + reduced-motion check
│   └── useMobileDetect.ts     # Simple mobile breakpoint detection for blob detail
└── lib/
    └── gsap.ts                # GSAP + ScrollTrigger plugin registration (imported once)
```

---

## Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/petrus/Documents/minh-designer/minhminh
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Accept overwriting existing files if prompted. This creates the full Next.js scaffold.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install three @react-three/fiber @react-three/drei gsap
npm install -D @types/three
```

- [ ] **Step 3: Update `.gitignore`**

Ensure these entries exist (append if missing — `node_modules` and `.next` should already be there from create-next-app):

```gitignore
.superpowers/
```

- [ ] **Step 4: Configure `next.config.ts` for static export**

Replace content of `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 5: Set up `globals.css` with design system tokens**

Replace content of `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0a0a1a;
  --color-bg-secondary: #0d1b2a;
  --color-bg-tertiary: #111827;
  --color-accent: #4a90d9;
  --color-accent-light: #6ab0ff;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #8899aa;
  --color-text-muted: #7a8a9a;
}

html {
  scroll-behavior: auto; /* GSAP handles smooth scrolling */
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}

/* Blob loading placeholder */
.blob-placeholder {
  background: radial-gradient(
    ellipse at 60% 50%,
    rgba(74, 144, 217, 0.15) 0%,
    transparent 70%
  );
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Set up `src/app/layout.tsx` with Poppins font and metadata**

Replace content of `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Quang Minh — Graphic Designer Portfolio",
  description:
    "Full-stack graphic designer based in Ho Chi Minh City. Brand identity, print materials, e-commerce design, and video production.",
  openGraph: {
    title: "Quang Minh — Graphic Designer Portfolio",
    description:
      "Full-stack graphic designer based in Ho Chi Minh City. Brand identity, print materials, e-commerce design, and video production.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Quang Minh",
  jobTitle: "Graphic Designer",
  url: "https://behance.net/minhle123",
  email: "quangminh14320@gmail.com",
  telephone: "+84794759487",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-[family-name:var(--font-poppins)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Create minimal `src/app/page.tsx` placeholder**

Replace content of `src/app/page.tsx`:

```typescript
export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <h1 className="text-text-primary text-4xl font-bold p-8">
        Quang Minh Portfolio
      </h1>
    </main>
  );
}
```

- [ ] **Step 8: Verify build works**

```bash
npm run build
```

Expected: Build succeeds with static export.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, Three.js, GSAP dependencies"
```

---

## Task 2: Data Layer

**Files:**
- Create: `src/data/skills.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`

- [ ] **Step 1: Create `src/data/skills.ts`**

```typescript
export interface Skill {
  name: string;
  abbreviation: string;
  level: number;
  bgColor: string;
  textColor: string;
}

export const skills: Skill[] = [
  { name: "Illustrator", abbreviation: "Ai", level: 80, bgColor: "#330000", textColor: "#ff9a00" },
  { name: "Photoshop", abbreviation: "Ps", level: 80, bgColor: "#001e36", textColor: "#31a8ff" },
  { name: "Premiere", abbreviation: "Pr", level: 50, bgColor: "#00005b", textColor: "#9999ff" },
  { name: "After Effects", abbreviation: "Ae", level: 40, bgColor: "#00005b", textColor: "#9999ff" },
  { name: "Figma", abbreviation: "F", level: 35, bgColor: "#1a1a2e", textColor: "#a259ff" },
  { name: "Dimension", abbreviation: "Dn", level: 30, bgColor: "#0a2e1a", textColor: "#49cc90" },
];
```

- [ ] **Step 2: Create `src/data/projects.ts`**

```typescript
export type ProjectCategory = "branding" | "print" | "social";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  description: string;
  gradient: string; // Placeholder gradient until real images are added
}

export const projects: Project[] = [
  {
    id: "brand-identity-adx",
    title: "Brand Identity",
    client: "Anh Duong Xanh",
    category: "branding",
    description: "Complete brand identity design including logo, color palette, and brand guidelines for a green energy company.",
    gradient: "linear-gradient(135deg, #1a3a5c, #2a5a8c)",
  },
  {
    id: "ecommerce-posts",
    title: "E-commerce Posts",
    client: "Product Campaign",
    category: "social",
    description: "Series of e-commerce social media posts designed to drive engagement and conversions.",
    gradient: "linear-gradient(135deg, #2a2a4a, #3a3a6a)",
  },
  {
    id: "posm-pnp",
    title: "POSM Design",
    client: "PNP Global Supply",
    category: "print",
    description: "Point of sale materials including standees, banners, and shelf displays for retail environments.",
    gradient: "linear-gradient(135deg, #1a2a1a, #2a4a2a)",
  },
  {
    id: "print-materials",
    title: "Print Materials",
    client: "Catalogues & Brochures",
    category: "print",
    description: "Product catalogues, brochures, stickers, and tags for print production with vendor coordination.",
    gradient: "linear-gradient(135deg, #2a1a2a, #4a2a4a)",
  },
  {
    id: "logo-freelance",
    title: "Logo Design",
    client: "International Clients",
    category: "branding",
    description: "Custom logo designs and branding materials for international freelance clients with 5000+ views per month.",
    gradient: "linear-gradient(135deg, #1a1a3a, #2a2a5a)",
  },
];

export const filterTabs = ["all", "branding", "print", "social"] as const;
export type FilterTab = (typeof filterTabs)[number];

export function filterProjects(tab: FilterTab): Project[] {
  if (tab === "all") return projects;
  return projects.filter((p) => p.category === tab);
}
```

- [ ] **Step 3: Create `src/data/experience.ts`**

```typescript
export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "freelancer",
    company: "Freelancer",
    role: "Graphic Designer",
    period: "2022 – Present",
    description: [
      "Design logos and branding materials, mockups for international clients",
      "5000+ Views per month. YouTube thumbnails, video scripts, and edits",
    ],
  },
  {
    id: "anh-duong-xanh",
    company: "Anh Duong Xanh",
    role: "Graphic Designer",
    period: "07/2024 – 12/2024",
    description: [
      "Design POSM, e-commerce posts, brand identity, image retouching",
      "Shooting and editing for e-commerce video & reels",
    ],
  },
  {
    id: "pnp-global",
    company: "PNP Global Supply",
    role: "Fullstack Designer",
    period: "08/2023 – 05/2024",
    description: [
      "Design brand identity, websites, printed materials: catalogues, brochures, stickers",
      "Produce 2-3 videos per week & photographer",
    ],
  },
  {
    id: "tdc-design-club",
    company: "TDC Design Club",
    role: "Leader",
    period: "08/2021 – 09/2022",
    description: [
      "Managed a team of 3 designers to deliver visual campaigns",
      "Grew fanpage to 10,000+ followers in 6 months",
    ],
  },
];

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export const education: Education[] = [
  {
    degree: "Business Administration",
    school: "Thu Duc College of Technology",
    period: "2020 – 2022",
  },
  {
    degree: "IT Certificate (Advanced)",
    school: "VNUHCM-US",
    period: "2020 – 2022",
  },
];
```

- [ ] **Step 4: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add data layer for skills, projects, and experience"
```

---

## Task 3: GSAP Setup & Animation Hooks

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/hooks/useScrollAnimations.ts`
- Create: `src/hooks/useMousePosition.ts`
- Create: `src/hooks/useMobileDetect.ts`

- [ ] **Step 1: Create `src/lib/gsap.ts`**

```typescript
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Create `src/hooks/useScrollAnimations.ts`**

```typescript
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

    // Respect prefers-reduced-motion
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
```

- [ ] **Step 3: Create `src/hooks/useMousePosition.ts`**

```typescript
"use client";

import { useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const position = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      position.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
```

- [ ] **Step 4: Create `src/hooks/useMobileDetect.ts`**

```typescript
"use client";

import { useState, useEffect } from "react";

export function useMobileDetect(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
```

- [ ] **Step 5: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ src/hooks/
git commit -m "feat: add GSAP setup and animation/mouse/mobile hooks"
```

---

## Task 4: Three.js Morphing Blob

**Files:**
- Create: `src/components/three/shaders/blob.vert.ts`
- Create: `src/components/three/shaders/blob.frag.ts`
- Create: `src/components/three/MorphBlob.tsx`
- Create: `src/components/three/BlobScene.tsx`

- [ ] **Step 1: Create vertex shader `src/components/three/shaders/blob.vert.ts`**

```typescript
export const blobVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec2 uMousePos;

  varying vec3 vNormal;
  varying float vDisplacement;

  //
  // GLSL simplex noise (Ashima Arts)
  //
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;

    // Mouse influence: shift noise sampling toward cursor
    vec3 mouseInfluence = vec3(uMousePos.x * 0.1, uMousePos.y * 0.1, 0.0);

    float noise = snoise((pos + mouseInfluence) * uFrequency + uTime * 0.2);
    float displacement = noise * uAmplitude;

    pos += normal * displacement;

    vNormal = normalize(normalMatrix * normal);
    vDisplacement = displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
```

- [ ] **Step 2: Create fragment shader `src/components/three/shaders/blob.frag.ts`**

```typescript
export const blobFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uEmissive;

  varying vec3 vNormal;
  varying float vDisplacement;

  void main() {
    // View direction (camera is at origin in view space)
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));

    // Fresnel rim effect
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);

    // Color based on displacement
    vec3 baseColor = mix(uColor, uEmissive, vDisplacement * 2.0 + 0.5);

    // Add rim glow
    vec3 rimColor = vec3(0.4, 0.7, 1.0);
    vec3 finalColor = baseColor + rimColor * fresnel * 0.6;

    // Add subtle specular highlight
    float specular = pow(max(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 0.0), 32.0);
    finalColor += vec3(1.0) * specular * 0.3;

    gl_FragColor = vec4(finalColor, 0.9);
  }
`;
```

- [ ] **Step 3: Create `src/components/three/MorphBlob.tsx`**

```typescript
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { blobVertexShader } from "./shaders/blob.vert";
import { blobFragmentShader } from "./shaders/blob.frag";

interface MorphBlobProps {
  mousePosition: React.RefObject<{ x: number; y: number }>;
  isMobile: boolean;
}

export function MorphBlob({ mousePosition, isMobile }: MorphBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrequency: { value: 0.4 },
      uAmplitude: { value: 0.3 },
      uMousePos: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#4a90d9") },
      uEmissive: { value: new THREE.Color("#1a3a5c") },
    }),
    []
  );

  const detail = isMobile ? 16 : 32;

  useFrame((state) => {
    // Stop morphing animation when reduced motion is preferred
    if (prefersReducedMotion) return;

    uniforms.uTime.value = state.clock.elapsedTime;

    if (!isMobile && mousePosition.current) {
      uniforms.uMousePos.value.lerp(
        new THREE.Vector2(
          mousePosition.current.x,
          mousePosition.current.y
        ),
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        vertexShader={blobVertexShader}
        fragmentShader={blobFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
```

- [ ] **Step 4: Create `src/components/three/BlobScene.tsx`**

```typescript
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { MorphBlob } from "./MorphBlob";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMobileDetect } from "@/hooks/useMobileDetect";

export function BlobScene() {
  const mousePosition = useMousePosition();
  const isMobile = useMobileDetect();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        onCreated={() => setIsLoaded(true)}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <MorphBlob mousePosition={mousePosition} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 5: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/three/
git commit -m "feat: add Three.js morphing blob with custom GLSL shaders"
```

---

## Task 5: Navbar Component

**Files:**
- Create: `src/components/ui/Navbar.tsx`

- [ ] **Step 1: Create `src/components/ui/Navbar.tsx`**

```typescript
"use client";

import { useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 80 },
        duration: 1,
        ease: "power2.inOut",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-primary/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-black tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-accent">Q</span>
          <span className="text-text-primary">M</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-xs tracking-widest uppercase text-text-secondary hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-transform ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-opacity ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-transform ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-bg-primary/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-2xl font-semibold text-text-primary hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Navbar.tsx
git commit -m "feat: add Navbar with scroll spy, mobile hamburger menu"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/ui/ScrollIndicator.tsx`
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create `src/components/ui/ScrollIndicator.tsx`**

```typescript
export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
      <span className="text-[9px] tracking-[3px] text-text-muted uppercase">Scroll</span>
      <div className="w-5 h-8 border-[1.5px] border-accent rounded-full relative">
        <div className="w-[3px] h-2 bg-accent rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-bounce" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Hero.tsx`**

```typescript
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("nav", { y: -60, opacity: 0, duration: 0.5, delay: 0.5 })
        .from(".hero-label", { opacity: 0, y: 20, duration: 0.6 }, "-=0.1")
        .from(".hero-name span", { opacity: 0, x: -40, stagger: 0.2, duration: 0.6 }, "-=0.2")
        .from(".hero-title", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, "-=0.2")
        .from(".hero-tagline", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, "-=0.2")
        .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #1b2838 100%)",
      }}
    >
      {/* Blob placeholder + Three.js scene */}
      <div className="absolute right-0 top-0 w-full h-full md:w-[55%]">
        <div className="blob-placeholder absolute inset-0" />
        <BlobScene />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-xl">
          <p className="hero-label text-xs tracking-[4px] text-accent uppercase mb-4">
            Hello, I&apos;m
          </p>
          <h1 className="hero-name text-5xl md:text-7xl font-black leading-tight">
            <span className="block text-text-primary">Quang</span>
            <span className="block text-accent">Minh</span>
          </h1>
          <p className="hero-title text-base md:text-lg text-text-secondary tracking-widest mt-4">
            Graphic Designer <span className="text-accent">(Full-Stack)</span>
          </p>
          <div className="hero-line w-16 h-0.5 bg-accent mt-6" />
          <p className="hero-tagline text-sm text-text-muted mt-4 max-w-sm leading-relaxed">
            Creating visual experiences that connect brands with people.
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="#portfolio"
              className="hero-cta px-6 py-3 bg-accent text-white text-xs font-semibold tracking-widest rounded hover:bg-accent-light transition-colors"
            >
              VIEW WORK
            </a>
            <a
              href="#contact"
              className="hero-cta px-6 py-3 border border-accent text-accent text-xs font-semibold tracking-widest rounded hover:bg-accent/10 transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <ScrollIndicator />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ScrollIndicator.tsx src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with blob, text animations, scroll indicator"
```

---

## Task 7: About Section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create `src/components/sections/About.tsx`**

```typescript
"use client";

import { useCallback } from "react";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimations";
import type { gsap as GsapType } from "gsap";

export function About() {
  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      gsap.from(el.querySelector(".about-photo"), {
        x: -80,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      // Parallax depth effect on photo while scrolling
      gsap.to(el.querySelector(".about-photo"), {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(el.querySelectorAll(".about-text > *"), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      gsap.from(el.querySelectorAll(".stat-card"), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 60%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);
  const yearsRef = useCountUp(3, "+");
  const projectsRef = useCountUp(50, "+");
  const viewsRef = useCountUp(5, "K+");

  return (
    <section id="about" className="py-24 bg-bg-secondary" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Photo */}
          <div className="about-photo flex-shrink-0">
            <div className="w-48 h-60 md:w-56 md:h-72 rounded-xl bg-gradient-to-br from-accent/30 to-bg-tertiary overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-4 left-4 text-xs text-text-muted tracking-widest">
                PHOTO
              </p>
            </div>
            {/* Social icons */}
            <div className="flex gap-3 mt-4 justify-center">
              {[
                { label: "Behance", href: "https://behance.net/minhle123", text: "Be" },
                { label: "Email", href: "mailto:quangminh14320@gmail.com", text: "@" },
                { label: "Phone", href: "tel:+84794759487", text: "Ph" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-accent flex items-center justify-center text-accent text-xs hover:bg-accent/10 transition-colors"
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="about-text flex-1">
            <p className="text-xs tracking-[4px] text-accent uppercase mb-2">About Me</p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Creative Designer Based in{" "}
              <span className="text-accent">Ho Chi Minh City</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              A passionate graphic designer with full-stack design capabilities — from
              brand identity and print materials to video production and web design. Born
              in 2000, bringing GenZ creative energy to every project.
            </p>

            {/* Stat cards */}
            <div className="flex gap-4">
              {[
                { ref: yearsRef, label: "YEARS EXP" },
                { ref: projectsRef, label: "PROJECTS" },
                { ref: viewsRef, label: "VIEWS/MO" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card flex-1 bg-accent/10 border border-accent/20 rounded-lg p-4"
                >
                  <span
                    ref={stat.ref}
                    className="text-2xl font-extrabold text-accent block"
                  >
                    0
                  </span>
                  <span className="text-[10px] tracking-widest text-text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section with parallax photo, count-up stats"
```

---

## Task 8: Skills Section

**Files:**
- Create: `src/components/ui/SkillCard.tsx`
- Create: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Create `src/components/ui/SkillCard.tsx`**

```typescript
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Skill } from "@/data/skills";

export function SkillCard({ skill }: { skill: Skill }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      bar.style.width = `${skill.level}%`;
      return;
    }

    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: `${skill.level}%`,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: bar, start: "top 85%", once: true },
      }
    );

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
```

- [ ] **Step 2: Create `src/components/sections/Skills.tsx`**

```typescript
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
        y: 50,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
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

        {/* Language badge */}
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
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SkillCard.tsx src/components/sections/Skills.tsx
git commit -m "feat: add Skills section with animated progress bars"
```

---

## Task 9: Portfolio Section

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`
- Create: `src/components/ui/ProjectModal.tsx`
- Create: `src/components/sections/Portfolio.tsx`

- [ ] **Step 1: Create `src/components/ui/ProjectCard.tsx`**

```typescript
"use client";

import { useRef } from "react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-lg overflow-hidden cursor-pointer transition-transform duration-300"
      style={{ background: project.gradient }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View project: ${project.title}`}
    >
      <div className="h-full min-h-[180px] flex items-end p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10">
          <p className="text-sm font-semibold text-white">{project.title}</p>
          <p className="text-xs text-white/60">{project.client}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/ProjectModal.tsx`**

```typescript
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.from(contentRef.current, {
        scale: window.innerWidth < 768 ? 1 : 0.9,
        y: window.innerWidth < 768 ? "100%" : 0,
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
      });
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Focus trap: cycle through focusable elements inside modal
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !contentRef.current) return;
      const focusable = contentRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);
    document.body.style.overflow = "hidden";

    // Auto-focus the close button
    const closeBtn = contentRef.current?.querySelector<HTMLElement>("button");
    closeBtn?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      <div
        ref={contentRef}
        className="bg-bg-secondary max-w-2xl w-full overflow-hidden md:rounded-xl rounded-t-xl md:max-h-[85vh] max-h-full fixed md:relative bottom-0 md:bottom-auto overflow-y-auto"
      >
        {/* Project image */}
        <div
          className="h-64 md:h-80"
          style={{ background: project.gradient }}
        />

        {/* Project details */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>
              <p className="text-sm text-accent mt-1">{project.client}</p>
              <span className="inline-block text-xs tracking-widest uppercase text-text-muted mt-2 bg-accent/10 px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary text-2xl leading-none p-2"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <p className="text-text-secondary leading-relaxed">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/Portfolio.tsx`**

```typescript
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimations";
import { gsap } from "@/lib/gsap";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects, filterProjects, filterTabs, type FilterTab, type Project } from "@/data/projects";
import type { gsap as GsapType } from "gsap";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filterProjects(activeFilter);

  // Animate grid items when filter changes
  const handleFilterChange = (tab: FilterTab) => {
    if (tab === activeFilter) return;
    const grid = gridRef.current;
    if (grid) {
      gsap.to(grid.children, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        stagger: 0.03,
        onComplete: () => {
          setActiveFilter(tab);
          // After React re-renders, animate new items in
          requestAnimationFrame(() => {
            if (grid) {
              gsap.from(grid.children, {
                opacity: 0,
                scale: 0.95,
                y: 20,
                duration: 0.4,
                stagger: 0.06,
              });
            }
          });
        },
      });
    } else {
      setActiveFilter(tab);
    }
  };

  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      gsap.from(el.querySelectorAll(".filter-tab"), {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });

      gsap.from(el.querySelectorAll(".project-card"), {
        y: 40,
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 65%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);

  return (
    <section id="portfolio" className="py-24 bg-bg-secondary" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[4px] text-accent uppercase mb-2">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-extrabold">Portfolio</h2>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab)}
              className={`filter-tab px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all ${
                activeFilter === tab
                  ? "bg-accent text-white"
                  : "border border-accent/30 text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className={`project-card ${i === 0 ? "md:row-span-2" : ""}`}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
```

- [ ] **Step 4: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ProjectCard.tsx src/components/ui/ProjectModal.tsx src/components/sections/Portfolio.tsx
git commit -m "feat: add Portfolio section with filter tabs, 3D tilt cards, detail modal"
```

---

## Task 10: Experience Section

**Files:**
- Create: `src/components/ui/TimelineEntry.tsx`
- Create: `src/components/sections/Experience.tsx`

- [ ] **Step 1: Create `src/components/ui/TimelineEntry.tsx`**

```typescript
import type { ExperienceEntry } from "@/data/experience";

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="timeline-entry flex items-start gap-4 mb-12 relative">
      {/* Left content */}
      <div className={`flex-1 ${isLeft ? "text-right pr-6" : "opacity-0 pointer-events-none"} hidden md:block`}>
        {isLeft && (
          <>
            <p className="text-sm font-bold text-accent">{entry.period}</p>
            <h3 className="text-lg font-bold text-text-primary mt-1">{entry.company}</h3>
            <p className="text-xs text-text-muted mt-1">{entry.role}</p>
            <ul className="mt-2 space-y-1">
              {entry.description.map((desc, i) => (
                <li key={i} className="text-xs text-text-secondary">{desc}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Dot */}
      <div className="timeline-dot flex-shrink-0 w-3 h-3 rounded-full bg-accent border-2 border-bg-primary relative z-10 mt-1" />

      {/* Right content */}
      <div className={`flex-1 ${!isLeft ? "pl-6" : "opacity-0 pointer-events-none"} hidden md:block`}>
        {!isLeft && (
          <>
            <p className="text-sm font-bold text-accent">{entry.period}</p>
            <h3 className="text-lg font-bold text-text-primary mt-1">{entry.company}</h3>
            <p className="text-xs text-text-muted mt-1">{entry.role}</p>
            <ul className="mt-2 space-y-1">
              {entry.description.map((desc, i) => (
                <li key={i} className="text-xs text-text-secondary">{desc}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Mobile: always show on right */}
      <div className="flex-1 pl-4 md:hidden">
        <p className="text-sm font-bold text-accent">{entry.period}</p>
        <h3 className="text-lg font-bold text-text-primary mt-1">{entry.company}</h3>
        <p className="text-xs text-text-muted mt-1">{entry.role}</p>
        <ul className="mt-2 space-y-1">
          {entry.description.map((desc, i) => (
            <li key={i} className="text-xs text-text-secondary">{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Experience.tsx`**

```typescript
"use client";

import { useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimations";
import { TimelineEntry } from "@/components/ui/TimelineEntry";
import { experience, education } from "@/data/experience";
import type { gsap as GsapType } from "gsap";

export function Experience() {
  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      // Timeline line draws down
      gsap.from(el.querySelector(".timeline-line"), {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      // Entries stagger in
      el.querySelectorAll(".timeline-entry").forEach((entry, i) => {
        gsap.from(entry, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
            once: true,
          },
        });
      });

      // Education fades in
      gsap.from(el.querySelector(".education-section"), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: el.querySelector(".education-section"), start: "top 85%", once: true },
      });
    },
    []
  );

  const sectionRef = useScrollAnimation(animationCallback);

  return (
    <section id="experience" className="py-24 bg-bg-primary" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[4px] text-accent uppercase mb-2">My Journey</p>
          <h2 className="text-3xl md:text-4xl font-extrabold">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="timeline-line absolute left-1.5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent/10" />

          {experience.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Education */}
        <div className="education-section mt-16">
          <h3 className="text-center text-lg font-bold text-text-primary mb-6">Education</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="bg-accent/[0.06] border border-accent/15 rounded-lg px-6 py-4 text-center flex-1"
              >
                <p className="text-sm font-semibold text-text-primary">{edu.degree}</p>
                <p className="text-xs text-accent mt-1">{edu.school}</p>
                <p className="text-xs text-text-muted mt-1">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/TimelineEntry.tsx src/components/sections/Experience.tsx
git commit -m "feat: add Experience section with animated timeline and education"
```

---

## Task 11: Contact Section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create `src/components/sections/Contact.tsx`**

```typescript
"use client";

import { useState, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimations";
import type { gsap as GsapType } from "gsap";

export function Contact() {
  const [showToast, setShowToast] = useState(false);

  const animationCallback = useCallback(
    (el: HTMLElement, gsap: typeof GsapType) => {
      gsap.from(el.querySelectorAll(".contact-info > *"), {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      gsap.from(el.querySelectorAll(".contact-form > *"), {
        x: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
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
      {/* Blob background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[4px] text-accent uppercase mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-extrabold">Let&apos;s Work Together</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact info */}
          <div className="contact-info flex-1 space-y-5">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-text-muted">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-text-primary hover:text-accent transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-text-primary">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="contact-form flex-1 space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-accent/[0.06] border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-accent/[0.06] border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <textarea
              placeholder="Message..."
              rows={4}
              className="w-full bg-accent/[0.06] border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white text-sm font-semibold tracking-widest rounded-lg hover:bg-accent-light transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-accent/10">
          <div className="flex justify-center gap-4 mb-4">
            {[
              { label: "Behance", href: "https://behance.net/minhle123" },
              { label: "Email", href: "mailto:quangminh14320@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-text-muted hover:text-accent transition-colors tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-text-muted">&copy; 2025 Quang Minh. Designed with creativity.</p>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bg-tertiary border border-accent/30 text-text-primary px-6 py-3 rounded-lg shadow-lg z-[200] text-sm">
          Coming soon! Please{" "}
          <a href="mailto:quangminh14320@gmail.com" className="text-accent underline">
            email me directly
          </a>
          .
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: add Contact section with form, toast message, footer"
```

---

## Task 12: Assemble Page & Final Build

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update `src/app/page.tsx` to compose all sections**

```typescript
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Portfolio } from "@/components/sections/Portfolio";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Run dev server and verify all sections render**

```bash
npm run dev
```

Open http://localhost:3000 in the browser. Verify:
- Navbar visible, links scroll to sections
- Hero: blob renders, text animation plays
- About: photo placeholder, stat counters animate on scroll
- Skills: cards with progress bars animate on scroll
- Portfolio: filter tabs work, cards have tilt hover, modal opens
- Experience: timeline visible with alternating entries
- Contact: form visible, toast shows on submit

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds with static export to `out/` directory.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble all sections into single page, complete portfolio"
```

---

## Task 13: Blob Scroll Behavior (GSAP ScrollTrigger)

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Add GSAP ScrollTrigger to control blob position/scale on scroll**

Update `src/components/sections/Hero.tsx` — add to the `useEffect` after the timeline:

```typescript
// Blob scroll behavior: shrink and move to corner after hero
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
  opacity: 0.4,
});

// Blob re-expands when Contact section is reached
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
  opacity: 0.6,
});
```

Also wrap the blob area in the Hero JSX with className `blob-container`:

```typescript
<div className="blob-container absolute right-0 top-0 w-full h-full md:w-[55%]">
```

- [ ] **Step 2: Verify scroll behavior works**

```bash
npm run dev
```

Scroll past hero — blob should shrink and move to top-right.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add blob scroll-shrink behavior via GSAP ScrollTrigger"
```

---

## Summary

| Task | Description | Dependencies |
|------|-------------|--------------|
| 1 | Project scaffolding & config | None |
| 2 | Data layer (skills, projects, experience) | Task 1 |
| 3 | GSAP setup & animation hooks | Task 1 |
| 4 | Three.js morphing blob | Task 3 |
| 5 | Navbar component | Task 3 |
| 6 | Hero section | Tasks 4, 5 |
| 7 | About section | Task 3 |
| 8 | Skills section | Tasks 2, 3 |
| 9 | Portfolio section | Tasks 2, 3 |
| 10 | Experience section | Tasks 2, 3 |
| 11 | Contact section | Task 3 |
| 12 | Assemble page & final build | Tasks 5-11 |
| 13 | Blob scroll behavior | Tasks 6, 12 |

**Parallel execution possible:** Tasks 2 & 3 can run in parallel. Tasks 7-11 can all run in parallel after Task 3.
