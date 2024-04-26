# Client Setup Overview

## React + TypeScript + Vite

This template offers a minimal setup featuring React in Vite with Hot Module Replacement (HMR) and ESLint configurations optimized for development and potential production use.

### Plugins

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**: Utilizes Babel for Fast Refresh.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: Employs SWC for Fast Refresh.

## ESLint Configuration

For production environments, enhance ESLint settings by enabling type-aware rules:

1. **Parser Options**: Set top-level `parserOptions` for TypeScript integration.
2. **Rules Enhancement**: Use stricter lint rules like `plugin:@typescript-eslint/recommended-type-checked`.
3. **React Plugin**: Include `eslint-plugin-react` for React specific linting.

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  // additional rules...
};
```

## Running the Application

To start the client application, follow these steps:

1. **Install Dependencies**:
   Navigate to the `client/` directory and run:

   ```bash
   bun install
   ```

2. **Launch the Application**:
   Start the development server using:
   ```bash
   bun run dev
   ```

For a detailed walkthrough of client-side operations including setup, configurations, and features, refer to our comprehensive documentation:

- **[Client Application Usage](../docs/client/application-usage.md)**: This document provides a full overview of client-side configurations, component usage, and more.
