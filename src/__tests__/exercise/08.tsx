// testing custom hooks
// http://localhost:3000/counter-hook

import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  let result: ReturnType<typeof useCounter>
  function TestCounterHook(props) {
    result = useCounter(props)
    return null
  }

  render(<TestCounterHook />)

  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
