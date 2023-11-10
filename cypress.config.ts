import { defineConfig } from 'cypress'

export default defineConfig({
  includeShadowDom: true,
  component: {
    supportFile: 'cypress/support/component.ts',
    devServer: {
      bundler: 'vite',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      framework: '@plaited/cypress-ct' as any,
    },
    indexHtmlFile: './tests/component-index.html',
  },
  experimentalWebKitSupport: true,
})
