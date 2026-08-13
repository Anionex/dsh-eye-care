import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ['../tsconfig.base.json'] })],
  resolve: {
    alias: [
      { find: /^react$/, replacement: fileURLToPath(new URL('../packages/client/ui-primitives/node_modules/react/index.js', import.meta.url)) },
      { find: /^react\/jsx-runtime$/, replacement: fileURLToPath(new URL('../packages/client/ui-primitives/node_modules/react/jsx-runtime.js', import.meta.url)) },
      { find: /^react\/jsx-dev-runtime$/, replacement: fileURLToPath(new URL('../packages/client/ui-primitives/node_modules/react/jsx-dev-runtime.js', import.meta.url)) },
      { find: /^react-dom$/, replacement: fileURLToPath(new URL('../packages/client/ui-primitives/node_modules/react-dom/index.js', import.meta.url)) },
      { find: /^react-dom\/client$/, replacement: fileURLToPath(new URL('../packages/client/ui-primitives/node_modules/react-dom/client.js', import.meta.url)) },
      { find: /^@testing-library\/react$/, replacement: fileURLToPath(new URL('../packages/client/ui-tool/node_modules/@testing-library/react/dist/index.js', import.meta.url)) },
    ],
  },
  test: {
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    environment: 'node',
    fileParallelism: false,
  },
})
