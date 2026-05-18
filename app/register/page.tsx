'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { register } from '@/lib/api'

function RegisterForm() {
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [showConf, setShowConf]   = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await register({
        username: email,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password: confirm,
        role: 'viewer',
      })
      router.push('/login')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail
      setError(msg || 'Error al registrarse. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: `url('/assets/login-bg.jpeg')` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(226,128,190,0.95) 100%)',
        }}
      />

      {/* Logo top-left */}
      <div className="absolute top-9 left-14 z-10">
        <Image src="/assets/Imagologo_motion.svg" alt="Motion" width={55} height={55} className="object-contain" />
      </div>

      {/* Card */}
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full mx-4 flex flex-col justify-between"
        style={{ maxWidth: '560px', padding: '50px 40px 40px', minHeight: '750px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >

        {/* Logo + separador + Manager */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image src="/assets/Imagologo_motion.svg" alt="Motion Logo" width={100} height={100} className="object-contain flex-shrink-0" />
          <div className="flex-shrink-0" style={{ width: '1.8px', height: '95px', backgroundColor: '#00249C' }} />
          <span className="text-4xl font-bold" style={{ color: '#00249C', paddingLeft: '15px' }}>
            Manager
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Nombre + Apellido */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
                Nombre
              </label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="NOMBRE"
                required
                maxLength={50}
                className="w-full px-4 py-2.5 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent uppercase"
              />
            </div>
            <span className="text-[#40CEE4] text-2xl font-bold mt-5">+</span>
            <div className="flex-1">
              <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
                Apellido
              </label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="APELLIDO"
                required
                maxLength={50}
                className="w-full px-4 py-2.5 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent uppercase"
              />
            </div>
          </div>

          {/* Correo */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="design@monitoringinnovation.com"
              required
              maxLength={100}
              className="w-full px-4 py-2.5 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent"
            />
          </div>

          {/* Contraseña */}
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
                className="w-full px-4 py-2.5 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent pr-10"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#40CEE4]">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                type={showConf ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••••••••"
                required
                minLength={6}
                maxLength={50}
                className="w-full px-4 py-2.5 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent pr-10"
              />
              <button type="button" onClick={() => setShowConf(!showConf)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#40CEE4]">
                {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p className="text-[#C6007E] text-xs"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Términos */}
          <p className="text-xs text-center text-gray-400">
            Al hacer clic en crear cuenta, acepta los términos de las{' '}
            <a href="#" className="text-[#40CEE4] underline">políticas de privacidad</a>{' '}
            y{' '}
            <a href="#" className="text-[#40CEE4] underline">términos del servicio</a>
          </p>

          {/* Botones */}
          <div className="flex justify-center gap-4 pt-2">
            <motion.button
              type="button"
              onClick={() => router.push('/login')}
              className="px-8 py-2 rounded-lg border-2 border-[#C6007E] bg-[#C6007E] text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ← Volver
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-lg border-2 border-[#40CEE4] text-[#40CEE4] text-sm font-semibold hover:bg-[#40CEE4] hover:text-white transition-all disabled:opacity-60"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </motion.button>
          </div>

        </form>

      </motion.div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}