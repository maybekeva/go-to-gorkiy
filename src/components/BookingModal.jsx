import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Calendar,
  Users,
  MessageCircle,
  Send,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

const WHATSAPP_PHONE = '79200000000'
const TELEGRAM_USERNAME = 'gotogorkiy_nn'

export default function BookingModal({ apartment, onClose }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [guestName, setGuestName] = useState('')
  const [comment, setComment] = useState('')

  if (!apartment) return null

  const firstImage = apartment.images[0]?.startsWith('/')
    ? `${import.meta.env.BASE_URL}${apartment.images[0].slice(1)}`
    : apartment.images[0]

  const buildBookingMessage = () => {
    const lines = [
      `Здравствуйте! Хочу забронировать апартаменты для отдыха в Нижнем Новгороде:`,
      `🏡 Квартира: ${apartment.title} (${apartment.address})`,
      `💰 Цена на сайте: от ${apartment.priceFormatted}/сутки`,
      checkIn ? `📅 Дата заезда: ${checkIn}` : null,
      checkOut ? `📅 Дата выезда: ${checkOut}` : null,
      `👥 Гостей: ${guests}`,
      guestName ? `👤 Имя: ${guestName}` : null,
      comment ? `💬 Пожелания: ${comment}` : null
    ].filter(Boolean)
    return encodeURIComponent(lines.join('\n'))
  }

  const handleWhatsApp = () => {
    const text = buildBookingMessage()
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const handleTelegram = () => {
    const text = buildBookingMessage()
    window.open(`https://t.me/share/url?url=${encodeURIComponent(apartment.avitoUrl)}&text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#E7DEC3] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E7DEC3]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C86D51]" />
              <h3 className="text-xl font-bold text-[#1C1917]">Бронирование отдыха</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="w-9 h-9 rounded-full bg-[#F3EDE2] hover:bg-[#E7DEC3] flex items-center justify-center text-[#1C1917] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Selected Apartment Mini Card */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E7DEC3]">
              <img
                src={firstImage}
                alt={apartment.title}
                className="w-20 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs text-[#78716C] truncate">{apartment.address}</div>
                <div className="text-sm font-bold text-[#1C1917] line-clamp-1">
                  {apartment.title}
                </div>
                <div className="text-sm font-semibold text-[#C86D51]">
                  от {apartment.priceFormatted} / сутки
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#57534E] mb-1">
                  Дата заезда
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#C86D51] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-[#E0D6C5] text-sm text-[#1C1917] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#57534E] mb-1">
                  Дата выезда
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#C86D51] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-[#E0D6C5] text-sm text-[#1C1917] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#57534E] mb-1">
                  Количество гостей (макс. {apartment.maxGuests})
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#C86D51] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-[#E0D6C5] text-sm text-[#1C1917] focus:outline-none focus:border-[#C86D51]"
                  >
                    {Array.from({ length: apartment.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#57534E] mb-1">
                  Ваше имя
                </label>
                <input
                  type="text"
                  placeholder="Например, Анна"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D6C5] text-sm text-[#1C1917] focus:outline-none focus:border-[#C86D51]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#57534E] mb-1">
                Пожелания к отдыху (ранний заезд, детская кроватка и т.д.)
              </label>
              <textarea
                rows={2}
                placeholder="Едем семьёй на выходные..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E0D6C5] text-sm text-[#1C1917] focus:outline-none focus:border-[#C86D51]"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Забронировать в WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleTelegram}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1C8BC0] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Написать в Telegram</span>
                </button>
              </div>

              <a
                href={apartment.avitoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Мгновенная бронь через Авито</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#57534E]">
              <CheckCircle2 className="w-4 h-4 text-[#4D7C5D]" />
              <span>Отвечаем за 5 минут • Бесконтактное заселение 24/7</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
