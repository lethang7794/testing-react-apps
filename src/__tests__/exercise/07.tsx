// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, RenderOptions, screen} from '@testing-library/react'
import {Theme, ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function renderWithProvider(
  ui: React.ReactElement,
  {theme = 'light', ...options}: RenderOptions & {theme?: Theme} = {},
) {
  function Wrapper({children}: {children: React.ReactNode}) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }

  return render(ui, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {
  renderWithProvider(<EasyButton>Easy</EasyButton>, {theme: 'light'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
      background-color: white;
      color: black;
    `)
})

test('renders with the dark styles for the dark theme', () => {
  renderWithProvider(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
      background-color: black;
      color: white;
    `)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
