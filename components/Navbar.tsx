'use client';

import { useRouter } from 'next/navigation';
import { User } from '../types';

export default function Navbar() {
  const router = useRouter();

  const getUser = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const user = getUser();

  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00249C] to-[#C6007E]" />
        <span className="text-[#00249C] font-bold text-lg">Manager</span>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-500">
            {user.username}{' '}
            <span className="text-[#C6007E] font-semibold">({user.role})</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-sm border border-[#C6007E] text-[#C6007E] px-4 py-1 rounded-full hover:bg-[#C6007E] hover:text-white transition-all duration-300"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}