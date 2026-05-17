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
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      {/* Fondo con imagen de carros */}
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: `url('/assets/login-bg.jpeg')` }}
      />

      {/* Overlay gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(64,206,228,0.4) 0%, rgba(198,0,126,0.3) 100%)',
        }}
      />

      {/* Logo top-left */}
      <div className="absolute top-9 left-14 z-10">
        <Image
          src="/assets/Imagologo_motion.svg"
          alt="Motion"
          width={36}
          height={36}
          className="object-contain"
          style={{ width: '55px', height: 'auto' }}
        />
      </div>

      {/* Card de login — misma altura y ancho */}
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full mx-4 flex flex-col justify-between"
        style={{ maxWidth: '560px', padding: '63px 40px', minHeight: '750px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >

        {/* Logo + separador + Manager — CENTRADO */}
        <div className="flex items-center justify-center gap-5 mt-4 mb-10">
          <Image
            src="/assets/Imagologo_motion.svg"
            alt="Motion Logo"
            width={64}
            height={64}
            className="object-contain flex-shrink-0"
            style={{ width: '100px', height: 'auto' }}
          />
          <div
            className="flex-shrink-0"
            style={{ width: '1.8px', height: '95px', backgroundColor: '#00249C' }}
          />
          <span
            className="text-4xl font-bold pl-4"
            style={{
              fontFamily: 'var(--font-montserrat)',
              color: '#00249C',
              letterSpacing: '0.01em',
              paddingLeft: '15px',
            }}
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

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Campo usuario */}
          <div>
            <label
              className="block text-xs font-bold tracking-widest uppercase mb-2"
              style={{ fontFamily: 'var(--font-montserrat)', color: '#00249C' }}
            >
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="  design@monitoringinnovation.com"
              required
              className="w-full px-4 py-3 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent"
            />
          </div>

          {/* Campo contraseña */}
          <div>
            <label
              className="block text-xs font-bold tracking-widest uppercase mb-2"
              style={{ fontFamily: 'var(--font-montserrat)', color: '#00249C' }}
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="  ••••••••••••••"
                required
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent pr-10 placeholder-[#40CEE4]"
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
              <motion.p
                className="text-[#C6007E] text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Botón */}
          <div className="flex justify-center pt-2">
            <motion.button
              type="submit"
              disabled={loading}
              className="px-14 py-2.5 rounded-full border border-[#40CEE4] text-sm text-[#40CEE4] hover:bg-[#40CEE4] hover:text-white transition-all disabled:opacity-60"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </motion.button>
          </div>
        </form>

        {/* Links */}
        <div className="mt-10 flex justify-between text-xs">
          <a href="#" className="text-[#C6007E] hover:opacity-80 transition-opacity">
            Olvidé <span className="font-bold">Mi</span> contraseña
          </a>
          <a href="#" className="text-[#C6007E] hover:opacity-80 transition-opacity font-semibold">
            Registrarse
          </a>
        </div>

        {/* Iconos inferiores */}
        <div className="mt-10 flex justify-center gap-6">
          <div className="w-14 h-14 rounded-full border-2 border-[#40CEE4] bg-white shadow-sm flex items-center justify-center text-[#40CEE4] cursor-pointer hover:bg-[#40CEE4]/10 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="w-14 h-14 rounded-full border-2 border-[#40CEE4] bg-white shadow-sm flex items-center justify-center text-[#40CEE4] cursor-pointer hover:bg-[#40CEE4]/10 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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