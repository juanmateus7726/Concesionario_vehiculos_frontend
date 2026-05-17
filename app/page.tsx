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

      {/* Logo */}
      <div className="absolute top-4 left-6 z-20">
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
    animate={{ x: ['120vw', '-120vw'] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    className="absolute"
    style={{ top: '-10%' }}
  >
    <svg width="800" height="1200" viewBox="0 0 800 1200" fill="none">
  <defs>
    <filter id="shadow" x="-200%" y="-10%" width="500%" height="120%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="50" result="blur" />
      <feFlood floodColor="#666" floodOpacity="1" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="shadow" />
      <feOffset dx="-60" dy="0" in="shadow" result="shadowLeft" />
      <feMerge>
        <feMergeNode in="shadowLeft" />
        <feMergeNode in="shadowLeft" />
        <feMergeNode in="shadowLeft" />
        <feMergeNode in="shadowLeft" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <path
    d="M 600 0 Q 400 600 600 1200"
    stroke="white"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    filter="url(#shadow)"
  />
</svg>
  </motion.div>
</div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center mt-16 relative">
        <motion.div
          className="relative flex items-center justify-center w-full max-w-5xl"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* BIENVENIDO A - detrás de la imagen */}
          <div className="absolute left-0 right-0 top-[32%] z-0 flex justify-center">
            <h1
              className="text-[48px] sm:text-[70px] md:text-[100px] lg:text-[140px] font-bold text-[#00249C] uppercase leading-[1] tracking-tight whitespace-nowrap"
              style={{ WebkitTextStroke: '3px white', paintOrder: 'stroke fill' }}
            >
              BIENVENIDO A
            </h1>
          </div>

          {/* Imagen */}
          <Image
            src="/assets/Telefono-01.png"
            alt="App"
            width={700}
            height={600}
            className="object-contain relative z-10 w-[280px] sm:w-[400px] md:w-[550px] lg:w-[700px]"
            priority
          />

          {/* MONITORING INNOVATION - encima de la imagen */}
          <div className="absolute left-0 right-0 top-[45%] z-20 flex justify-center">
            <h1
              className="text-[32px] sm:text-[48px] md:text-[70px] lg:text-[95px] font-bold text-[#00249C] uppercase leading-[1] tracking-tight whitespace-nowrap"
              style={{ WebkitTextStroke: '2px white', paintOrder: 'stroke fill' }}
            >
              MONITORING INNOVATION
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Footer links */}
      <motion.div
        className="w-full flex flex-wrap justify-center gap-6 sm:gap-16 md:gap-36 pb-6 pt-0 pl-0 md:pl-20 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <a href="https://monitoringinnovation.com/" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-xs sm:text-sm md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          MONITORING INNOVATION
        </a>
        <a href="https://gpscontrol.co/" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-xs sm:text-sm md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          GPS CONTROL
        </a>
        <a href="https://github.com/juanmateus7726/Concesionario_vehiculos_frontend" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-xs sm:text-sm md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          Link repo front
        </a>
        <a href="https://github.com/juanmateus7726/Concesionario_vehiculos_backend" target="_blank" rel="noopener noreferrer"
          className="text-[#40CEE4] text-xs sm:text-sm md:text-lg font-semibold uppercase tracking-widest hover:opacity-70 transition-all">
          Link repo back
        </a>
      </motion.div>

    </main>
  );
}