import React, {useContext, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form'
import UsernameInput from '../components/UsernameInput'
import EmailInput from '../components/EmailInput'
import PasswordInput from '../components/PasswordInput'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ConfirmPasswordInput from '../components/ConfirmPasswordInput'
import NameInput from '../components/NameInput'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

export default function Login() {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()
  const { register, isAuthenticated } = useContext(AuthenticationContext)

  const onSubmit = (data, event) => {
    try {
      const result = register(data.username, data.password, data.firstName, data.lastName, data.email)
      if (result.success) {
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
    }
    
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/planner')
    }
  }, [isAuthenticated])
  
  return (
    <div className="min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs flex flex-col space-y-4 self-center"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <UsernameInput
              handleOnChange={field.onChange}
              value={field.value}
            />
          )}
          defaultValue=""
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <EmailInput handleOnChange={field.onChange} value={field.value} />
          )}
          defaultValue=""
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              handleOnChange={field.onChange}
              value={field.value}
            />
          )}
          defaultValue=""
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <ConfirmPasswordInput
              handleOnChange={field.onChange}
              value={field.value}
            />
          )}
          defaultValue=""
        />

      <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <NameInput 
              handleOnChange={field.onChange}
              value={field.value}
              placeholder="First Name"
            />
          )}
          defaultValue=""
        />

      <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <NameInput 
              handleOnChange={field.onChange}
              value={field.value}
              placeholder="Last Name"
            />
          )}
          defaultValue=""
        />

        <div className="flex self-center">
          <input
            className="btn mt-6"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  )
}
