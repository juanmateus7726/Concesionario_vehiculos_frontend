'use client';

import { useState } from 'react';
import Image from 'next/image';
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

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 400);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-[#C6007E] text-white px-8 py-4 text-left text-sm font-semibold">
              Marca
            </th>
            <th className="bg-[#C6007E] text-white px-8 py-4 text-left text-sm font-semibold">
              Sucursal
            </th>
            <th className="bg-[#C6007E] text-white px-8 py-4 text-left text-sm font-semibold">
              Aspirante
            </th>
            {isAdmin && (
              <th className="bg-[#C6007E] text-white px-8 py-4 text-left text-sm font-semibold" />
            )}
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
            vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className={`border-b border-[#E280BE] transition-all duration-400 ${
                  deletingId === vehicle.id
                    ? 'opacity-0 scale-95 translate-x-10'
                    : 'opacity-100 scale-100 translate-x-0'
                }`}
              >
                <td className="px-8 py-4 text-sm text-gray-600">{vehicle.brand}</td>
                <td className="px-8 py-4 text-sm text-gray-600">{vehicle.locality}</td>
                <td className="px-8 py-4 text-sm text-gray-600">{vehicle.applicant}</td>
                {isAdmin && (
                  <td className="px-8 py-4">
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => onEdit(vehicle)}
                        className="hover:opacity-70 transition-all"
                      >
                        <Image src="/assets/Icon_editar1.svg" alt="Editar" width={28} height={28} />
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="hover:opacity-70 transition-all"
                      >
                        <Image src="/assets/Icon_eliminar1.svg" alt="Eliminar" width={28} height={28} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}