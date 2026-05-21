---
name: Premium Soft-Tech Editorial
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434654'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#1e56cb'
  primary: '#1a53c8'
  on-primary: '#ffffff'
  primary-container: '#3e6ee3'
  on-primary-container: '#fefcff'
  inverse-primary: '#b3c5ff'
  secondary: '#515f78'
  on-secondary: '#ffffff'
  secondary-container: '#d1e0fe'
  on-secondary-container: '#55637c'
  tertiary: '#914805'
  on-tertiary: '#ffffff'
  tertiary-container: '#b06020'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00174a'
  on-primary-fixed-variant: '#003ea6'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#b8c7e4'
  on-secondary-fixed: '#0c1c32'
  on-secondary-fixed-variant: '#39475f'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#723600'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The design system is anchored in a "Premium Soft-Tech" aesthetic, specifically tailored for an emotionally safe language learning environment. It avoids the cold, utilitarian tropes of traditional AI and instead adopts a minimalist editorial layout inspired by high-end lifestyle publications and modern consumer electronics.

The visual language emphasizes clarity, warmth, and approachable sophistication. By utilizing generous whitespace and a calm color palette, the interface reduces cognitive load and performance anxiety—critical factors in language acquisition. The style blends **Minimalism** with subtle **Glassmorphism**, creating a sense of physical layering that feels tangible yet lightweight. The emotional goal is to make the user feel mentored rather than monitored.

## Colors

The palette is designed to balance authority with approachability. 

- **Primary Action (Soft Blue):** Used for main CTAs and progress indicators. It is vibrant enough to signify momentum but soft enough to remain calming.
- **Primary Text & Deep Backgrounds (Deep Navy):** Provides a high-contrast anchor for typography. Used for body text and immersive dark-mode-style sections within the light theme.
- **Page Background (Off-white):** A sterile-free base that provides a soft, paper-like quality to the screen.
- **Secondary Surfaces (Warm Sky Blue):** Used for cards and container backgrounds to create subtle distinction without the harshness of borders.
- **Highlight Accent (Warm Orange):** Reserved for moments of celebration, feedback, or emphasizing specific learning points.

## Typography

The system utilizes **Inter** for all Latin characters, paired with high-quality modern Sans-Serif fonts (like Pretendard) for Korean text to ensure a seamless bilingual experience. 

The typographic scale is "spacious," meaning line heights are intentionally loose (1.6x for body) to improve readability and reduce the feeling of a "wall of text." Headlines use tight letter spacing and bold weights to establish a clear hierarchy, while labels utilize uppercase tracking to provide a technical, organized feel amidst the softer editorial elements.

## Layout & Spacing

This design system follows a **Fixed Grid** philosophy for content containers to maintain an editorial, structured feel on large screens, while remaining fluid for mobile devices. 

- **Grid:** A 12-column system is used for desktop, shifting to a 4-column system for mobile.
- **Rhythm:** An 8px base unit governs all spatial relationships. 
- **Margins:** Large outer margins (40px+) are encouraged to create a "frame" effect around the content, mirroring premium hardware marketing layouts.
- **Safe Areas:** Generous padding within cards (minimum 24px) ensures that text never feels cramped against its container.

## Elevation & Depth

Hierarchy is established primarily through **Tonal Layers** and **Ambient Shadows** rather than heavy borders.

- **Level 0 (Base):** Off-white (#F8FAFC) surface.
- **Level 1 (Cards/Floating elements):** Warm Sky Blue (#EAF1FF) or pure White surfaces.
- **Shadows:** Use extremely diffused, low-opacity shadows. For example: `0px 10px 30px rgba(19, 34, 56, 0.05)`. The shadow color should always be a tinted version of the Deep Navy primary color, never pure black.
- **Interaction:** Upon hover or active state, elements should use a subtle vertical lift (y-axis shift) and a slight increase in shadow spread to simulate physical tactility.

## Shapes

The shape language is consistently **Rounded** to evoke friendliness and safety. 

- **Primary Components:** Buttons and input fields use a 0.5rem (8px) radius.
- **Containers:** Large content cards and modal sheets use "rounded-xl" (1.5rem / 24px) to create a soft, organic frame for information. 
- **Icons:** Icons should feature rounded terminals and consistent stroke weights (1.5pt to 2pt) to match the softness of the UI components.

## Components

### Buttons
- **Primary:** Solid Soft Blue (#4F7DF3) with white text. No border. High-tap targets (min 48px height).
- **Secondary:** Warm Sky Blue (#EAF1FF) background with Soft Blue text.
- **Ghost:** Transparent background with Deep Navy text, reserved for less frequent actions.

### Cards
Editorial-style cards are the primary vessel for content. They should use the "rounded-xl" radius and the Warm Sky Blue background. Avoid using borders; let the soft ambient shadow or the color shift define the edge.

### Input Fields
Inputs use a white background against the off-white page to pop visually. Labels are placed above the field in "label-caps" style. Focus states are indicated by a 2px Soft Blue outer glow.

### Progress & Feedback
Language learning milestones should use the Warm Orange Accent (#FF9F5A). For example, a small "streak" icon or a highlight on a correctly translated word.

### AI Interaction
The AI's voice or chat bubbles should be visually distinct. Use a subtle backdrop blur (Glassmorphism) for the AI’s responses to suggest its "digital" nature, while keeping user inputs grounded in solid secondary colors.