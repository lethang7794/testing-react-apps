// Avoid implementation details
// http://localhost:3000/counter

// 🐨 add `screen` to the import here:
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  // const [decrement, increment] = Array.from(
  //   container.querySelectorAll('button'),
  // )
  const decrement = screen.getByText('Decrement')
  const increment = screen.getByText('Increment')

  if (!(container.firstChild instanceof HTMLElement)) {
    throw new Error('first child is not a div')
  }

  const message = container.firstChild.querySelector('div')
  if (!message) {
    throw new Error(`couldn't find message div`)
  }
  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
