// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 10}))

  expect(result.current.count).toBe(10)
})

test('allows customization of the step', () => {
  const {result} = renderHook(() => useCounter({step: 5}))

  act(() => result.current.increment())
  expect(result.current.count).toBe(5)

  act(() => result.current.increment())
  expect(result.current.count).toBe(10)
})

test('allows change step', () => {
  const {result, rerender} = renderHook(({step}) => useCounter({step}), {
    initialProps: {step: 5},
  })

  act(() => result.current.increment())
  expect(result.current.count).toBe(5)

  act(() => result.current.increment())
  expect(result.current.count).toBe(10)

  rerender({step: 10})

  act(() => result.current.increment())
  expect(result.current.count).toBe(20)

  act(() => result.current.increment())
  expect(result.current.count).toBe(30)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
