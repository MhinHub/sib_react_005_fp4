import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import Head from 'next/head'

interface Inputs {
  email: string
  password: string
}

function Login() {
  const initialUser = {
    email: 'user@mouvee.com',
    password: 'user123',
  }

  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <main className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login - Mouvee</title>
      </Head>

      <Image
        src="/static/bg-image-films.jpg"
        alt="Mouvee login background"
        className="-z-10 !hidden opacity-60 sm:!inline"
        style={{ objectFit: 'cover' }}
        fill
      />

      <div className="flex items-center">
        <Image
          src="/static/logo-mouvee.png"
          width={80}
          height={80}
          className="cursor-pointer bg-gradient-to-br from-blue-800 to-purple-800 bg-clip-text object-contain text-transparent"
          alt="logo-mouvee"
        />
        <p className="invisible text-3xl font-extrabold md:visible">Mouvee</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded-3xl bg-black/75 px-6 py-10 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              defaultValue={initialUser.email}
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-red-600">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              defaultValue={initialUser.password}
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-red-600">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          className="mx-auto flex w-2/3 justify-center rounded-3xl bg-gradient-to-br from-blue-800 to-purple-800 py-3 text-center font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Mouvee?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </main>
  )
}

export default Login
