# Ditto Music Services Tab

A Vue 3 + TypeScript component for configuring music distribution services across different Ditto subscription plans.

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build**: Vite 5
- **Styling**: Tailwind CSS with Ditto design tokens
- **TypeScript**: Strict mode

## Getting Started

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Type-check and build for production
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── App.vue                 # Plan selector tabs
├── main.ts                 # Entry point
├── types.ts                # TypeScript definitions
└── components/
    ├── ServicesTab.vue     # Main services selection UI
    ├── ServicesPurchasedView.vue  # Post-purchase view
    ├── ServiceRow.vue      # Selectable service items
    ├── FeatureCard.vue     # Toggleable feature cards
    ├── CheckoutButton.vue  # Checkout summary
    ├── BeatportLabelModal.vue
    └── icons/              # SVG icon components
static/
└── images/                 # Service provider logos
```
