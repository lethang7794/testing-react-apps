// simple test with React Testing Library
// http://localhost:3000/counter

// import ReactDOM from 'react-dom'
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
import {fireEvent, render} from '@testing-library/react'
import Counter from '../../components/counter'

// 💣 remove this. React Testing Library does this automatically!
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 swap ReactDOM.render with React Testing Library's render
  // Note that React Testing Library's render doesn't need you to pass a `div`
  // so you only need to pass one argument. render returns an object with a
  // bunch of utilities on it. For now, let's just grab `container` which is
  // the div that React Testing Library creates for us.
  // 💰 const {container} = render(<Counter />)
  // ReactDOM.render(<Counter />, div)
  const {container} = render(<Counter />)

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = Array.from(
    container.querySelectorAll('button'),
  )
  if (!decrement || !increment) {
    throw new Error('decrement and increment not found')
  }
  if (!(container.firstChild instanceof HTMLElement)) {
    throw new Error('first child is not a div')
  }

  const message = container.firstChild.querySelector('div')
  if (!message) {
    throw new Error(`couldn't find message div`)
  }

  expect(message.textContent).toBe('Current count: 0')

  // 🐨 replace the next two statements with `fireEvent.click(button)`
  fireEvent.click(increment)
  expect(message.textContent).toBe('Current count: 1')

  fireEvent.click(decrement)
  expect(message.textContent).toBe('Current count: 0')
})
