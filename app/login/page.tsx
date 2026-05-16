'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/axios';
import { LoginResponse } from '../../types';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post<LoginResponse>('/api/auth/login/', {
        username,
        password,
      });

      // Guardamos el token y el usuario en localStorage
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      router.push('/dashboard');
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">

        {/* Logo y título */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00249C] to-[#C6007E]" />
          <h1 className="text-3xl font-bold text-[#00249C]">Manager</h1>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-[#00249C] tracking-widest">
              USUARIO
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-[#40CEE4] outline-none py-2 text-sm text-gray-600 mt-1"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#00249C] tracking-widest">
              CONTRASEÑA
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[#40CEE4] outline-none py-2 text-sm text-gray-600 mt-1"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-[#C6007E] text-sm text-center">{error}</p>
          )}

          {/* Botón */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-4 border border-[#00249C] text-[#00249C] rounded-full py-2 text-sm font-semibold hover:bg-[#00249C] hover:text-white transition-all duration-300"
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm mt-2">
            <span className="text-[#C6007E] cursor-pointer">
              Olvide <strong>Mi</strong> contraseña
            </span>
            <span className="text-[#C6007E] cursor-pointer">
              Registrarse
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}