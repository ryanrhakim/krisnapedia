## Fix Hero Headline — Line 1 Wrapping on Desktop

**File:** `src/components/site/Hero.tsx`

### Problem
At the current viewport (~1000px) and on standard desktop, line 1 "Satu portal untuk semua hal" wraps because `lg:text-7xl` (72px) is too large for the `max-w-3xl` (768px) container. The word "hal" drops to a new line, breaking the intended 2-line layout into 3 lines.

### Fix
Lower the responsive size scale on the `<h1>` so line 1 fits on a single line from the `md` breakpoint upward, while staying responsive on mobile. Both spans continue to inherit from the parent for equal sizing.

Replace the `<h1>` block (lines 41–44):

```tsx
<h1 className="mt-6 font-display font-bold leading-[1.1] tracking-tight text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  <span className="block">Satu portal untuk semua hal</span>
  <span className="mt-2 block text-primary">tentang KRISNA</span>
</h1>
```

### Why this works
- **Line 1 fits**: `text-5xl` (48px) at `md` and `text-6xl` (60px) at `lg` keep "Satu portal untuk semua hal" on a single line within the `max-w-3xl` (768px) container at all desktop widths ≥768px.
- **Equal sizing**: Both spans inherit from `<h1>`, so both lines render at the exact same size at every breakpoint.
- **Mobile responsive**: `text-3xl` (mobile) → `sm:text-4xl` → `md:text-5xl` → `lg:text-6xl` scales cleanly down to ~360px viewports without overflow; line 1 may wrap to 2 lines on small phones, which is acceptable and remains centered.
- **Centered**: parent `text-center` + `max-w-3xl mx-auto` already handle centering — no layout side effects.

No other files change.