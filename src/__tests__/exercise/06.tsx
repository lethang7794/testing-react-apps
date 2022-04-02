// mocking Browser APIs and modules
// http://localhost:3000/location

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../examples/location'

const mockedGeolocation = {
  getCurrentPosition: jest.fn(),
}

beforeAll(() => {
  Object.defineProperty(window.navigator, 'geolocation', {
    value: mockedGeolocation,
  })
})

function deferred() {
  let resolve: (value?: unknown) => void
  let reject: (reason?: unknown) => void
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: '35',
      longitude: '105',
    },
  }

  const {promise, resolve} = deferred()

  mockedGeolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise.then(() => {
        successCallback(fakePosition)
      })
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  resolve()

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays error message if cannot get current position', async () => {
  const {promise, resolve} = deferred()

  const errorMessage = 'Failed to get current position'
  mockedGeolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise.then(() => {
        errorCallback(new Error(errorMessage))
      })
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  resolve()

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
