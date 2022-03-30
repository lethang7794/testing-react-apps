// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import type {LoginFormValues} from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'

const buildLoginForm = build<LoginFormValues>({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const {username, password} = buildLoginForm()

  const usernameField = screen.getByLabelText('Username')
  userEvent.type(usernameField, username)

  const passwordField = screen.getByLabelText('Password')
  userEvent.type(passwordField, password)

  const submitButton = screen.getByText('Submit')
  userEvent.click(submitButton)

  expect(handleSubmit).toBeCalledWith({username, password})
  expect(handleSubmit).toBeCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
