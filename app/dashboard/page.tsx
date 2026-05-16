'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/axios';
import { Vehicle, User } from '../../types';
import Navbar from '../../components/Navbar';
import VehicleTable from '../../components/VehicleTable';
import VehicleModal from '../../components/VehicleModal';

export default function DashboardPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleSave = async (data: Partial<Vehicle>) => {
    try {
      if (selectedVehicle) {
        await api.patch(`/api/vehicles/${selectedVehicle.id}/`, data);
      } else {
        await api.post('/api/vehicles/', {
          ...data,
          model: 'N/A',
          year: 2024,
          price: '0',
        });
      }
      setShowModal(false);
      setSelectedVehicle(null);
      fetchVehicles();
    } catch {
      console.error('Error guardando vehículo');
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#00249C]">
            Vehículos registrados
          </h2>
          {isAdmin && (
            <button
              onClick={() => { setSelectedVehicle(null); setShowModal(true); }}
              className="flex items-center gap-2 bg-[#40CEE4] text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-all"
            >
              + Agregar
            </button>
          )}
        </div>

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
      </main>

      {showModal && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => { setShowModal(false); setSelectedVehicle(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}