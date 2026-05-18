'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/axios';
import { Vehicle, User } from '../../types';
import VehicleTable from '../../components/VehicleTable';

export default function DashboardPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [brand, setBrand] = useState('');
  const [locality, setLocality] = useState('');
  const [applicant, setApplicant] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const showMessage = (type: 'error' | 'success', msg: string) => {
    if (type === 'error') setErrorMsg(msg);
    else setSuccessMsg(msg);
    setTimeout(() => { setErrorMsg(''); setSuccessMsg(''); }, 3000);
  };

  const fetchVehicles = useCallback(async () => {
    try {
      const res = await api.get<Vehicle[]>('/api/vehicles/');
      setVehicles(res.data);
    } catch {
      showMessage('error', 'Error cargando vehículos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData) as User);
    fetchVehicles();
  }, [router, fetchVehicles]);

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setBrand(vehicle.brand);
    setLocality(vehicle.locality);
    setApplicant(vehicle.applicant);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setSelectedVehicle(null);
    setBrand('');
    setLocality('');
    setApplicant('');
    setIsOpen(false);
  };

  const handleSave = async () => {
    if (!brand || !locality || !applicant) return;
    try {
      if (selectedVehicle) {
        await api.patch(`/api/vehicles/${selectedVehicle.id}/`, { brand, locality, applicant });
        showMessage('success', 'Vehículo actualizado correctamente.');
      } else {
        await api.post('/api/vehicles/', {
          brand, locality, applicant,
          model: 'N/A',
          year: 2024,
          price: '0',
        });
        showMessage('success', 'Vehículo creado correctamente.');
      }
      handleCancel();
      fetchVehicles();
    } catch {
      showMessage('error', 'Error guardando el vehículo. Intenta de nuevo.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/vehicles/${id}/`);
      showMessage('success', 'Vehículo eliminado correctamente.');
      fetchVehicles();
    } catch {
      showMessage('error', 'Error eliminando el vehículo. Intenta de nuevo.');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-white flex flex-col relative">

      {/* Toast */}
      <AnimatePresence>
        {(errorMsg || successMsg) && (
          <motion.div
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-full text-white text-sm font-semibold shadow-lg ${
              errorMsg ? 'bg-[#C6007E]' : 'bg-[#40CEE4]'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {errorMsg || successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Usuario dropdown */}
      <div className="absolute top-4 right-4 sm:right-6 z-30">
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="flex items-center gap-2 text-[#00249C] hover:opacity-70 transition-all"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#40CEE4] flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-sm font-semibold">{user?.username}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <motion.div
                  className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-2 w-44 z-50"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Rol</p>
                    <p className="text-sm font-semibold text-[#00249C] capitalize">{user?.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('access_token');
                      localStorage.removeItem('refresh_token');
                      localStorage.removeItem('user');
                      document.cookie = 'access_token=; path=/; max-age=0';
                      router.push('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#C6007E] hover:bg-[#C6007E]/5 transition-all flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Cerrar sesión
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="flex flex-col md:flex-row gap-6 md:gap-12 px-4 md:px-6 py-16 md:py-10 flex-1 items-start">

        {isAdmin && (
          <div className="w-full md:w-[400px] md:shrink-0 flex flex-col gap-4 bg-white rounded-2xl shadow-md p-4 md:p-6 md:ml-10" style={{ alignSelf: 'flex-start' }}>

            {/* Botón + */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => !isOpen && setIsOpen(true)}>
              <motion.span
                className="text-[#40CEE4] text-2xl font-bold"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
            </div>

            {/* Inputs — siempre visibles, iconos cambian de color */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={isOpen ? "/assets/Icon_vehiculo1.svg" : "/assets/Icon_vehiculo.svg"}
                  alt="Marca" width={28} height={28} className="shrink-0"
                />
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Mazda"
                  maxLength={100}
                  disabled={!isOpen}
                  className="w-full border border-[#C5C5C5] rounded-full px-5 py-2.5 text-sm md:text-lg text-gray-400 bg-white outline-none focus:border-[#40CEE4] transition-all disabled:opacity-60"
                />
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src={isOpen ? "/assets/Icon_puntoubicacion1.svg" : "/assets/Icon_puntoubicacion.svg"}
                  alt="Localidad" width={28} height={28} className="shrink-0"
                />
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Chapinero"
                  maxLength={50}
                  disabled={!isOpen}
                  className="w-full border border-[#C5C5C5] rounded-full px-5 py-2.5 text-sm md:text-lg text-gray-400 bg-white outline-none focus:border-[#40CEE4] transition-all disabled:opacity-60"
                />
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src={isOpen ? "/assets/Icon_persona1.svg" : "/assets/Icon_persona.svg"}
                  alt="Aspirante" width={28} height={28} className="shrink-0"
                />
                <input
                  type="text"
                  value={applicant}
                  onChange={(e) => setApplicant(e.target.value)}
                  placeholder="David Sandoval"
                  maxLength={100}
                  disabled={!isOpen}
                  className="w-full border border-[#C5C5C5] rounded-full px-5 py-2.5 text-sm md:text-lg text-gray-400 bg-white outline-none focus:border-[#40CEE4] transition-all disabled:opacity-60"
                />
              </div>

              {/* Botones — solo visibles cuando isOpen */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="flex justify-end gap-3"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedVehicle ? (
                      <>
                        <button onClick={handleCancel} className="hover:opacity-70 transition-all">
                          <Image src="/assets/Icon_cancelar.svg" alt="Cancelar" width={40} height={40} />
                        </button>
                        <button onClick={handleSave} className="hover:opacity-70 transition-all">
                          <Image src="/assets/Icon_confirmar.svg" alt="Confirmar" width={40} height={40} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleCancel}
                          className="border border-[#C6007E] text-[#C6007E] rounded-full px-5 py-2 text-sm md:text-lg hover:bg-[#C6007E] hover:text-white transition-all"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSave}
                          className="border border-[#40CEE4] text-[#40CEE4] rounded-full px-5 py-2 text-sm md:text-lg hover:bg-[#40CEE4] hover:text-white transition-all"
                        >
                          Crear
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        )}

        <div className="w-full flex-1 min-w-0 overflow-x-auto flex justify-center">
          {loading ? (
            <p className="text-center text-gray-400 py-10">Cargando...</p>
          ) : (
            <VehicleTable
              vehicles={vehicles}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

      </main>

      <footer className="w-full flex justify-center py-6" onClick={() => router.push('/')}>
        <Image
          src="/assets/Imagologotipo_motion.svg"
          alt="Motion"
          width={180}
          height={50}
          className="w-28 sm:w-36 md:w-44"
        />
      </footer>

    </div>
  );
}