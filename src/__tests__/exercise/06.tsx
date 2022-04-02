// mocking Browser APIs and modules
// http://localhost:3000/location

import {render, screen, act} from '@testing-library/react'
import {mocked} from 'ts-jest/utils'
import {Position, useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'
import React, {useState} from 'react'

jest.mock('react-use-geolocation')
const mockedUseCurrentPosition = mocked(useCurrentPosition)

test('displays the users current location', async () => {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition: Position = {
    coords: {
      latitude: 35,
      longitude: 105,
    },
  }

  type CurrentPositionReturn = ReturnType<typeof useCurrentPosition>
  let setCurrentPosition: React.Dispatch<
    React.SetStateAction<CurrentPositionReturn>
  >

  function useMockCurrentPosition() {
    const state = useState<CurrentPositionReturn>([undefined, undefined])
    setCurrentPosition = state[1]
    return state[0]
  }

  mockedUseCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  act(() => {
    setCurrentPosition([fakePosition, undefined])
  })

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )

  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays error message if cannot get current position', async () => {
  const fakeError = new Error('Current position is not supported')

  type CurrentPositionReturn = ReturnType<typeof useCurrentPosition>
  let setCurrentPosition: React.Dispatch<
    React.SetStateAction<CurrentPositionReturn>
  >

  function useMockCurrentPosition() {
    const state = useState<CurrentPositionReturn>([undefined, undefined])
    setCurrentPosition = state[1]
    return state[0]
  }

  mockedUseCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  act(() => {
    setCurrentPosition([undefined, fakeError])
  })

  expect(screen.getByRole('alert')).toHaveTextContent(fakeError.message)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
