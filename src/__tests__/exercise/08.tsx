// testing custom hooks
// http://localhost:3000/counter-hook

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'


function CounterHookTest() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<CounterHookTest />)
  const count = screen.getByText(/current count/i)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})

  expect(count).toHaveTextContent('Current count: 0')

  userEvent.click(increment)
  expect(count).toHaveTextContent('Current count: 1')

  userEvent.click(decrement)
  expect(count).toHaveTextContent('Current count: 0')
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
