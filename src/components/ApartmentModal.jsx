import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  BedDouble,
  Maximize2,
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Navigation,
  ExternalLink,
  CalendarCheck,
  Info,
  HeartHandshake
} from 'lucide-react'

export default function ApartmentModal({ apartment, onClose, onBook }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (!apartment) return
    setActiveImg(0)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') {
        setActiveImg((prev) => (prev + 1) % apartment.images.length)
      }
      if (e.key === 'ArrowLeft') {
        setActiveImg((prev) => (prev - 1 + apartment.images.length) % apartment.images.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [apartment, onClose])

  if (!apartment) return null

  const images = (apartment.images || []).map((img) =>
    img.startsWith('/') ? `${import.meta.env.BASE_URL}${img.slice(1)}` : img
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E7DEC3] overflow-hidden flex flex-col"
        >
          {/* Sticky Top Bar */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-white/90 backdrop-blur-md border-b border-[#E7DEC3]/80 z-20">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EDE2] text-[#9A4830]">
                <Sparkles className="w-3.5 h-3.5" />
                {apartment.badge}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-[#1C1917] truncate">
                {apartment.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть окно"
              className="w-10 h-10 rounded-full bg-[#F3EDE2] hover:bg-[#E7DEC3] text-[#1C1917] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-8">
            {/* Full Photo Gallery Section */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#1C1917] shadow-inner">
                <img
                  src={images[activeImg]}
                  alt={`${apartment.title} — фото ${activeImg + 1}`}
                  className="w-full h-full object-contain sm:object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

                <button
                  type="button"
                  onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                  aria-label="Предыдущее фото"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1C1917] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                  aria-label="Следующее фото"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1C1917] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-3.5 right-4 px-3 py-1 rounded-full bg-black/65 text-white text-xs font-medium backdrop-blur-md">
                  Фото {activeImg + 1} из {images.length}
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`relative h-16 sm:h-20 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      i === activeImg
                        ? 'border-[#C86D51] ring-2 ring-[#C86D51]/30 scale-[1.02]'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
              {/* Left 2 Columns: Details, Description, Landmarks, Amenities */}
              <div className="lg:col-span-2 space-y-7">
                {/* Location & Specs Banner */}
                <div className="bg-white p-5 rounded-2xl border border-[#E7DEC3]/80 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#44403C]">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#1C1917]">
                      <MapPin className="w-4 h-4 text-[#C86D51]" />
                      {apartment.address}
                    </span>
                    {apartment.metro?.map((m, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E7DEC3] text-xs font-medium text-[#57534E]"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#C86D51]" />
                        м. {m.name} ({m.walk})
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#F3EDE2]">
                    <div className="p-3 rounded-xl bg-[#FAF7F2]">
                      <div className="text-xs text-[#78716C] mb-0.5">Вместимость</div>
                      <div className="text-sm font-bold text-[#1C1917] flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#C86D51]" />
                        до {apartment.maxGuests} гостей
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF7F2]">
                      <div className="text-xs text-[#78716C] mb-0.5">Площадь</div>
                      <div className="text-sm font-bold text-[#1C1917] flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-[#C86D51]" />
                        {apartment.area} м²
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF7F2]">
                      <div className="text-xs text-[#78716C] mb-0.5">Этаж</div>
                      <div className="text-sm font-bold text-[#1C1917] flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#C86D51]" />
                        {apartment.floor}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF7F2]">
                      <div className="text-xs text-[#78716C] mb-0.5">Спальные места</div>
                      <div className="text-sm font-bold text-[#1C1917] flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-[#C86D51]" />
                        {apartment.bedsCount} места
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-[#57534E] bg-[#FAF7F2] px-4 py-2.5 rounded-xl flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-[#C86D51] shrink-0" />
                    <span>
                      <strong className="text-[#1C1917]">Конфигурация спальных мест:</strong>{' '}
                      {apartment.sleepingPlaces}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#1C1917]">Об апартаментах</h3>
                  <p className="text-[#44403C] leading-relaxed text-sm sm:text-base">
                    {apartment.description}
                  </p>
                  {apartment.note && (
                    <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-[#F3EDE2]/70 border border-[#E7DEC3] text-xs sm:text-sm text-[#57534E]">
                      <Info className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span>{apartment.note}</span>
                    </div>
                  )}
                </div>

                {/* Walking Distance Landmarks */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#1C1917]">
                    Знаковые места для прогулок рядом
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {apartment.landmarks.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#E7DEC3]/70 text-sm text-[#44403C]"
                      >
                        <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Equipment & Amenities */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#1C1917]">
                    Полное оснащение для вашего отдыха
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {apartment.amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E7DEC3]/60 text-sm text-[#292524]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#4D7C5D] shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Booking Card & Rules Summary */}
              <div className="space-y-5">
                <div className="bg-white p-6 rounded-3xl border border-[#E7DEC3] shadow-lg space-y-5 sticky top-4">
                  <div className="flex items-baseline justify-between border-b border-[#F3EDE2] pb-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#78716C] block">
                        Стоимость проживания
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs text-[#57534E]">от</span>
                        <span className="text-3xl font-bold text-[#1C1917]">
                          {apartment.priceFormatted}
                        </span>
                        <span className="text-sm text-[#57534E]">/ сутки</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EBF5EE] text-[#2F6844]">
                      Свободные даты
                    </span>
                  </div>

                  {/* Rules inside modal */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-[#44403C]">
                    <div className="flex items-center justify-between py-1.5 border-b border-[#FAF7F2]">
                      <span className="text-[#78716C] flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#C86D51]" /> Заезд
                      </span>
                      <span className="font-semibold text-right">{apartment.rules.checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-[#FAF7F2]">
                      <span className="text-[#78716C] flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#C86D51]" /> Выезд
                      </span>
                      <span className="font-semibold text-right">{apartment.rules.checkOut}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-[#FAF7F2]">
                      <span className="text-[#78716C] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#C86D51]" /> Страховой залог
                      </span>
                      <span className="font-semibold text-right">{apartment.deposit} ₽</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-[#78716C] flex items-center gap-1.5">
                        <HeartHandshake className="w-4 h-4 text-[#C86D51]" /> С детьми
                      </span>
                      <span className="font-semibold text-[#2F6844]">Да, ждём семей!</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => onBook(apartment)}
                      className="w-full py-3.5 px-5 rounded-xl bg-[#C86D51] hover:bg-[#B2593E] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Забронировать напрямую</span>
                    </button>

                    <a
                      href={apartment.avitoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE2] text-[#44403C] font-medium text-xs sm:text-sm border border-[#E7DEC3] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Посмотреть отзывы и календарь на Авито</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#78716C]" />
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-[#78716C] leading-normal">
                    Бесконтактное заселение 24/7 • Оплата наличными или онлайн-переводом при заселении
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
