import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Users,
  BedDouble,
  Maximize2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wifi,
  Tv,
  Wind,
  ArrowUpRight,
  CalendarCheck,
  Navigation
} from 'lucide-react'

export default function ApartmentCard({ apartment, onOpenDetails, onBook, index }) {
  const [currentImg, setCurrentImg] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const images = (apartment.images || []).map((img) =>
    img.startsWith('/') ? `${import.meta.env.BASE_URL}${img.slice(1)}` : img
  )

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImg((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E7DEC3]/70 shadow-[0_10px_35px_-15px_rgba(28,25,23,0.08)] hover:shadow-[0_24px_50px_-15px_rgba(154,72,48,0.16)] transition-all duration-500"
    >
      {/* Image Carousel Header */}
      <div
        onClick={() => onOpenDetails(apartment)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2ECE1] cursor-pointer select-none"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImg]}
            src={images[currentImg]}
            alt={`${apartment.title} — фото ${currentImg + 1}`}
            initial={{ opacity: 0.7, scale: 1.03 }}
            animate={{ opacity: 1, scale: isHovered ? 1.04 : 1 }}
            exit={{ opacity: 0.7 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>

        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/25 pointer-events-none" />

        {/* Top badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#FAF7F2]/95 text-[#1C1917] backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
            {apartment.badge}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md">
            {currentImg + 1} / {images.length}
          </span>
        </div>

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1C1917] flex items-center justify-center shadow-md opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1C1917] flex items-center justify-center shadow-md opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImg(idx)
              }}
              aria-label={`Перейти к фото ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentImg ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>

        {/* Price tag overlaid on bottom left */}
        <div className="absolute bottom-3.5 left-4 pointer-events-none">
          <div className="flex items-baseline gap-1 text-white drop-shadow-sm">
            <span className="text-xs uppercase tracking-wider text-white/85">от</span>
            <span className="text-2xl font-bold tracking-tight">{apartment.priceFormatted}</span>
            <span className="text-xs text-white/90">/ сутки</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Address & Metro */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#78716C] mb-2">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#57534E] truncate">
            <MapPin className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
            {apartment.address.replace('Нижний Новгород, ', '')}
          </span>
          {apartment.metro?.[0] && (
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-md bg-[#F5EFE6] text-[#6E5D4F] font-medium">
              <Navigation className="w-3 h-3 text-[#C86D51]" />
              м. {apartment.metro[0].name}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(apartment)}
          className="text-xl sm:text-2xl font-bold text-[#1C1917] leading-snug mb-2 group-hover:text-[#B85A3E] transition-colors cursor-pointer"
        >
          {apartment.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-[#57534E] line-clamp-2 mb-4 leading-relaxed">
          {apartment.subtitle}
        </p>

        {/* Key Specs Row */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE7DA] mb-4 text-xs text-[#44403C]">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#C86D51] shrink-0" />
            <span>до {apartment.maxGuests} гостей</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-[#C86D51] shrink-0" />
            <span>{apartment.area} м²</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#C86D51] shrink-0" />
            <span>{apartment.floor} эт.</span>
          </div>
        </div>

        {/* Highlight Amenity Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {apartment.highlights.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3EDE2] text-[#44403C]"
            >
              {tag}
            </span>
          ))}
          {apartment.highlights.length > 4 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3EDE2] text-[#78716C]">
              +{apartment.highlights.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-2 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenDetails(apartment)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-[#1C1917] bg-[#F3EDE2] hover:bg-[#E7DEC3] transition-colors cursor-pointer"
          >
            <span>Подробнее</span>
            <ArrowUpRight className="w-4 h-4 text-[#78716C]" />
          </button>
          <button
            type="button"
            onClick={() => onBook(apartment)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-[#C86D51] hover:bg-[#B2593E] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Забронировать</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
