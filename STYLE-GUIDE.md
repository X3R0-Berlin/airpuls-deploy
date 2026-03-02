# AIRIMPULSE Style Guide

> Design System & Farbpalette basierend auf dem AIRIMPULSE Firmenlogo.
> Letzte Aktualisierung: 2. März 2026

---

## 1. Farbpalette

Die Farben wurden aus den Gradienten des AIRIMPULSE-Logos abgeleitet.

### 1.1 Primärfarben (aus Logo-Gradienten)

| Rolle | Farbe | Hex | Verwendung |
|-------|-------|-----|------------|
| **Pine Green** | ![#357868](https://placehold.co/20x20/357868/357868) | `#357868` | Primärer Akzent, CTAs, Links, Fokus-Ringe |
| **Accent Glow** | ![#3d8d7a](https://placehold.co/20x20/3d8d7a/3d8d7a) | `#3d8d7a` | Hover-Zustand des Akzents |
| **Impulse Orange** | ![#E25A43](https://placehold.co/20x20/E25A43/E25A43) | `#E25A43` | Sekundärer Akzent, Preis-Highlights, Badges |
| **Mint Breeze** | ![#6ABFC2](https://placehold.co/20x20/6ABFC2/6ABFC2) | `#6ABFC2` | Tertiärer Akzent, Diagramme, Dekorativ |
| **Deep Rust** | ![#AD584D](https://placehold.co/20x20/AD584D/AD584D) | `#AD584D` | Destruktiv/Warnung, "Coming Soon"-Badges |

### 1.2 Neutrale Farben

| Rolle | Farbe | Hex | Verwendung |
|-------|-------|-----|------------|
| **Charcoal Dark** | ![#222222](https://placehold.co/20x20/222222/222222) | `#222222` | Primärer Text, Überschriften |
| **Muted Grey** | ![#6b7280](https://placehold.co/20x20/6b7280/6b7280) | `#6b7280` | Sekundärtext, Beschreibungen |
| **Off-White** | ![#F8F9FA](https://placehold.co/20x20/F8F9FA/F8F9FA) | `#F8F9FA` | Seitenhintergrund |
| **Cream** | ![#EEF0F2](https://placehold.co/20x20/EEF0F2/EEF0F2) | `#EEF0F2` | Sekundärhintergrund, Hover-States |
| **Pure White** | ![#FFFFFF](https://placehold.co/20x20/FFFFFF/FFFFFF) | `#FFFFFF` | Cards, Formulare, Popover |
| **Dark BG** | ![#121416](https://placehold.co/20x20/121416/121416) | `#121416` | Nur Footer (dunkler Anker) |

### 1.3 Borders & Schatten

| Rolle | Wert | Verwendung |
|-------|------|------------|
| **Standard Border** | `rgba(0,0,0,0.08)` | Card-Rahmen, Inputs, Trennlinien |
| **Starker Border** | `rgba(0,0,0,0.15)` | Hover-Borders, betonte Trennlinien |
| **Footer Border** | `rgba(255,255,255,0.10)` | Nur im dunklen Footer |

### 1.4 Glow-Effekte (für MagicUI-Karten)

| Variante | Wert | Verwendung |
|----------|------|------------|
| **Accent Glow** | `rgba(53,120,104,0.08)` | Features, Stats, Hintergrundstrahlen |
| **Accent Glow Medium** | `rgba(53,120,104,0.10)` | Testimonials |
| **Accent Glow Strong** | `rgba(53,120,104,0.12)` | Product Finder |
| **Gold Glow** | `rgba(226,90,67,0.12)` | Hero-Sektion, Akzent-Strahlen |

---

## 2. Typografie

### 2.1 Schriftfamilien

| Familie | Name | Gewichte | Verwendung |
|---------|------|----------|------------|
| **Display/Serif** | Cormorant Garamond | 300, 400, 500, 600 | Überschriften, Preise, Zahlen |
| **Body/Sans** | DM Sans | 300–700 | Fließtext, Buttons, Labels |
| **Mono** | Geist Mono | 400 | Code (falls benötigt) |

### 2.2 Schriftgrößen-Skala (responsive mit clamp)

| Token | Wert | Verwendung |
|-------|------|------------|
| **Hero H1** | `clamp(2.8rem, 5vw, 4.5rem)` | Hero-Überschrift |
| **Section H2** | `clamp(2rem, 4vw, 3.2rem)` | Sektionsüberschriften |
| **Medium H2** | `clamp(2rem, 4vw, 3rem)` | Untergeordnete Sektionen |
| **Detail H2** | `clamp(1.8rem, 3vw, 2.8rem)` | Detail-Sektionen |
| **Stats Number** | `clamp(2.5rem, 5vw, 3.5rem)` | Statistik-Zahlen |
| **Card H3** | `1.25rem` (text-xl) | Karten-Überschriften |
| **Body Large** | `1.05rem` | Hervorgehobener Fließtext |
| **Body Standard** | `0.9rem` | Standard-Fließtext |
| **Body Small** | `0.85rem` | Buttons, Labels |
| **Caption** | `0.75rem` | Fußnoten, Badges |
| **Micro** | `0.7rem` | Tracking-Labels, Kategorie-Tags |

### 2.3 Gewichte & Stile

| Kontext | Gewicht | Familie |
|---------|---------|---------|
| Überschriften | `font-light` (300) | Serif |
| Karten-Titel | `font-normal` (400) | Serif |
| Fließtext | `font-normal` (400) | Sans |
| Labels | `font-medium` (500) | Sans |
| Buttons/CTAs | `font-semibold` (600) | Sans |
| Badges | `font-bold` (700) | Sans |

### 2.4 Zeilenhöhen

| Kontext | Wert |
|---------|------|
| Tight Headings | `1.1` – `1.2` |
| Body Text | `1.6` – `1.8` |
| Standard | `1.7` |

### 2.5 Buchstabenabstand (Tracking)

| Kontext | Wert |
|---------|------|
| Uppercase-Labels | `0.25em` |
| Small Caps | `0.2em` |
| Button-Labels | `0.15em` |
| Standard | `0.04em` – `0.06em` |

---

## 3. Spacing & Layout

### 3.1 Container

| Element | Max-Width |
|---------|-----------|
| **Standard** | `1280px` |
| **Schmal (Legal/Forms)** | `800px` |

### 3.2 Responsive Padding (clamp-basiert)

| Kontext | Wert |
|---------|------|
| Container-Seiten | `clamp(1.5rem, 4vw, 4rem)` |
| Sektion vertikal (groß) | `clamp(5rem, 10vw, 10rem)` |
| Sektion vertikal (mittel) | `clamp(4rem, 8vw, 8rem)` |
| Sektion vertikal (klein) | `clamp(4rem, 8vw, 6rem)` |
| Card-Padding | `clamp(2rem, 3vw, 3rem)` |

---

## 4. Komponenten

### 4.1 Buttons

| Variante | Hintergrund | Text | Border | Radius |
|----------|-------------|------|--------|--------|
| **Primary CTA** | `#357868` (Accent) | `#FFFFFF` | — | `rounded-full` |
| **Secondary** | transparent | `#6b7280` | `rgba(0,0,0,0.08)` | `rounded-full` |
| **Secondary Hover** | transparent | `#222222` | `rgba(0,0,0,0.15)` | `rounded-full` |
| **Destructive** | `#AD584D` | `#FFFFFF` | — | `rounded-full` |

### 4.2 Cards

| Eigenschaft | Wert |
|-------------|------|
| Hintergrund | `#FFFFFF` |
| Border | `rgba(0,0,0,0.08)` |
| Radius | `rounded-2xl` (24px) |
| MagicCard Glow | `rgba(53,120,104,0.08)` |

### 4.3 Inputs/Formulare

| Eigenschaft | Wert |
|-------------|------|
| Hintergrund | transparent |
| Border | `rgba(0,0,0,0.08)` |
| Fokus-Border | `#357868` |
| Fokus-Ring | `rgba(53,120,104,0.30)` |
| Radius | `rounded-full` (Inputs), `rounded-xl` (Textarea) |
| Text | `#222222` |
| Placeholder | `#6b7280` at 50% opacity |

### 4.4 Navbar

| Eigenschaft | Wert |
|-------------|------|
| Hintergrund (initial) | `bg-white/60` + `backdrop-blur-[60px]` |
| Hintergrund (scrolled) | `bg-white/90` + `backdrop-blur-[60px]` |
| Logo | Monochrom-Variante (`airimpulse-logo-mono.svg`) |
| Text | `#222222` |
| Hover | `#357868` (Accent) |

### 4.5 Footer

| Eigenschaft | Wert |
|-------------|------|
| Hintergrund | `#121416` (Dark BG) |
| Logo | Inverse-Variante (`airimpulse-logo.svg`) |
| Text | `#8a9098` (heller Grauton für dunklen Hintergrund) |
| Hover-Text | `#FFFFFF` |
| Border | `rgba(255,255,255,0.10)` |

### 4.6 Badges

| Variante | Hintergrund | Text |
|----------|-------------|------|
| **Coming Soon** | `#AD584D` | `#FFFFFF` |
| **Accent Badge** | `#357868` | `#FFFFFF` |
| **Bestseller** | `#E25A43` | `#FFFFFF` |

---

## 5. Animationen & Effekte

### 5.1 MagicUI-Komponenten

- **ShimmerButton**: Akzent-Hintergrund + `rgba(0,0,0,0.06)` Shimmer
- **MagicCard**: Glow-Gradient bei Hover
- **BlurFade**: Einblende-Animation mit Blur
- **Marquee**: Horizontales Laufband
- **NumberTicker**: Animierte Zahlenwerte
- **Particles**: 30 Partikel in `#357868`, nur ab 768px Viewport

### 5.2 Scroll-Fortschrittsanzeige

- Gradient: `#357868` → `#6ABFC2` → `#E25A43` (Accent → Mint → Orange)
- Höhe: 1px, fixiert am oberen Rand

### 5.3 Ken-Burns-Effekt

- Dauer: 20s, ease-in-out, infinite alternate
- Scale: 1.0 → 1.08

### 5.4 Glasmorphismus

- Navbar/Cookie-Banner: `backdrop-blur-[40px]` bis `[60px]`, `backdrop-saturate-150`

---

## 6. Logo-Varianten

| Variante | Datei | Verwendung |
|----------|-------|------------|
| **Inverse** | `airimpulse-logo.svg` | Dunkler Hintergrund (Footer) |
| **Monochrom** | `airimpulse-logo-mono.svg` | Heller Hintergrund (Navbar) |
| **Icon** | `airimpulse-icon.svg` | Favicon, App-Icon, Social Media |

---

## 7. Responsive Breakpoints

| Breakpoint | Pixel | Verwendung |
|------------|-------|------------|
| **Default** | 0px+ | Mobile-first Basis |
| **sm** | 640px+ | Kleine Tablets |
| **md** | 768px+ | Tablets, Particles aktiviert |
| **lg** | 1024px+ | Desktop |

---

## 8. Barrierefreiheit

- `prefers-reduced-motion`: Alle Animationen auf 0.01ms reduziert
- Mindest-Touch-Target: 44x44px
- Hover-Effekte nur auf `@media (hover: hover)` Geräten
- Semantische HTML-Struktur (Heading-Hierarchie, Landmarks)
- Fokus-Ringe: `#357868` mit 3px Ring
