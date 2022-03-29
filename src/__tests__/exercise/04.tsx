// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // let submittedData
  // const handleSubmit = data => {
  //   submittedData = data
  // }
  const handleSubmit = jest.fn()
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  const usernameField = screen.getByLabelText('Username')
  userEvent.type(usernameField, 'username12345')

  const passwordField = screen.getByLabelText('Password')
  userEvent.type(passwordField, 'password12345')
  //
  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByText('Submit')
  userEvent.click(submitButton)
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  // expect(submittedData).toEqual({
  //   username: 'username12345',
  //   password: 'password12345',
  // })
  expect(handleSubmit).toBeCalledWith({
    username: 'username12345',
    password: 'password12345',
  })
  expect(handleSubmit).toBeCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
