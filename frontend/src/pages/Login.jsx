import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'

const Login = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_USER)
  const [formState, setFormState] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log('formState', formState)
    try {
      const { data } = await login({
        variables: { ...formState }
      })
      console.log('data', data)
      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }
    setFormState({
      email: '',
      password: ''
    })
  }

  return (
    <div
      className='login-component'
    >
      <h1>Login</h1>
      <form
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login