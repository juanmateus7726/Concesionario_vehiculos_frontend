'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex flex-col px-4">

      {/* Logo — click va al dashboard */}
      <div className="absolute top-4 left-6 z-20 cursor-pointer" onClick={() => router.push('/dashboard')}>
        <Image
          src="/assets/Imagologo_motion.svg"
          alt="Logo"
          width={60}
          height={60}
          className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14"
        />
      </div>

      {/* Animación ola */}
<div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
  <motion.div
    className="absolute inset-0 pointer-events-none"
    animate={{ x: ['110vw', '-30vw'] }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatDelay: 2
    }}
  >
    <svg
      style={{ height: '100vh', width: '100px' }}
      viewBox="0 0 400 800"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <path
        d="M 350 0 Q 0 400 350 800"
        fill="none"
        stroke="rgba(180,180,180,0.3)"
        strokeWidth="40"
        strokeLinecap="round"
        filter="url(#blur)"
      />
    </svg>
  </motion.div>
</div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center mt-8 sm:mt-16 relative">
        <motion.div
          className="relative flex items-center justify-center w-full max-w-5xl"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* BIENVENIDO A - detrás de la imagen */}
          <div
            className="absolute left-0 right-0 z-0 flex justify-center"
            style={{ top: '32%', paddingRight: 'clamp(0px, 4vw, 60px)' }}
          >
            <h1
              className="text-[28px] xs:text-[36px] sm:text-[55px] md:text-[80px] lg:text-[140px] font-bold text-[#00249C] uppercase leading-[1] tracking-tight whitespace-nowrap"
              style={{ WebkitTextStroke: 'clamp(2px, 0.4vw, 5px) white', paintOrder: 'stroke fill' }}
            >
              BIENVENIDO A
            </h1>
          </div>

          {/* Imagen */}
          <Image
            src="/assets/Telefono-01.png"
            onClick={() => router.push('/dashboard')}
            alt="App"
            width={700}
            height={600}
            className="object-contain relative z-10 w-[200px] sm:w-[320px] md:w-[450px] lg:w-[700px] cursor-pointer"
            priority
          />

          {/* MONITORING INNOVATION - encima de la imagen */}
          <div className="absolute left-0 right-0 z-20 flex justify-center" style={{ top: '45%' }}>
            <h1
              className="text-[18px] xs:text-[24px] sm:text-[38px] md:text-[55px] lg:text-[95px] font-bold text-[#00249C] uppercase leading-[1] tracking-tight whitespace-nowrap"
              style={{ WebkitTextStroke: 'clamp(1px, 0.3vw, 5px) white', paintOrder: 'stroke fill' }}
            >
              MONITORING INNOVATION
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Footer links */}
      <motion.div
        className="w-full flex flex-wrap justify-center gap-4 sm:gap-10 md:gap-36 pb-6 pt-4 pl-0 md:pl-20 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <a href="https://monitoringinnovation.com/" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-[10px] sm:text-xs md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          MONITORING INNOVATION
        </a>
        <a href="https://gpscontrol.co/" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-[10px] sm:text-xs md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          GPS CONTROL
        </a>
        <a href="https://github.com/juanmateus7726/Concesionario_vehiculos_frontend" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-[10px] sm:text-xs md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          Link repo front
        </a>
        <a href="https://github.com/juanmateus7726/Concesionario_vehiculos_backend" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-[10px] sm:text-xs md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          Link repo back
        </a>
      </motion.div>

    </main>
  );
}