// mocking Browser APIs and modules
// http://localhost:3000/location

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../examples/location'

test('displays the users current location', async () => {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: '35',
      longitude: '105',
    },
  }
})

test('displays error message if cannot get current position', async () => {})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
