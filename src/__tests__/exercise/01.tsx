// simple test with ReactDOM
// http://localhost:3000/counter

import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = Array.from(div.querySelectorAll('button'))
  if (!decrement || !increment) {
    throw new Error('Decrement/Increment button not found')
  }

  const message = (div.firstChild as Element).querySelector('div')
  if (!message) {
    throw new Error('Message not found')
  }
  expect(message.textContent).toBe('Current count: 0')

  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  decrement.dispatchEvent(decrementClickEvent)
  expect(message.textContent).toBe('Current count: -1')

  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  increment.dispatchEvent(incrementClickEvent)
  expect(message.textContent).toBe('Current count: 0')

  div.remove()
})

/*
eslint
  no-unused-vars:"off",
  @typescript-eslint/no-unused-vars: "off",
*/
