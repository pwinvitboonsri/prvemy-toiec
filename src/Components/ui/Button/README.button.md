# 🧠 Button Component Library

Reusable animated and styled buttons for modern UI.

## 📁 Structure

Located in: `@/Components/ui/Button`

```ts
// Central import:
import {
  AnimatedSlideButton,
  CounterComponent,
  FlipButtonComponent,
  IconButtonComponent,
  LiquidButtonComponent,
  RippleButtonComponent,
} from "@/Components/ui/Button";
```

---

## 🔘 Components

### 1. `AnimatedSlideButton`

**Description:** Button with animated slide-in emoji (✈️) on hover.

```tsx
<AnimatedSlideButton label="Book your flight" icon="✈️" onClick={...} />
```

**Props:**

| Prop        | Type     | Description                  |
| ----------- | -------- | ---------------------------- |
| `label`     | string   | Button text label            |
| `icon`      | string   | Emoji or character to slide  |
| `onClick`   | () => {} | Click handler                |
| `className` | string   | Tailwind override (optional) |

---

### 2. `CounterComponent`

**Description:** Increment/decrement counter with animated number.

```tsx
<CounterComponent defaultValue={0} min={0} max={100} step={5} onChange={val => console.log(val)} />
```

**Props:**

| Prop           | Type      | Default | Description        |
| -------------- | --------- | ------- | ------------------ |
| `defaultValue` | number    | 0       | Initial value      |
| `min`          | number    | -       | Minimum value      |
| `max`          | number    | -       | Maximum value      |
| `step`         | number    | 1       | Step increment     |
| `onChange`     | (n) => {} | -       | Callback on change |

---

### 3. `FlipButtonComponent`

**Description:** 3D flip card animation on hover (front/back text).

```tsx
<FlipButtonComponent frontText="Start" backText="Let's Go 🚀" from="top" />
```

**Props:**

| Prop        | Type                 | Description        |
| ----------- | -------------------- | ------------------ |
| `frontText` | string               | Text on front face |
| `backText`  | string               | Text on back face  |
| `from`      | "top" | "left" | ... | Flip direction     |

---

### 4. `IconButtonComponent`

**Description:** Icon-only toggleable button (like favorite/star).

```tsx
<IconButtonComponent />
```

> Internally uses Lucide icon (`Star`) and animated particle/glow effects.

**Props:**

| Prop      | Type        | Default      | Description                  |
| --------- | ----------- | ------------ | ---------------------------- |
| `icon`    | Lucide icon | -            | Icon component (e.g. `Star`) |
| `active`  | boolean     | false        | Toggle state                 |
| `animate` | boolean     | true         | Enable glow + particle       |
| `color`   | [r, g, b]   | [59,130,246] | Glow RGB                     |

---

### 5. `LiquidButtonComponent`

**Description:** Animated blob/liquid CTA button.

```tsx
<LiquidButtonComponent variant="outline">Click Me</LiquidButtonComponent>
```

**Variants:** `default`, `outline`, `secondary`

**Sizes:** `sm`, `default`, `lg`, `icon`

---

### 6. `RippleButtonComponent`

**Description:** Material-style ripple button with framer-motion.

```tsx
<RippleButtonComponent variant="ghost" onClick={...}>Tap</RippleButtonComponent>
```

**Props:**

| Prop       | Type    | Default   | Description         |
| ---------- | ------- | --------- | ------------------- |
| `variant`  | string  | "default" | Visual style        |
| `size`     | string  | "default" | Button size         |
| `scale`    | number  | 10        | Max ripple scale    |
| `disabled` | boolean | false     | Disable interaction |

---

## 🛠 Usage Tips

* All buttons support `className` for Tailwind overrides.
* Wrap interactive buttons in `<Section>` or `<Grid>` for layout.
* Customize animations by overriding props like `transition`, `from`, or `scale`.

---

## 📌 Next Steps

* Add icon support to `LiquidButton`
* Add loading state prop to all buttons
* Convert `Counter` to `formField` compatible
* Docs auto-preview with Storybook (TBD)

---

> Built with ❤️ using ShadCN + Framer Motion
