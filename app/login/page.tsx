'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { login } from '@/lib/api'
import { saveTokens, isAuthenticated } from '@/lib/auth'

function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const expired      = searchParams.get('expired')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    if (isAuthenticated()) router.replace('/dashboard')
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const tokens = await login(username, password)
      saveTokens(tokens)
      router.push('/')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail
      setError(msg || 'Credenciales incorrectas.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: `url('/assets/login-bg.jpeg')` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.95) 100%)',
        }}
      />

      {/* Logo top-left */}
      <div className="absolute top-4 left-4 sm:top-9 sm:left-14 z-10">
        <Image
          src="/assets/Imagologo_motion.svg"
          alt="Motion"
          width={36}
          height={36}
          className="object-contain w-8 h-8 sm:w-14 sm:h-14"
        />
      </div>

      {/* Card */}
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full flex flex-col justify-between"
        style={{ maxWidth: '560px', padding: 'clamp(30px, 5vw, 63px) clamp(20px, 5vw, 40px)', minHeight: 'clamp(500px, 80vh, 750px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >

        {/* Logo + separador + Manager */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-2 sm:mt-4 mb-6 sm:mb-10">
          <Image
            src="/assets/Imagologo_motion.svg"
            alt="Motion Logo"
            width={64}
            height={64}
            className="object-contain flex-shrink-0 w-14 h-14 sm:w-24 sm:h-24"
          />
          <div
            className="flex-shrink-0"
            style={{ width: '1.8px', height: '70px', backgroundColor: '#00249C' }}
          />
          <span
            className="text-2xl sm:text-4xl font-bold"
            style={{ color: '#00249C', letterSpacing: '0.01em', paddingLeft: '10px' }}
          >
            Manager
          </span>
        </div>

        {/* Sesión expirada */}
        <AnimatePresence>
          {expired && (
            <motion.div
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              Tu sesión ha expirado. Por favor inicia sesión nuevamente.
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

          {/* Campo usuario */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="design@monitoringinnovation.com"
              required
              maxLength={100}
              className="w-full px-4 py-2 sm:py-3 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent"
            />
          </div>

          {/* Campo contraseña */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••••"
                required
                minLength={6}
                maxLength={50}
                className="w-full px-4 py-2 sm:py-3 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#40CEE4]"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p className="text-[#C6007E] text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Botón submit */}
          <div className="flex justify-center pt-1 sm:pt-2">
            <motion.button
              type="submit"
              disabled={loading}
              className="px-4 py-1 rounded-lg border border-[#40CEE4] text-sm text-[#40CEE4] hover:bg-[#40CEE4] hover:text-white transition-all disabled:opacity-60"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </motion.button>
          </div>

        </form>

        {/* Links */}
        <div className="flex justify-around text-xs mt-3 sm:mt-4">
          <a href="/forgot-password" className="text-[#C6007E] hover:opacity-80 transition-opacity font-semibold">
            Olvide <span className="font-bold">Mi</span> contraseña
          </a>
          <a href="/register" className="text-[#C6007E] hover:opacity-80 transition-opacity font-semibold">
            Registrarse
          </a>
        </div>

        {/* Iconos inferiores */}
        <div className="mt-3 sm:mt-4 flex justify-center gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white shadow-md flex items-center justify-center text-[#40CEE4] cursor-pointer hover:shadow-lg transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white shadow-md flex items-center justify-center text-[#40CEE4] cursor-pointer hover:shadow-lg transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}