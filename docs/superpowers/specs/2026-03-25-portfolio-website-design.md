# Quang Minh — Designer Portfolio Website

## Overview

A single-page portfolio website for Quang Minh, a full-stack graphic designer based in Ho Chi Minh City. The site showcases visual design work through a bold, immersive experience with cinematic animations and a signature 3D morphing blob motif.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **3D:** Three.js (via @react-three/fiber + @react-three/drei)
- **Animation:** GSAP + ScrollTrigger
- **Styling:** Tailwind CSS
- **Deployment:** Static export (SSG)

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0a0a1a` | Page background, darkest |
| `bg-secondary` | `#0d1b2a` | Section alternating background |
| `bg-tertiary` | `#111827` | Card/element backgrounds |
| `accent` | `#4a90d9` | Primary accent, links, highlights |
| `accent-light` | `#6ab0ff` | Gradient endpoints, hover states |
| `text-primary` | `#e0e0e0` | Headings, main text |
| `text-secondary` | `#8899aa` | Body text, descriptions |
| `text-muted` | `#556677` | Subtle labels, metadata |

### Typography

- **Headings:** Inter or Poppins — weight 800/900, tight letter-spacing
- **Body:** Same family — weight 400, relaxed line-height
- **Labels:** Uppercase, letter-spacing 2-4px, small size
- **Name accent:** "Quang" in `text-primary`, "Minh" in `accent`

### Responsive Breakpoints

- **Mobile:** < 768px — single column, blob simplified (fewer vertices), nav becomes hamburger
- **Tablet:** 768-1024px — adapted grid, smaller blob
- **Desktop:** > 1024px — full experience

## Page Structure

### Navigation (Fixed)

- Fixed top bar, transparent initially, gains backdrop-blur on scroll
- Logo: "QM" with Q in accent color
- Links: ABOUT | SKILLS | WORK | EXPERIENCE | CONTACT
- Mobile: hamburger menu with full-screen overlay
- Smooth scroll to sections via GSAP

### Section 1: Hero (100vh)

**Layout:**
- Full viewport dark gradient background (`#0a0a1a` → `#0d1b2a` → `#1b2838`)
- Three.js morphing blob on the right side (~40% of viewport)
- Left side: intro text, name, title, tagline, CTA buttons
- Bottom center: scroll indicator (mouse icon with pulse animation)

**Three.js Blob:**
- Icosahedron geometry with high subdivision, displaced by simplex noise
- Material: MeshStandardMaterial with metallic blue gradient (accent colors)
- Mouse interaction: deformation shifts subtly toward cursor position
- On scroll: blob shrinks and repositions to top-right corner, becomes ambient element for remaining sections
- Mobile: reduced vertex count, no mouse interaction, smaller size

**Content:**
- "Hello, I'm" — small uppercase accent label
- "Quang Minh" — large bold, split color (gray/blue)
- "Graphic Designer (Full-Stack)" — subtitle
- Accent line divider (60px)
- Brief tagline
- Two CTA buttons: "VIEW WORK" (filled) + "CONTACT" (outlined)

**Load Animation Sequence:**
| Time | Element | Animation |
|------|---------|-----------|
| 0.0s | Blob | Fade in from black, start morphing |
| 0.5s | Nav bar | Slide down from top |
| 0.8s | "Hello, I'm" | Letter-by-letter stagger fade |
| 1.2s | "Quang Minh" | Slide in from left, staggered |
| 1.6s | Title + line | Wipe in |
| 2.0s | Tagline + CTAs | Fade up |
| 2.5s | Scroll indicator | Pulse in |

### Section 2: About

**Layout:**
- Two-column: photo (left) + bio content (right)
- Photo with rounded corners, parallax effect on scroll
- Social icons below photo (Behance, Email, Phone)

**Content:**
- Section label: "ABOUT ME"
- Heading: "Creative Designer Based in Ho Chi Minh City"
- Bio paragraph summarizing experience
- Three stat cards in a row:
  - "3+" Years Experience
  - "50+" Projects
  - "5K+" Views/Month

**Animations:**
- Photo slides in from left with parallax depth
- Stat numbers count up from 0 (GSAP)
- Bio text fades in
- Cards stagger reveal from bottom

### Section 3: Skills

**Layout:**
- Centered heading
- 3x2 grid of skill cards
- Language badge below

**Skill Cards (each):**
- Software icon (styled abbreviation: Ai, Ps, Pr, Ae, F, Dn)
- Software name
- Animated progress bar with percentage
- Cards have subtle border and glass-morphism effect

**Data:**
| Software | Level |
|----------|-------|
| Illustrator | 80% |
| Photoshop | 80% |
| Premiere | 50% |
| After Effects | 40% |
| Figma | 35% |
| Dimension | 30% |

**Language:** English — Intermediate

**Animations:**
- Cards stagger in from bottom with scale
- Progress bars animate width from 0 to target on scroll-enter
- Icons have subtle bounce on appear

### Section 4: Portfolio

**Layout:**
- Centered heading
- Filter tabs: ALL | BRANDING | PRINT | SOCIAL
- Masonry-style grid (3 columns desktop, 2 tablet, 1 mobile)
- First item spans 2 rows for visual interest

**Project Cards:**
- Gradient placeholder backgrounds (will be replaced with real project images)
- Project title + client name overlay at bottom
- Hover: image scales up 1.05x with 3D tilt effect (CSS perspective transform)
- Click: opens a detail overlay/modal with more project info

**Categories from CV:**
- Brand Identity (Anh Duong Xanh)
- E-commerce Posts
- POSM Design (PNP Global)
- Print Materials (Catalogues & Brochures)
- Logo Design (Freelance)

**Animations:**
- Filter tabs slide in from top
- Grid items stagger reveal with scale-up
- Filter switching: GSAP layout animation (items shuffle/reflow)

### Section 5: Experience

**Layout:**
- Centered heading
- Vertical timeline, centered line
- Entries alternate left/right

**Timeline Entries:**

1. **Freelancer** — Graphic Designer (2022 – Present)
   - Logos, branding materials, mockups for international clients
   - 5000+ views/month, YouTube thumbnails & video scripts

2. **Anh Duong Xanh** — Graphic Designer (07/2024 – 12/2024)
   - POSM, e-commerce posts, brand identity, image retouching
   - E-commerce video & reels

3. **PNP Global Supply** — Fullstack Designer (08/2023 – 05/2024)
   - Brand identity, websites, printed materials
   - 2-3 videos/week, photography

4. **TDC Design Club** — Leader (08/2021 – 09/2022)
   - Managed team of 3 designers
   - Grew fanpage to 10,000+ followers in 6 months

**Education (sub-section):**
- Business Administration — Thu Duc College of Technology (2020-2022)
- IT Certificate Advanced — VNUHCM-US (2020-2022)

**Animations:**
- Timeline vertical line draws downward on scroll
- Entries slide in alternating from left/right
- Dot indicators pulse on scroll-enter
- Education fades in below timeline

### Section 6: Contact

**Layout:**
- Blob returns and expands as background element
- Two-column: contact info (left) + contact form (right)
- Footer at bottom

**Contact Info:**
- Phone: +84 79 475 9487
- Email: quangminh14320@gmail.com
- Location: Dist.9, Ho Chi Minh City
- Behance link: behance.net/minhle123

**Contact Form:**
- Fields: Name, Email, Message
- Submit button: "SEND MESSAGE"
- Form is visual only (static site) — can integrate with Formspree/EmailJS later

**Footer:**
- Copyright line
- Social links

**Animations:**
- Blob scales up from corner to fill background area
- Contact cards stagger fade-in from left
- Form elements stagger fade-in from right
- Submit button has hover pulse

## Three.js Blob — Technical Spec

### Geometry
- `IcosahedronGeometry(1, 64)` for desktop, `(1, 32)` for mobile
- Vertices displaced by 3D simplex noise, animated over time
- Noise parameters: frequency 0.4, amplitude 0.3, speed 0.2

### Material
- `MeshStandardMaterial` with:
  - `metalness: 0.8`
  - `roughness: 0.2`
  - `color: #4a90d9`
  - `emissive: #1a3a5c` (subtle glow)
- Environment map for reflections (HDRI or simple gradient)

### Mouse Interaction
- Track normalized mouse position
- Shift noise offset slightly toward cursor (lerped, ~0.1 factor)
- Creates organic "reaching toward" effect

### Scroll Behavior
- Hero (0-100vh): Blob centered-right, full size
- Scroll past hero: Blob shrinks to ~30% size, moves to top-right corner
- Fixed position for sections 2-5
- Contact section: Blob scales back up, moves to center-right
- All transitions via GSAP ScrollTrigger

### Performance
- `requestAnimationFrame` loop for noise animation
- Reduce detail on mobile (fewer vertices, no mouse tracking)
- Use `React.memo` and `useMemo` for Three.js objects
- Lazy-load Three.js canvas (not blocking initial paint)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single page composing all sections
│   └── globals.css         # Tailwind imports + custom styles
├── components/
│   ├── three/
│   │   ├── BlobScene.tsx   # R3F Canvas + blob
│   │   └── MorphBlob.tsx   # Blob geometry + animation logic
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── SkillCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── TimelineEntry.tsx
│   │   └── ScrollIndicator.tsx
│   └── animations/
│       └── useScrollAnimations.ts  # GSAP ScrollTrigger hooks
├── data/
│   ├── skills.ts           # Skills data array
│   ├── projects.ts         # Portfolio items
│   └── experience.ts       # Timeline entries
├── hooks/
│   └── useMousePosition.ts # Normalized mouse tracking
└── lib/
    └── gsap.ts             # GSAP plugin registration
```

## Dependencies

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "three": "^0.170",
    "@react-three/fiber": "^9",
    "@react-three/drei": "^10",
    "gsap": "^3.12",
    "simplex-noise": "^4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/react": "^19",
    "@types/three": "^0.170",
    "tailwindcss": "^4",
    "eslint": "^9"
  }
}
```

## Performance Considerations

- **Lazy load Three.js:** Use `next/dynamic` with `ssr: false` for the blob canvas
- **Image optimization:** Use `next/image` for portfolio items and photo
- **Font loading:** Preload primary font, use `font-display: swap`
- **Mobile:** Simplified blob (fewer vertices), no mouse tracking, reduced animation complexity
- **Scroll performance:** GSAP ScrollTrigger with `will-change` hints, batch animations
- **Bundle splitting:** Three.js in its own chunk via dynamic import

## SEO & Metadata

- Title: "Quang Minh — Graphic Designer Portfolio"
- Description: "Full-stack graphic designer based in Ho Chi Minh City. Brand identity, print materials, e-commerce design, and video production."
- Open Graph image: screenshot of hero section
- Structured data: Person schema with contact info
