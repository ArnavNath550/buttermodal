# 🧈 ButterModal

A smoothly animated multi-step modal component for React. Built on top of [Radix UI's Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitive and [Framer Motion](https://www.framer.com/motion/).

## Features

- **Animated height transitions** — the modal smoothly resizes as content changes between steps
- **Spring-based content transitions** — each step scales and fades in/out with a subtle spring animation (95% → 100%)
- **Fully customizable** — control theme colors, border radius, padding, and overlay styles via props

---

## Installation

```bash
npm i butter-modal
```

---

## Quick Start

Define your modal steps as an array of `ModalState` objects - each with a unique `key` and a `content` node. Pass this array to the `states` prop along with your open state and step state.

ButterModal will automatically animate between content frames as the step changes, smoothly resizing the modal container to fit the new content height.

```tsx
import { useState } from 'react';
import { ButterModal } from 'butter-modal';

function App() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('welcome');

  const handleClose = () => {
    setOpen(false);
    setStep('welcome');
  };

  const states = [
    {
      key: 'welcome',
      content: (
        <div>
          <h2>Welcome</h2>
          <p>This is step one.</p>
          <button onClick={() => setStep('details')}>Next</button>
        </div>
      ),
    },
    {
      key: 'details',
      content: (
        <div>
          <h2>Details</h2>
          <p>This is step two with more content.</p>
          <button onClick={() => setStep('welcome')}>Back</button>
          <button onClick={handleClose}>Done</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <ButterModal
        states={states}
        step={step}
        onStepChange={setStep}
        initialStep="welcome"
        open={open}
        onOpenChange={setOpen}
        onClose={handleClose}
        theme={{
          background: '#ffffff',
          border: 'transparent',
          text: '#111111',
          overlay: '#000000',
        }}
        containerStyle={{ padding: 12 }}
        contentStyle={{ borderRadius: 20 }}
      />
    </>
  );
}
```

---

## Children Render Prop

The `children` render prop gives you access to the current `step`, a `setStep` function, and a `close` function. Use this to render navigation controls — like Back, Next, and Done buttons — that live outside your step content and persist across transitions.

```tsx
<ButterModal
  states={states}
  step={step}
  onStepChange={setStep}
  initialStep="default"
  open={open}
  onOpenChange={setOpen}
  onClose={handleClose}
>
  {({ step, setStep, close }) => (
    <div>
      <button onClick={close}>Done</button>
    </div>
  )}
</ButterModal>
```

---

## Props

| Prop | Type | Description |
|------|------|-------------|
| `states` | `ModalState[]` | Array of step objects, each with a `key` and `content` |
| `initialStep` | `ModalStep` | The key of the initial step to display |
| `step` | `ModalStep` | The currently active step key (controlled) |
| `onStepChange` | `(step: ModalStep) => void` | Callback fired when the step should change |
| `open` | `boolean` | Whether the modal is open |
| `onOpenChange` | `(open: boolean) => void` | Callback fired when open state changes |
| `onClose` | `() => void` | Callback fired when the modal closes |
| `trigger` | `React.ReactNode` | Optional trigger element to open the modal |
| `overlayStyle` | `React.CSSProperties` | Custom styles for the backdrop overlay |
| `contentStyle` | `React.CSSProperties` | Custom styles for the modal content container |
| `containerStyle` | `React.CSSProperties` | Custom styles for the inner padding container |
| `theme` | `ButterModalTheme` | Theme object for colors (see below) |
| `children` | `({ step, setStep, close }) => React.ReactNode` | Render prop for persistent navigation controls |

### `ButterModalTheme`

```ts
type ButterModalTheme = {
  background?: string;  // Modal background color
  border?: string;      // Modal border color
  text?: string;        // Default text color
  overlay?: string;     // Backdrop overlay color
};
```

---

## Built With

- [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) — accessible dialog primitive
- [Framer Motion](https://www.framer.com/motion/) — spring animations and layout transitions

---

More love for the web by [Arnav Nath](https://arnavshome.vercel.app)
