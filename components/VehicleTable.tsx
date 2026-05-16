'use client';

import { Vehicle, User } from '../types';

interface Props {
  vehicles: Vehicle[];
  user: User | null;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: number) => void;
}

export default function VehicleTable({ vehicles, user, onEdit, onDelete }: Props) {
  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-[#C6007E] text-white px-6 py-3 text-left text-sm font-semibold">
              Marca
            </th>
            <th className="bg-[#C6007E] text-white px-6 py-3 text-left text-sm font-semibold">
              Sucursal
            </th>
            <th className="bg-[#C6007E] text-white px-6 py-3 text-left text-sm font-semibold">
              Aspirante
            </th>
            {isAdmin && (
              <th className="bg-[#C6007E] text-white px-6 py-3 text-left text-sm font-semibold">
                Acciones
              </th>
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
            vehicles.map((vehicle, index) => (
              <tr
                key={vehicle.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-3 text-sm text-gray-700 border-b border-[#E280BE]">
                  {vehicle.brand}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700 border-b border-[#E280BE]">
                  {vehicle.locality}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700 border-b border-[#E280BE]">
                  {vehicle.applicant}
                </td>
                {isAdmin && (
                  <td className="px-6 py-3 border-b border-[#E280BE]">
                    <div className="flex gap-3">
                      {/* Botón editar */}
                      <button
                        onClick={() => onEdit(vehicle)}
                        className="text-[#40CEE4] hover:opacity-70 transition-all"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      {/* Botón eliminar */}
                      <button
                        onClick={() => onDelete(vehicle.id)}
                        className="text-[#C6007E] hover:opacity-70 transition-all"
                        title="Eliminar"
                      >
                        ➖
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