# Cypress test definition for [Plaited](https://github.com/plaited/plaited)

[![Tests](https://github.com/plaited/cypress-ct/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/plaited/cypress-ct/actions/workflows/tests.yml)


This is a custom [Plaited](https://github.com/plaited/plaited) component test definition for cypress.

* [Getting started]
* [Manual setup]
  * [Update your Cypress config]
  * [Update your component config]
* [Usage]

[Getting started]: #getting-started
## Getting started
To install, run:
```bash
npm install -D @plaited/cypress-ct
```

Once you have the package installed alongside Cypress, you can run `npx cypress open`, choose "Component Testing", and Plaited should appear in the list of frameworks available.

Learn more about [third-party definitions](https://docs.cypress.io/guides/component-testing/third-party-definitions)

[Manual setup]: #manual-setup
## Manual setup
If you already have an existing configuration and can't go through the setup process again, you can update your configuration to work with `@plaited/cypress-ct`.

Before you can get started, you need to also install `plaited` and `vite`.  Once you have, you need to take two updates:

[Update your Cypress config]: #update-your-cypress-config
### Update your Cypress config
First, update your `cypress.config.{ts,js}` to have `'@plaited/cypress-ct'` as your framework and `'vite'` as your bundler:
```ts
export default defineConfig({
  component: {
    devServer: {
      framework: '@plaited/cypress-ct',
      bundler: 'plaited',
      // more config here
    }
  }
})
```

If you're using TypeScript, you may get a type error when setting the `framework` property.  If so, you'll need to typecast it as `any`:
```ts
framework: '@plaited/cypress-ct' as any,
```

[Update your component config]: #update-your-component-config
### Update your component config
Next, add the following to your `cypress/support/component.{ts,js}` file:
```ts
import { mount } from '@plaited/cypress-ct'

Cypress.Commands.add('mount', mount)
```

Then, add your Plaited `component-index.html` file either in `support/component/` the default location or at the root of your project for easy usage. In it you'll import the file you use to define your Plaited components:
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      http-equiv="X-UA-Compatible"
      content="IE=edge"
    />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0"
    />
    <title>Components App</title>
    <script
      type="module"
      src="./component/index.ts"
    ></script>
  </head>
  <body>
      <div data-cy-root></div>
  </body>
</html>
```

You can then update your Cypress config like so:
```ts
export default defineConfig({
  component: {
    devServer: {
      framework: '@plaited/cypress-ct',
      bundler: 'vite',
      // more config here
    }
    indexHtmlFile: './component-index.html',
  }
})
```

If this is a new project using Plaited then you'll also want to update your vite.config.ts:

```ts
import { defineConfig } from 'vite'
export default defineConfig({
  esbuild: {
    jsxImportSource: 'plaited',
    jsx: 'automatic',
  },
})

```

If you're using TypeScript, you may also need to add the following block to `components.ts` get the types to work:
```ts
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}
```

Once you've followed these steps, you should be ready to write some tests!

[Usage]: #usage
## Usage
You can now mount any Plaited Function Template (HTML) in a component test, for example:
```tsx
it('should display content', () => {
  const text = 'I will show up in the test'
  cy.mount(<div id='content'>{text}</div>)

  cy.get('#content').should('contain.text', text)
})
```

This also works with Plaited  Components.  You can either reach into the shadow root manually:
```tsx
import { Button } from './button.js'


it('should render its shadow', () => {
  cy.mount(<Button.template>World!!!</Button.template>)

  cy.get(Button.tag)
    .shadow()
    .should('contain.text', 'Hello')
})
```

Or, you can turn on `includeShadowDom` ([see the docs on configuring Cypress](https://docs.cypress.io/guides/references/configuration#Global))
```ts
export default defineConfig({
  includeShadowDom: true
  component: {
    // more config here
  }
})
```

With this option set, you can simply access elements in your custom elements directly:
```ts
import { Button, cls } from './button.js'

it('auto shadow get', () => {
  cy.mount(<Button.template>World!!!</Button.template>)
  console.log(cls.start)
  cy.get(`.${cls.start}`)
    .should('exist')
})
```
