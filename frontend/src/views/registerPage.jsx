import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import UsernameInput from '../components/UsernameInput'
import EmailInput from '../components/EmailInput'
import PasswordInput from '../components/PasswordInput'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ConfirmPasswordInput from '../components/ConfirmPasswordInput'

export default function Login() {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()
  const onSubmit = (data, event) => {
    console.log(data)
  }
  const handleRegister = () => {
    // Make account then navigate back to login
    navigate('../')
  }

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

        <div className="flex self-center">
          <input
            className="btn mt-6"
            type="submit"
            value="Register"
            onClick={handleRegister}
          />
        </div>
      </form>
    </div>
  )
}
