import { Button, cls } from './button.js'

it('light dom get', () => {
  const text = 'I will show up in the test'
  cy.mount(<div id='content'>{text}</div>)

  cy.get('#content').should('contain.text', text)
})

it('manual shadow get', () => {
  cy.mount(<Button.template>World!!!</Button.template>)

  cy.get(Button.tag).shadow().should('contain.text', 'Hello')
})

it('auto shadow get', () => {
  cy.mount(<Button.template>World!!!</Button.template>)
  console.log(cls.start)
  cy.get(`.${cls.start}`).should('exist')
})
