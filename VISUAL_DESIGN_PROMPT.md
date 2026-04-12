# Interview Coach — Visual Design Execution Brief

You are designing the visual experience for a world-class product landing page. Think Apple product launch pages — scroll-driven storytelling, cinematic reveals, dramatic typography, and animations that make people stop scrolling. This should feel like a $10B company built it.

---

## WHAT THIS PRODUCT IS

**Interview Coach** is a real-time AI coaching tool for enterprise sales professionals (AEs) interviewing for their next role. It runs as a desktop overlay during live interviews and surfaces the user's own prepared answers, deal stories, and metrics the moment a question is asked — in under 500 milliseconds.

**Core differentiator:** Speed. The three-tier engine (keyword matching at <100ms, semantic matching at <500ms, AI generation at 1-3 seconds) means the right answer card appears on screen while the interviewer is still talking. No cloud latency. Tiers 1 and 2 run locally.

**Target buyer:** Enterprise AEs interviewing at companies like Datadog, CrowdStrike, Snowflake. They carry $1M+ quotas, have complex deal stories, and lose sharpness in interviews because of recall failures — not lack of knowledge.

**Price:** $99/month. No tiers.

**Built by:** A 2x President's Club AE during a real job search. Used on real interviews. Not a hypothetical product.

---

## TECH STACK

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (with @theme tokens in index.css)
- **Framer Motion v12** (primary animation library — useScroll, useTransform, useInView, AnimatePresence, motion components)
- **Geist** variable font for headings, **Inter** for body
- No additional dependencies should be added

---

## DESIGN SYSTEM (from index.css @theme)

```css
/* Backgrounds */
--color-bg: #0B0D12;          /* deep navy-black */
--color-surface-1: #111318;
--color-surface-2: #191c22;
--color-surface-3: #21242c;

/* Text */
--color-text-primary: #F7F8FB;
--color-text-secondary: #C5CCD6;
--color-text-tertiary: #9CA5B2;

/* Accents */
--color-accent: #7c6aef;       /* purple — PRIMARY brand color */
--color-blue: #5b8def;
--color-teal: #4ecdc4;
--color-red-soft: #ef6b6b;
--color-green-soft: #5bbf72;

/* Borders */
--color-border: #262930;

/* Dim variants (low-opacity backgrounds for tags) */
accent-dim, blue-dim, teal-dim, red-dim, green-dim

/* Typography */
--font-heading: 'Geist', 'Inter', system-ui, sans-serif;
--font-sans: 'Inter', system-ui, sans-serif;
```

**Typography scale:**
- Hero h1: 38-72px responsive (tracking: -0.035em)
- Section h2: 28-42px responsive (tracking: -0.03em)
- Body: 15-17px (line-height: 1.7)
- Eyebrow labels: 11px uppercase, tracking: 0.25em, accent/60 opacity
- Small/tags: 9-12px

---

## EXISTING ANIMATION INFRASTRUCTURE

### ScrollAnimations.jsx (shared utilities already built)
- `ScrollReveal` — transforms opacity/y/scale/blur based on scroll progress
- `StickySection` — pins content while scroll progresses through tall container
- `ParallaxLayer` — depth-offset elements based on scroll
- `CountUp` — animated number counter (ease-out cubic, triggered on scroll-into-view)
- `GradientMesh` — animated background blobs that drift and scale
- `TextRevealByWord` — words reveal sequentially based on scroll progress, with highlight support
- `GlowButton` — CTA with animated gradient border (accent → blue → teal rotation)
- `TiltCard` — 3D perspective tilt following mouse (spring physics, max 4 degrees)
- `NoiseOverlay` — SVG fractal noise film grain texture (fixed, z-100, opacity 0.025)

### ConstellationCanvas.jsx (canvas particle system)
- 80 nodes with random drift (0.15 speed)
- Connection lines between nodes within 120px
- Horizontal sine-wave pulse that brightens connections
- Blue-accent color palette (rgba(100, 160, 255))
- Currently used in Hero background and Final CTA

### ElectricText.jsx (SVG text reveal)
- Sweeping vertical line travels left→right across text
- Clip path slides in from left (1.2s duration)
- Glow filter: feGaussianBlur + purple color matrix
- Drop shadow on sweeping line
- Triggered by useInView
- Currently used for "You Still Blanked" in hero and "Close It Like One." in final CTA

### CSS Keyframes (in index.css)
- `gradient-rotate` — background-position cycling for animated gradient borders
- `shimmer` — horizontal sweep for holographic card borders
- `scanline` — vertical sweep effect
- `glow-pulse` — box-shadow breathing (accent color)
- `float` — subtle vertical bob

---

## CURRENT PAGE SECTIONS (in order)

### 1. HERO (LandingHero.jsx + HeroDemo.jsx)
**Current state:** ConstellationCanvas background, ElectricText headline reveal, GlowButton CTA, micro-proof bar with staggered letter-spacing animation. Below: animated product demo showing live interview coaching (typing question → keyword highlight → prep card slides in with metrics). Demo has gradient border with glow-pulse, frosted glass chrome, "REC" indicator. Parallax exit on scroll (demo shrinks + blurs).

**Headline:** "You Prepped for 6 Hours. You Still Blanked on Your Biggest Deal."
**Sub:** "Interview Coach surfaces your stories, your metrics, and your proof points the moment a question lands — so your best answers show up before you start stalling."
**CTA:** "Start Your Free Practice Interview →"
**Proof bar:** "Built by a 2x President's Club AE | Used on Real Interviews | Runs Locally — No Lag"

**Demo cycles through 3 scenarios:**
1. "Walk me through your biggest competitive win." → Competitive Displacement card ($823K, 94 Days, 7 stakeholders)
2. "How do you approach a new territory?" → Territory Build card ($3.2M pipeline, 6 Months, 14 logos)
3. "Tell me about a deal you almost lost." → Save Deal card ($640K at risk, 22 Days recovery, Expanded)

### 2. PROBLEM STATEMENT (ProblemStatement.jsx)
**Current state:** 350vh sticky scroll section. Text reveals word-by-word as user scrolls. Key phrases glow in accent. Final line scales up with radial glow.

**Content (revealed progressively):**
- "You've run MEDDPICC on eight-figure pipelines. You've multi-threaded above your Champion into the C-suite. You can run a $500K discovery call with three competitive talk tracks loaded."
- "But when a VP of Sales says 'walk me through your biggest deal' — you reach for a number and it's **gone**. Was it **$3.2M** or **$2.8M**? Did the close cycle run 90 days or 120?"
- "You know the answer. You knew it this morning. But under pressure, with someone evaluating you instead of buying from you, the **recall breaks**."
- "That's the gap. Not knowledge. Not preparation. **Retrieval under pressure.**"
- "**Nobody built a tool for this. So one of us did.**" (scales up, accent glow)

### 3. VIDEO WALKTHROUGH (VideoWalkthrough.jsx)
**Current state:** Full-bleed video placeholder. Scales from 0.85→1.0 on scroll. Dual pulse rings on play button. Gradient border fades in. Duration badge "1:32". No actual video yet — placeholder only.

**Caption:** "Watch the founder walk through a live session — question to answer in under 500ms"

### 4. HOW IT WORKS (HowItWorks.jsx)
**Current state:** 400vh sticky scroll section. Left side: tier content transitions in/out as user scrolls. Right side (desktop): demo window that swaps between tier demos. Each tier has a large speed number, color-coded bar with glow, description.

**Headline:** "Your Best Answer. Before You Finish Hearing the Question."

**Tier 1 — Instant Recall (green: #5bbf72)**
- Speed: 100ms
- Demo: keyword badges ("territory", "pipeline", "competitive", "quota") pop in, then instant match card appears
- Description: Keyword triggers fire the moment a hiring manager says "territory" or "pipeline." Your card hits the screen before the question finishes.
- Detail: "No cloud. No round-trip. Local."

**Tier 2 — Semantic Match (purple: #7c6aef)**
- Speed: 500ms
- Demo: three different phrasings all mapping to "Territory Card"
- Description: Three ways of asking the same thing — the system matches intent and pulls your pre-built answer card with your exact numbers.
- Detail: "Runs locally. Zero latency."

**Tier 3 — AI Generation (blue: #5b8def)**
- Speed: 3s
- Demo: typing indicator with "Generating" dots, then response text fades in
- Description: For questions your cards don't cover, the AI builds a contextual answer from your resume and deal history.
- Detail: "Formatted by sales archetype."

### 5. PREP CARDS (PrepCards.jsx)
**Current state:** Tabbed card carousel with 3D perspective flip transitions and holographic shimmer border. Auto-rotates every 4.5s, pauses on hover. CountUp metrics. Keywords float up with stagger.

**Headline:** "Your Best Deal Stories. Indexed and Ready."
**Sub:** "Upload your deal docs. The system generates answer cards with your exact numbers and multiple wording variants. The right card surfaces no matter how the question is phrased."

**3 cards:**
1. **Competitive Win** — "Competitive Displacement — Acme Corp" ($823K, 94 Days, 7 stakeholders) Tags: biggest win, competitive deal, multi-stakeholder, champion strategy
2. **Territory Growth** — "Territory Build — Southeast Region" ($3.2M pipeline, 6 Months, 14 logos) Tags: territory planning, market strategy, greenfield, pipeline generation
3. **Leadership Story** — "Cross-Functional Initiative — CRM Migration" (4 teams, 32 reps, 94% adoption) Tags: leadership, cross-functional, initiative, change management

### 6. PRACTICE MODE (PracticeMode.jsx)
**Current state:** Split layout — text left, visual right. Orbital ring with interview round types rotating around center "AI Coach" element. Typing question bubble below.

**Headline:** "Practice Against the Questions Enterprise HMs Actually Ask."
**Body:** "The AI interviewer calibrates to your resume, your target role, and the specific round. The full coaching sidebar fires during practice."
**Emphasis:** "You're not practicing answers. You're building the reflexes to access them under pressure."

**Orbit categories:** Phone Screen, HM Round, VP Round, Panel, Cross-Func

### 7. WAR ROOM (WarRoom.jsx)
**Current state:** Dashboard mock with blur→clear reveal on scroll. Scan-line sweep effect. Staggered stakeholder avatar pops. Animated stage progress bars.

**Headline:** "Your Job Search Is a Pipeline. Run It Like One."
**Sub:** "Each opportunity gets a dedicated workspace: intel, stakeholder mapping, comp tracking, and per-round notes."

**3 mock positions:**
1. Datadog (Enterprise AE, $280K OTE, Stage 3, next: Apr 14 · 2:00 PM, 2 stakeholders)
2. CrowdStrike (Strategic AE, $310K OTE, Stage 4, next: Apr 16 · 10:30 AM, 3 stakeholders)
3. Snowflake (Commercial AE, $250K OTE, Stage 1, Pending, 1 stakeholder)

**6 pipeline stages:** Applied → Screen → HM Round → VP Round → Panel → Offer

### 8. FOUNDER CREDIBILITY (FounderCredibility.jsx)
**Current state:** CountUp stats (0→target), animated gradient border on quote card, staggered stat reveals.

**Headline:** "Built During a Real Job Search. Used on Real Interviews."
**Quote:** "I built Interview Coach because I needed it. I was in an active job search and I kept losing 10% of my sharpness to recall failures. I built the first version in a week. I used it on every interview after that. I got the offer I wanted. This isn't a product I imagined would be useful. It's the product I used."

**Stats:** 2x President's Club | 124% Quota Attainment | $1.5M Annual Targets | 125 hrs Build Time

### 9. COMPETITIVE POSITIONING (Competitive.jsx)
**Current state:** Animated strikethrough draws across "them" text, "us" text glows in sequentially. Column headers: "Generic Tools" vs "Interview Coach."

**Headline:** "Not Another AI Answer Generator."
**Sub:** "A VP of Sales can tell when someone is reading a generated response. Interview Coach doesn't write your answers. It organizes them — then puts the right one on screen at the right moment."

**6 contrast rows:**
- Generate answers from scratch → Surfaces YOUR answers
- Take 3–8 seconds → Delivers in under 500ms
- Same format for every question → Formats by sales archetype
- Treat every round the same → Adapts by round and company
- No concept of your pipeline → Manages your entire search
- Built by engineers for engineers → Built by a President's Club AE for closers

**Tagline:** "Your answers. Your numbers. Your stories. Faster than you could find them yourself."

### 10. PRICING (Pricing.jsx)
**Current state:** 3D mouse-tilt card, animated gradient border, CountUp on $99, sequential checkmark springs.

**Headline:** "Less Than One Hour of the OTE You're Interviewing For."
**Sub:** "If your next role pays $250K, that's $120/hour. One sharper interview is the difference between an offer and 'we went with someone else.'"

**Interview Coach — $99/month**
Everything. No tiers. No feature gating.
- Unlimited live coaching
- Unlimited practice sessions
- Unlimited active positions
- Full Prep Card system with AI generation
- Three-tier coaching engine
- War Room with stakeholder mapping
- Calendar integration & auto-join

**CTA:** "Start Your Free Practice Interview →"
**Micro:** "No credit card required. Cancel anytime."

### 11. FAQ (FAQ.jsx)
**Current state:** Accordion with AnimatePresence height animations.

**Headline:** "You're Thinking It. Here It Is."

**5 questions:**
1. Will this actually work during a live interview?
2. Won't it distract me or make me look worse?
3. Is this just another AI interview gimmick?
4. What if I don't have time to build Prep Cards?
5. I'm a strong interviewer. Why do I need this?

### 12. FINAL CTA (FinalCTA.jsx)
**Current state:** Full viewport, ConstellationCanvas background, ElectricText "Close It Like One." reveal, GlowButton, rising particles from bottom.

**Headline:** "Your Next Role Is a Six-Figure Deal. Close It Like One."
**Sub:** "Your stories. Your metrics. Your frameworks. On screen before you need them. Built by someone who's been in the chair."
**Primary CTA:** "Start Your Free Practice Interview →"
**Secondary:** "See How the Engine Works →"

### 13. FOOTER (LandingFooter.jsx)
Logo | Privacy Policy | Terms of Service | Contact
"Interview Coach — Real-Time Sales Interview Performance"

---

## WHAT I NEED FROM YOU

Take this existing page and make it visually world-class. The structure and copy are locked — focus on:

1. **Visual polish and refinement** — spacing, color balance, contrast ratios, visual hierarchy. Every pixel should feel intentional.

2. **Animation quality** — the scroll-driven animations need to feel buttery smooth. Timing curves, easing, stagger patterns. Study Apple's product pages for reference: the iPhone Pro page, the M-series chip reveals, the AirPods Pro page. Those scroll interactions feel inevitable, not performative.

3. **Product visualization** — the HeroDemo, Prep Cards, and War Room should feel like real product UI, not wireframe mockups. Add depth, polish, subtle data visualization where it helps.

4. **Cinematic moments** — identify the 3-4 moments in the scroll journey that should make someone stop and say "whoa." The ElectricText reveal, the speed comparison, the card surfacing — these should hit hard.

5. **Consistency** — ensure the visual language (border treatments, glow effects, opacity levels, gradient directions, spacing rhythm) is consistent across every section. No section should feel like it was designed separately.

6. **Performance** — animations must be GPU-accelerated where possible. No layout thrashing. Smooth 60fps on modern hardware.

7. **Responsive quality** — the page should feel equally premium on mobile. Scroll-driven animations should degrade gracefully (simpler transitions, no sticky sections on small screens if they feel janky).

Output complete, production-ready React component code using the existing tech stack (React, Tailwind v4 @theme tokens, Framer Motion). Maintain all existing file names and component structure. Do not change the copy or section order.
