# 🧩 Layout Components — Prvemy-TOEIC

Reusable layout primitives to structure pages with consistent spacing, responsiveness, and clarity. Each component is **headless**, **responsive-first**, and designed to pair perfectly with shadcn/ui and Tailwind.

---

## 1. `PageWrapper`

### ✅ What it does

Wraps entire pages or screen sections with consistent outer padding and responsive behavior.

### 📦 Use cases

* Top-level wrapper for pages
* Apply app-wide spacing baseline

### 💡 Usage

```tsx
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function Dashboard() {
  return (
    <PageWrapper>
      <h1 className="text-xl font-bold">Dashboard</h1>
    </PageWrapper>
  );
}
```

---

## 2. `Grid`

### ✅ What it does

Creates a responsive grid layout with configurable columns (default is `grid-cols-3`).

### 📦 Use cases

* Display cards, stats, images, or content blocks in columns
* Customizable for mobile-first layouts

### 💡 Usage

```tsx
import { Grid } from "@/components/layout/Grid";

<Grid cols={3} className="gap-6">
  <Card />
  <Card />
  <Card />
</Grid>
```

* `cols` (number): defaults to `3`. Internally maps to `grid-cols-{n}`.
* Add your own responsive modifiers (e.g., `md:grid-cols-2`) via `className`.

---

## 3. `Section`

### ✅ What it does

Wraps content in semantic block (e.g. `<section>`) with optional padding and anchor support.

### 📦 Use cases

* Organize a page into logical sections
* Control vertical spacing between blocks

### 💡 Usage

```tsx
import { Section } from "@/components/layout/Section";

<Section id="goals" padded>
  <h2 className="text-2xl font-bold">Goals</h2>
</Section>
```

* `as` (default: `"section"`): Any valid semantic tag like `"div"`, `"article"`
* `padded` (default: `true`): Adds vertical padding `py-8 sm:py-12 lg:py-16`

---

## 4. `Container`

### ✅ What it does

Constrain content width using `max-w-7xl` and apply responsive horizontal padding.

### 📦 Use cases

* Ensure readable content widths
* Prevent full-bleed layouts

### 💡 Usage

```tsx
import { Container } from "@/components/layout/Container";

<Container>
  <p>This content is constrained and centered.</p>
</Container>
```

* Always horizontally centered (`mx-auto`)
* Responsive padding `px-4 sm:px-6 lg:px-8`

---

## 5. `Spacer`

### ✅ What it does

Adds vertical spacing between elements — avoids cluttering with multiple `mt-` or `mb-`.

### 📦 Use cases

* Visually separate blocks of content
* Build vertical rhythm

### 💡 Usage

```tsx
import { Spacer } from "@/components/layout/Spacer";

<Card />
<Spacer size="md" />
<Card />
```

* `size`: `"sm"` = `h-4`, `"md"` = `h-8` (default), `"lg"` = `h-16`

---

## 6. `Split`

### ✅ What it does

Two-column grid layout that gracefully collapses to 1 column on small screens.

### 📦 Use cases

* Side-by-side layouts: text/image, form/preview
* Testimonials or pricing comparisons

### 💡 Usage

```tsx
import { Split } from "@/components/layout/Split";

<Split>
  <LeftPanel />
  <RightPanel />
</Split>
```

* Responsive by default: `grid-cols-1 md:grid-cols-2`

---

## 7. `Stack`

### ✅ What it does

Vertical flex layout with consistent gap between children.

### 📦 Use cases

* List of buttons, inputs, or settings
* Group related content vertically

### 💡 Usage

```tsx
import { Stack } from "@/components/layout/Stack";

<Stack gap="gap-6">
  <Input />
  <Input />
  <Button />
</Stack>
```

* `gap`: Tailwind class string (default: `gap-4`)
* Adds `flex flex-col` layout under the hood

---

## 🔚 Summary

| Component   | Purpose                             | Mobile Support | Default Padding |
| ----------- | ----------------------------------- | -------------- | --------------- |
| PageWrapper | Consistent outer spacing            | ✅              | `px-4 sm:px-6`  |
| Grid        | Grid layout with custom `cols`      | ✅              | ❌               |
| Section     | Vertical spacing + semantic wrapper | ✅              | `py-8 → py-16`  |
| Container   | Width constraint & horizontal pads  | ✅              | `px-4 → px-8`   |
| Spacer      | Adjustable vertical gap             | ✅              | ❌               |
| Split       | Responsive 2-column layout          | ✅              | `gap-6`         |
| Stack       | Vertical flex stack with gaps       | ✅              | ❌               |

---

## 💬 Questions?

This system is flexible — feel free to add props like `align`, `justify`, `fluid`, or responsive toggles later.
