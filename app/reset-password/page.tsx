'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function ResetPasswordForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const uid          = searchParams.get('uid')
  const token        = searchParams.get('token')

  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [showConf, setShowConf]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [success, setSuccess]     = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/auth/password-reset/confirm/`, {
        uid,
        token,
        password,
      })
      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch {
      setError('El enlace es inválido o ha expirado.')
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
          background: 'linear-gradient(135deg, rgba(64,206,228,0.4) 0%, rgba(198,0,126,0.3) 100%)',
        }}
      />

      {/* Logo top-left */}
      <div className="absolute top-9 left-14 z-10">
        <Image src="/assets/Imagologo_motion.svg" alt="Motion" width={55} height={55} className="object-contain" />
      </div>

      {/* Card */}
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full mx-4 flex flex-col justify-between"
        style={{ maxWidth: '560px', padding: '63px 40px', minHeight: '750px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >

        {/* Logo + separador + Manager */}
        <div className="flex items-center justify-center gap-5 mt-4 mb-10">
          <Image src="/assets/Imagologo_motion.svg" alt="Motion Logo" width={100} height={100} className="object-contain flex-shrink-0" />
          <div className="flex-shrink-0" style={{ width: '1.8px', height: '95px', backgroundColor: '#00249C' }} />
          <span className="text-4xl font-bold" style={{ color: '#00249C', paddingLeft: '15px' }}>
            Manager
          </span>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">

            <p className="text-sm text-gray-500 text-center">
              Ingresa tu nueva contraseña:
            </p>

            {/* Nueva contraseña */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
                Nueva Contraseña
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
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent pr-10 placeholder-[#40CEE4]"
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
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent pr-10 placeholder-[#40CEE4]"
                />
                <button type="button" onClick={() => setShowConf(!showConf)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#40CEE4]">
                  {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p className="text-[#C6007E] text-xs"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-2">
              <motion.button
                type="submit"
                disabled={loading}
                className="px-14 py-2.5 rounded-full border border-[#40CEE4] text-sm text-[#40CEE4] hover:bg-[#40CEE4] hover:text-white transition-all disabled:opacity-60"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? 'Guardando...' : 'Restablecer contraseña'}
              </motion.button>
            </div>

          </form>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#40CEE4]/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#40CEE4" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              ¡Contraseña actualizada! Redirigiendo al login...
            </p>
          </motion.div>
        )}

        <div className="mt-10">
          <motion.button
            onClick={() => router.push('/login')}
            className="px-8 py-2.5 rounded-full bg-[#C6007E] text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ← Volver
          </motion.button>
        </div>

      </motion.div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}