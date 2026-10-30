<<<<<<< HEAD
Your local README content
=======
README content from GitHub
>>>>>>> origin/main;<<<<<<< HEAD

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
=======
# ShopSphere

ShopSphere is an e-commerce storefront I built to solve a simple problem: a lot of online stores are slow, cluttered and painful to use on a phone, so people leave before they buy anything. ShopSphere is a fast, mobile-first frontend with product browsing, search, filters, a cart and a checkout that stays out of the way.

## Why I built it

Slow pages and messy layouts push shoppers away, and a clumsy checkout makes them abandon their carts. I wanted to build a storefront that loads quickly, works well on small screens, and makes buying something feel easy. It also gave me a chance to practise building a real-world React app with TypeScript, proper state management and accessibility in mind.

## What it does

- Search products, sort them, and filter by category
- Add items to a cart or wishlist, and keep them saved between visits
- Go through a multi-step checkout with form validation at each step
- See skeleton loaders while data loads, plus clear error and empty states
- Load pages quickly through lazy loading and code splitting
- Use the whole site with a keyboard, with ARIA labels for screen readers
- Switch between dark and light themes

## Results

- Lighthouse scores of 90+ in Performance, Accessibility and Best Practices
- A reusable component library, so new pages take less time to build
- A consistent experience across mobile, tablet and desktop
- A type-safe codebase, so many bugs are caught at compile time instead of in the browser

## Tech stack

| Area | Tool |
| --- | --- |
| UI | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| App state | Redux Toolkit |
| Server data | React Query |
| Build tool | Vite |

## Getting started

You need Node.js 18 or newer.

```bash
git clone https://github.com/YOUR-USERNAME/shopsphere.git
cd shopsphere
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint |

## Project structure

```
shopsphere/
  public/
  src/
    assets/
    components/     reusable UI components
    features/       Redux slices (cart, wishlist, filters, theme)
    hooks/          custom hooks
    pages/          route-level pages, loaded lazily
    services/       API calls and React Query hooks
    types/          shared TypeScript types
    utils/
    App.tsx
    main.tsx
  index.html
  tailwind.config.js
  tsconfig.json
  vite.config.ts
```

## How it is put together

- **Redux Toolkit** handles client-side state like the cart, wishlist, filters and theme. Cart and wishlist are saved so they survive a refresh.
- **React Query** handles data from the server. It takes care of fetching, caching and refetching products, so components stay simple.
- **Code splitting** with `React.lazy` and `Suspense` means each page loads only when the user actually visits it.
- **Mobile-first styling** with Tailwind means the layout is designed for small screens first and then scaled up.
- **Accessibility** comes from semantic HTML, ARIA labels and proper focus handling, not as an afterthought.

## Screenshots

Add screenshots of the home page, product listing, cart and checkout here.

## Links

- Live demo: add link
- Source code: add link

## What I would add next

- Payment gateway integration
- User accounts and order history
- Product reviews and ratings
- Unit tests and end-to-end tests

## Author

Mohit Sharma, frontend developer based in New Delhi, India.

GitHub: add link
LinkedIn: add link
>>>>>>> origin/main
