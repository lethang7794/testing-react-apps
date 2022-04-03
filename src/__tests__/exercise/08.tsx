// testing custom hooks
// http://localhost:3000/counter-hook

import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

type UseCounterParams = Parameters<typeof useCounter>[0]

function setup({
  initialProps,
}: {initialProps?: UseCounterParams} = {}): ReturnType<typeof useCounter> {
  const results = {}
  function TestComponent(props) {
    Object.assign(results, useCounter(props))
    return null
  }
  render(<TestComponent {...initialProps} />)
  return results as ReturnType<typeof useCounter>
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()

  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 10}})

  expect(result.count).toBe(10)
})

test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 5}})

  act(() => result.increment())
  expect(result.count).toBe(5)

  act(() => result.increment())
  expect(result.count).toBe(10)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
