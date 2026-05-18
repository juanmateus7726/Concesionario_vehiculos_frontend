'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/auth/password-reset/`, { email })
      setSuccess(true)
    } catch {
      setError('Ocurrió un error. Intenta de nuevo.')
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
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(64,206,228,0.9) 100%',
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
        <div className="flex items-center justify-center gap-5 mt-4 mb-12">
          <Image src="/assets/Imagologo_motion.svg" alt="Motion Logo" width={100} height={100} className="object-contain flex-shrink-0" />
          <div className="flex-shrink-0" style={{ width: '1.8px', height: '95px', backgroundColor: '#00249C' }} />
          <span className="text-4xl font-bold" style={{ color: '#00249C', paddingLeft: '15px' }}>
            Manager
          </span>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">

            <p className="text-sm text-gray-500 text-center">
              Digite el correo electrónico con el que se registró la cuenta:
            </p>

            <div>
              <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#00249C' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="demo@gmail.com"
                required
                maxLength={100}
                className="w-full px-4 py-3 text-sm text-[#40CEE4] placeholder-[#40CEE4]/60 border border-gray-200 rounded-full focus:outline-none focus:border-[#40CEE4] transition-colors bg-transparent"
              />
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
                className="px-4 py-2 rounded-lg border-2 border-[#40CEE4] text-sm text-[#40CEE4] hover:bg-[#40CEE4] hover:text-white transition-all disabled:opacity-60"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? 'Enviando...' : 'Enviar correo'}
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
              Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
            </p>
          </motion.div>
        )}

        {/* Botón volver */}
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