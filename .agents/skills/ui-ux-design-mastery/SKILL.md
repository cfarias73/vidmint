---
name: ui-ux-design-mastery
description: Elite UI/UX design system and landing page architecture guide. Use when designing world-class web applications, landing pages, glassmorphic interfaces, interactive showcases, and high-conversion SaaS hero sections inspired by Higgsfield, Runway, Linear, and Apple.
---

# UI/UX Design Mastery & World-Class Landing Page Blueprint

This skill provides the architectural principles, visual design tokens, and interactive layout patterns required to build world-class, award-worthy AI SaaS interfaces and landing pages.

---

## 🎨 1. Visual Design Philosophy & Aesthetics

To stand alongside top-tier AI applications (_Higgsfield_, _Runway_, _Google Flow_, _Linear_, _Midjourney_):

### 1.1 Palette & Lighting (OLED Obsidian & Neon Accents)

- **Base Canvas:** Deep obsidian darks (`#08090d`, `#090a0f`, `#0d0f14`), never washed-out flat greys.
- **Ambient Lighting:** Multi-stop radial gradients centered behind hero elements (`rgba(0, 223, 229, 0.12)`, `rgba(124, 58, 237, 0.08)`).
- **Accents:** Electric Mint/Cyan (`#00dfe5`), Aurora Purple (`#7c3aed`), Cyber Teal (`#06b6d4`), and Warm Amber for Turbo/Speed actions.
- **Glassmorphism:** Frosted multi-layer backdrops (`backdrop-blur-24px bg-zinc-950/70 border border-white/[0.08]`) with subtle top-edge rim reflections (`bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent`).

### 1.2 Typography Hierarchy

- **Display Headlines:** Large, high-contrast gradient typography (`bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent`) with tight tracking (`tracking-tight` or `tracking-tighter`).
- **Pill Badges:** Translucent status badges (`bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_12px_rgba(0,223,229,0.15)]`).
- **Body & Subtitles:** Clean, balanced text in `text-zinc-400` with comfortable line height (`leading-relaxed`) and constrained width (`max-w-2xl text-pretty`).

---

## 🏗️ 2. World-Class Landing Page Architecture

A high-converting, memorable landing page for a generative AI cinema platform must include:

### 1. **Cinematic Hero Section**

- **Floating Studio Badge:** `✨ Vidmint 2.0 • The Generative Cinema Engine`
- **Punchy Hero Headline:** "Turn Scripts into Complete Cinematic Films in Minutes"
- **Subheadline:** "Consistent characters, synchronized audio, multi-shot sequences, and studio-grade direction. No prompt wrestling required."
- **Interactive Live Creator / Quick Try Studio:** Embed the interactive creator right in the hero, accompanied by instant one-click prompt seeds.
- **Social Proof Strip:** "Over 1M+ scenes rendered • Trusted by indie filmmakers & creative directors worldwide".

### 2. **Interactive Video Showcase (Showreel)**

- Auto-playing loop preview of generated short films across genres (Cyberpunk, Anime, Vintage 35mm, Award-Season Drama, Docu).
- Interactive tabs letting visitors toggle between raw prompt, storyboard scenes, and final rendered 4K video.

### 3. **Bento Grid: Core Capabilities**

- **Card 1: Character Consistency:** Visual before-and-after showing one talent in 10 different camera angles & lighting conditions.
- **Card 2: Smart Storyboard Engine:** AI auto-splits screenplays into structured shot lists with camera motion schemas.
- **Card 3: Studio Voice & Foley Audio:** Synchronized dialogues, spatial sound effects, and emotional cinematic soundtrack.
- **Card 4: 4K Upscaling & Multi-Model Power:** Seamless integration of BytePlus, Fal, Kling, and Gemini.

### 4. **Interactive "How It Works" (3-Step Director Flow)**

1. **1. Write or Paste:** Input a one-liner or full screenplay. AI analyzes beats and suggests cinematic styles.
2. **2. Cast & Direct:** Pick talent, lock locations, choose camera movement and visual styling.
3. **3. Render & Iterate:** Generate scenes in parallel with instant previews and live scene re-takes.

### 5. **Comparison Matrix (Vidmint vs. Fragmented AI Tools)**

- Highlights why integrated sequence creation beats juggling 5 different single-shot AI tools.

### 6. **Pricing / Early Access CTA Section**

- Glowing glass cards with transparent pricing, credit allowances, and high-impact CTA button.

### 7. **Cinematic Footer**

- Rich navigation, social handles, status indicator, and copyright.

---

## ⚡ 3. Micro-Animations & Interactivity Checklist

- [x] **Hover Scale & Glow:** Subtle `hover:scale-[1.02]` or `hover:scale-[1.04]` with smooth `transition-all duration-200`.
- [x] **Shine Effect:** Moving reflection sweep on primary CTA buttons (`group-hover:translate-x-full`).
- [x] **Ambient Pulse:** Continuous soft breathing glow on aurora elements.
- [x] **Focus Ring Highlight:** `focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-950`.
