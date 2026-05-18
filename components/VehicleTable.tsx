'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Vehicle, User } from '../types';

interface Props {
  vehicles: Vehicle[];
  user: User | null;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: number) => void;
}

export default function VehicleTable({ vehicles, user, onEdit, onDelete }: Props) {
  const isAdmin = user?.role === 'admin';
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setConfirmId(id);
  };

  const confirmDelete = () => {
    if (!confirmId) return;
    setDeletingId(confirmId);
    setConfirmId(null);
    setTimeout(() => {
      onDelete(confirmId);
      setDeletingId(null);
    }, 400);
  };

  return (
    <>
      {/* Modal confirmación */}
      <AnimatePresence>
        {confirmId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setConfirmId(null)} />

            {/* Card */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 z-10"
              style={{ maxWidth: '400px', width: '90%' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-14 h-14 rounded-full bg-[#C6007E]/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C6007E" strokeWidth="2.5">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </div>
              <p className="text-center text-gray-600 text-sm font-medium">
                ¿Estás seguro que quieres eliminar este vehículo?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setConfirmId(null)}
                  className="px-6 py-2 rounded-full border border-[#C5C5C5] text-gray-400 text-sm hover:opacity-70 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 rounded-full bg-[#C6007E] text-white text-sm hover:opacity-90 transition-all"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="bg-[#C6007E] text-white px-25 py-3.5 text-left text-lg font-semibold">Marca</th>
              <th className="bg-[#C6007E] text-white px-25 py-3.5 text-left text-lg font-semibold">Sucursal</th>
              <th className="bg-[#C6007E] text-white px-25 py-3.5 text-left text-lg font-semibold">Aspirante</th>
              {isAdmin && <th className="bg-[#C6007E] text-white px-25 py-3.5" />}
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 4 : 3} className="text-center py-8 text-gray-400">
                  No hay vehículos registrados
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle, index) => (
                <motion.tr
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className={`border-b border-[#E280BE] transition-all duration-400 ${
                    deletingId === vehicle.id
                      ? 'opacity-0 scale-95 translate-x-10'
                      : 'opacity-100 scale-100 translate-x-0'
                  }`}
                >
                  <td className="px-20 py-2 text-lg text-gray-600">{vehicle.brand}</td>
                  <td className="px-20 py-2 text-lg text-gray-600">{vehicle.locality}</td>
                  <td className="px-20 py-2 text-lg text-gray-600">{vehicle.applicant}</td>
                  {isAdmin && (
                    <td className="px-20 py-4">
                      <div className="flex gap-3 items-center">
                        <button onClick={() => onEdit(vehicle)} className="hover:opacity-70 transition-all">
                          <Image src="/assets/Icon_editar1.svg" alt="Editar" width={28} height={28} />
                        </button>
                        <button onClick={() => handleDelete(vehicle.id)} className="hover:opacity-70 transition-all">
                          <Image src="/assets/Icon_eliminar1.svg" alt="Eliminar" width={28} height={28} />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}