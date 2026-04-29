## Fix Hero Headline Sizing & Responsiveness

**File:** `src/components/site/Hero.tsx`

### Problem
- Line 1 uses `text-[8vw] md:text-6xl lg:text-7xl` + `whitespace-nowrap` → on desktop it scales to viewport width (much bigger than line 2); on mobile (<768px) the `whitespace-nowrap` forces overflow beyond the screen.
- Line 2 uses fixed `text-5xl md:text-6xl lg:text-7xl` → smaller than line 1 on desktop.
- Result: mismatched sizes + horizontal overflow on narrow viewports.

### Fix
Apply one shared, fully responsive size class to BOTH spans, drop `whitespace-nowrap`, and let line 1 wrap naturally on small screens (it's fine if "Satu portal untuk semua hal" wraps to 2 lines on mobile — the layout stays centered and contained).

Replace the `<h1>` block (Hero.tsx lines 41–48) with:

```tsx
<h1 className="mt-6 font-display font-bold leading-[1.1] tracking-tight text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
  <span className="block">Satu portal untuk semua hal</span>
  <span className="mt-2 block text-primary">tentang KRISNA</span>
</h1>
```

### Why this works
- **Equal sizing**: the size classes live on the `<h1>` and both `<span>` inherit, so both lines render at the exact same font size at every breakpoint.
- **Responsive scale**: `text-4xl` (mobile) → `sm:text-5xl` → `md:text-6xl` → `lg:text-7xl` — fits cleanly inside the iPhone 8 Plus (414px) viewport without overflow.
- **Centered**: the parent already has `text-center` + `max-w-3xl mx-auto`; removing `whitespace-nowrap` lets the text respect the container width, so it stays centered on every screen.
- **No layout side effects**: description, search bar, stats, and the section's `max-w-3xl` container are untouched.

No other files change.