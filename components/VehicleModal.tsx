'use client';

import { useState, useEffect } from 'react';
import { Vehicle } from '../types';

interface Props {
  vehicle?: Vehicle | null;
  onClose: () => void;
  onSave: (data: Partial<Vehicle>) => void;
}

export default function VehicleModal({ vehicle, onClose, onSave }: Props) {
  const [brand, setBrand] = useState('');
  const [locality, setLocality] = useState('');
  const [applicant, setApplicant] = useState('');

  // Si viene un vehículo, llenamos los campos para editar
  useEffect(() => {
    if (vehicle) {
      setBrand(vehicle.brand ?? '');
      setLocality(vehicle.locality ?? '');
      setApplicant(vehicle.applicant ?? '');
    }
  }, [vehicle]);

  const handleSave = () => {
    if (!brand || !locality || !applicant) return;
    onSave({ brand, locality, applicant });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">

        {/* Ícono y campos */}
        <div className="flex flex-col gap-4">

          {/* Marca */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Mazda"
              className="w-full border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-gray-800 bg-white outline-none focus:border-[#40CEE4]"
            />
          </div>

          {/* Localidad */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="Chapinero"
              className="w-full border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-gray-800 bg-white outline-none focus:border-[#40CEE4]"
            />
          </div>

          {/* Aspirante */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <input
              type="text"
              value={applicant}
              onChange={(e) => setApplicant(e.target.value)}
              placeholder="David Sandoval"
              className="w-full border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-gray-800 bg-white outline-none focus:border-[#40CEE4]"
            />
          </div>

        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#C6007E] flex items-center justify-center text-white text-xl hover:opacity-80 transition-all"
          >
            ✕
          </button>
          <button
            onClick={handleSave}
            className="w-10 h-10 rounded-full bg-[#40CEE4] flex items-center justify-center text-white text-xl hover:opacity-80 transition-all"
          >
            ✓
          </button>
        </div>

      </div>
    </div>
  );
}