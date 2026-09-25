import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, ArrowUpRight } from 'lucide-react'

const API_URL = 'https://selah-qsla.onrender.com/api'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.')
      }

      localStorage.setItem('selah_admin_token', data.token)
      localStorage.setItem('selah_admin', JSON.stringify(data.admin))

      window.location.href = '/admin/dashboard'
    } catch (error) {
      setError(error.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#2c211b] px-5 py-12">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-[#d8c7b0]/10" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border border-[#a65d3b]/10" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8c7b0]/5 blur-3xl" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo / heading */}
        <div className="mb-8 text-center">

          <a
            href="/"
            className="inline-block"
          >
            <img
              src="/selahll.png"
              alt="Selah Coffee"
              className="mx-auto h-20 w-auto object-contain transition-transform duration-500 hover:scale-105 hover:-translate-y-1"
            />
          </a>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#d8c7b0]/60">
            Administration
          </p>

          <h1 className="mt-3 font-display text-4xl text-[#f5efe6]">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#f5efe6]/50">
            Sign in to manage your Selah Coffee website.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-[#f5efe6] p-7 shadow-2xl shadow-black/30 sm:p-9"
        >

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-2xl border border-[#a65d3b]/20 bg-[#a65d3b]/10 px-4 py-3 text-sm leading-6 text-[#7c3f29]">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[#2c211b]/60"
            >
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2c211b]/35"
              />

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@selahcoffee.com"
                autoComplete="email"
                className="relative z-10 w-full rounded-2xl border border-[#2c211b]/10 bg-white py-3.5 pl-12 pr-4 text-sm text-[#2c211b] outline-none transition placeholder:text-[#2c211b]/25 focus:border-[#a65d3b]/50 focus:ring-4 focus:ring-[#a65d3b]/10"
              />

            </div>
          </div>

          {/* Password */}
          <div className="mt-5">

            <label
              htmlFor="admin-password"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[#2c211b]/60"
            >
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2c211b]/35"
              />

              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="relative z-10 w-full rounded-2xl border border-[#2c211b]/10 bg-white py-3.5 pl-12 pr-12 text-sm text-[#2c211b] outline-none transition placeholder:text-[#2c211b]/25 focus:border-[#a65d3b]/50 focus:ring-4 focus:ring-[#a65d3b]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#2c211b]/40 transition hover:bg-[#2c211b]/5 hover:text-[#2c211b]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#2c211b] px-6 py-3.5 text-sm font-semibold text-[#f5efe6] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6f4e37] hover:shadow-xl hover:shadow-[#2c211b]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#f5efe6]/30 border-t-[#f5efe6]" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </>
            )}
          </button>

        </form>

        {/* Back to website */}
        <div className="mt-6 text-center">

          <a
            href="/"
            className="text-xs text-[#f5efe6]/40 transition-colors hover:text-[#f5efe6]/80"
          >
            ← Back to Selah website
          </a>

        </div>

      </div>

    </main>
  )
}

export default AdminLogin