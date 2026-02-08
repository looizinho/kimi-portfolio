# Luizinho Neto Portfolio - Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTA buttons | Custom glow effects, magnetic hover |
| Card | Project cards, Skill cards | Glassmorphism, 3D tilt |
| Badge | Tech stack badges | Gradient backgrounds |
| Tooltip | Tech orbit descriptions | Dark theme styling |
| Separator | Section dividers | Gradient line |

### Third-Party Registry Components
None required - custom implementations preferred for unique visual effects.

### Custom Components
| Component | Purpose | Location |
|-----------|---------|----------|
| FluidBackground | WebGL fluid simulation for Hero | `components/FluidBackground.tsx` |
| TiltCard | 3D tilt effect card | `components/TiltCard.tsx` |
| HorizontalScroll | Pinned horizontal scroll section | `components/HorizontalScroll.tsx` |
| TechOrbit | Orbiting tech stack visualization | `components/TechOrbit.tsx` |
| GlitchText | Text glitch effect on hover | `components/GlitchText.tsx` |
| MagneticButton | Button with magnetic cursor attraction | `components/MagneticButton.tsx` |
| TypewriterText | Typewriter animation effect | `components/TypewriterText.tsx` |
| ProjectCard | Project card with liquid distortion | `components/ProjectCard.tsx` |
| SkillCard | Skill card with glow effect | `components/SkillCard.tsx` |

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero Fluid Background | Three.js + React Three Fiber | Custom GLSL fragment shader with mouse interaction | High |
| Character Decode (Hero) | GSAP | SplitType + gsap.to with random characters | Medium |
| Text Glow Pulse | CSS | @keyframes animation on text-shadow | Low |
| 3D Card Tilt | Vanilla JS + CSS | Mouse position tracking + transform perspective | Medium |
| Cursor Glow Follow | Vanilla JS | Mouse tracking with CSS radial-gradient | Low |
| Horizontal Scroll | GSAP ScrollTrigger | pin: true, horizontal scroll scrub | High |
| RGB Shift on Scroll | GSAP ScrollTrigger | Scroll velocity-based chromatic aberration | Medium |
| Liquid Image Distortion | Three.js | Displacement shader on image hover | High |
| Tech Orbit Rotation | CSS + GSAP | CSS animation for orbit, GSAP for entrance | Medium |
| Connection Lines Pulse | SVG + CSS | SVG stroke-dasharray animation | Low |
| Typewriter Effect | GSAP | gsap.to with width animation and steps | Low |
| Glitch Text Effect | CSS | @keyframes with clip-path and transform | Low |
| Magnetic Button | Vanilla JS | Mouse position lerp towards cursor | Medium |
| Scroll Parallax | GSAP ScrollTrigger | Different scroll speeds per layer | Medium |
| Skill Card Flip Reveal | GSAP ScrollTrigger | rotateX animation with stagger | Medium |
| Smooth Scroll | Lenis | Integration with GSAP ScrollTrigger | Medium |

## Animation Library Choices

### Primary: GSAP (GreenSock)
**Rationale**: Industry-standard for complex scroll animations, precise timeline control, excellent performance.
- **Plugins**: ScrollTrigger, SplitText (or SplitType alternative)
- **Use Cases**: 
  - Horizontal scroll pinning
  - Character decode animation
  - Scroll-triggered reveals
  - Typewriter effects

### Secondary: Three.js + React Three Fiber
**Rationale**: Required for WebGL fluid simulation and image distortion effects.
- **Add-ons**: @react-three/drei for helpers
- **Use Cases**:
  - Hero fluid background
  - Project image liquid distortion
  - 3D tech orbit visualization

### Tertiary: Lenis
**Rationale**: Essential for the "premium" smooth scroll feel.
- **Integration**: Must sync with GSAP ScrollTrigger
- **Use Cases**:
  - Global smooth scrolling
  - Scroll velocity detection

### CSS Animations
**Rationale**: Lightweight for simple, continuous effects.
- **Use Cases**:
  - Text glow pulse
  - Glitch effects
  - Orbit rotation
  - Connection line pulses

## Project File Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── separator.tsx
│   │   ├── FluidBackground.tsx    # WebGL fluid simulation
│   │   ├── TiltCard.tsx           # 3D tilt effect wrapper
│   │   ├── HorizontalScroll.tsx   # Pinned horizontal scroll
│   │   ├── TechOrbit.tsx          # Orbiting tech stack
│   │   ├── GlitchText.tsx         # Glitch effect component
│   │   ├── MagneticButton.tsx     # Magnetic cursor button
│   │   ├── TypewriterText.tsx     # Typewriter animation
│   │   ├── ProjectCard.tsx        # Project card with effects
│   │   ├── SkillCard.tsx          # Skill card with glow
│   │   └── Navigation.tsx         # Site navigation
│   ├── sections/
│   │   ├── Hero.tsx               # Hero section
│   │   ├── About.tsx              # Skills/About section
│   │   ├── Projects.tsx           # Projects gallery
│   │   ├── TechStack.tsx          # Tech orbit section
│   │   └── Contact.tsx            # Contact/Footer section
│   ├── hooks/
│   │   ├── useMousePosition.ts    # Mouse tracking hook
│   │   ├── useSmoothScroll.ts     # Lenis integration
│   │   ├── useScrollVelocity.ts   # Scroll speed detection
│   │   └── useInView.ts           # Intersection observer
│   ├── lib/
│   │   ├── utils.ts               # Utility functions
│   │   ├── animations.ts          # GSAP animation presets
│   │   └── shaders.ts             # GLSL shader code
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── public/
│   └── images/                    # Project images
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── index.html
```

## Dependencies

### Core
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.0"
}
```

### Animation Libraries
```json
{
  "gsap": "^3.12.5",
  "@gsap/react": "^2.1.0",
  "lenis": "^1.1.0",
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.92.0",
  "split-type": "^0.3.4"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0",
  "lucide-react": "^0.303.0"
}
```

## Installation Commands

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Luizinho Neto Portfolio"

# Install animation libraries
npm install gsap @gsap/react lenis three @react-three/fiber @react-three/drei split-type

# Install additional dependencies
npm install lucide-react

# shadcn components (already included in init)
# npx shadcn add button card badge tooltip separator
```

## Performance Optimization Strategy

### WebGL
- Single canvas context for entire page (fixed position)
- Dispose textures when sections leave viewport
- Use `useFrame` with delta time for consistent animation
- Mobile fallback: disable fluid simulation, use CSS gradient

### GSAP
- Use `will-change` on animated elements
- Kill ScrollTriggers on component unmount
- Use `refreshPriority` for layout shifts
- Implement `matchMedia` for responsive animations

### Images
- Lazy load project images
- Use WebP format with fallbacks
- Implement blur-up placeholder

### General
- Code splitting for heavy components
- Preload critical fonts
- Use CSS transforms instead of layout properties

## Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 640px | Disable WebGL, simplify animations, stack layout |
| Tablet | 640-1024px | Reduce orbit size, simplify tilt |
| Desktop | > 1024px | Full experience |

## Accessibility

- `prefers-reduced-motion`: Disable smooth scroll, orbit animation, and parallax
- Keyboard navigation: Ensure all interactive elements are focusable
- Color contrast: Maintain WCAG 4.5:1 ratio
- Screen readers: Proper ARIA labels on interactive components
