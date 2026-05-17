'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '../../lib/axios';
import { Vehicle, User } from '../../types';
import Navbar from '../../components/Navbar';
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

  const fetchVehicles = useCallback(async () => {
    try {
      const res = await api.get<Vehicle[]>('/api/vehicles/');
      setVehicles(res.data);
    } catch {
      console.error('Error cargando vehículos');
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
  };

  const handleCancel = () => {
    setSelectedVehicle(null);
    setBrand('');
    setLocality('');
    setApplicant('');
  };

  const handleSave = async () => {
    if (!brand || !locality || !applicant) return;
    try {
      if (selectedVehicle) {
        await api.patch(`/api/vehicles/${selectedVehicle.id}/`, { brand, locality, applicant });
      } else {
        await api.post('/api/vehicles/', {
          brand, locality, applicant,
          model: 'N/A',
          year: 2024,
          price: '0',
        });
      }
      handleCancel();
      fetchVehicles();
    } catch {
      console.error('Error guardando vehículo');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar este vehículo?')) return;
    try {
      await api.delete(`/api/vehicles/${id}/`);
      fetchVehicles();
    } catch {
      console.error('Error eliminando vehículo');
    }
  };

  const isAdmin = user?.role === 'admin';
  const isEditing = selectedVehicle !== null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex gap-12 px-6 py-6 flex-1">

        {isAdmin && (
          <div className="w-64 shrink-0 flex flex-col gap-5 pt-2">

            {/* + e ícono bus — solo se muestra al crear */}
            {!isEditing && (
              <div className="flex items-center gap-2">
                <span className="text-[#40CEE4] text-3xl font-bold">+</span>
                <Image src="/assets/Icon_vehiculo1.svg" alt="Bus" width={36} height={36} />
              </div>
            )}

            {/* Campo marca — sin ícono de bus */}
            <div className="flex items-center gap-3">
              <div className="w-7 shrink-0" />
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Mazda"
                className="w-full border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#40CEE4] transition-all"
              />
            </div>

            {/* Campo localidad */}
            <div className="flex items-center gap-3">
              <Image src="/assets/Icon_puntoubicacion.svg" alt="Localidad" width={28} height={28} className="shrink-0" />
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="Chapinero"
                className="w-full border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#40CEE4] transition-all"
              />
            </div>

            {/* Campo aspirante */}
            <div className="flex items-center gap-3">
              <Image src="/assets/Icon_persona.svg" alt="Aspirante" width={28} height={28} className="shrink-0" />
              <input
                type="text"
                value={applicant}
                onChange={(e) => setApplicant(e.target.value)}
                placeholder="David Sandoval"
                className="w-full border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#40CEE4] transition-all"
              />
            </div>

            {/* Botones — texto al crear, SVG al editar */}
            {isEditing ? (
              <div className="flex justify-end gap-3">
                <button onClick={handleCancel} className="hover:opacity-70 transition-all">
                  <Image src="/assets/Icon_cancelar.svg" alt="Cancelar" width={40} height={40} />
                </button>
                <button onClick={handleSave} className="hover:opacity-70 transition-all">
                  <Image src="/assets/Icon_confirmar.svg" alt="Confirmar" width={40} height={40} />
                </button>
              </div>
            ) : (
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="border border-[#C6007E] text-[#C6007E] rounded-full px-5 py-2 text-sm hover:bg-[#C6007E] hover:text-white transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="border border-[#40CEE4] text-[#40CEE4] rounded-full px-5 py-2 text-sm hover:bg-[#40CEE4] hover:text-white transition-all"
                >
                  Crear
                </button>
              </div>
            )}

          </div>
        )}

        {/* Tabla derecha */}
        <div className="flex-1 min-w-0">
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

      <footer className="w-full flex justify-center py-6">
        <Image
          src="/assets/Imagologotipo_motion.svg"
          alt="Motion"
          width={120}
          height={35}
        />
      </footer>

    </div>
  );
}