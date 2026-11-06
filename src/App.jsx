import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Star,
  MapPin,
  KeyRound,
  BedDouble,
  Coffee,
  ShieldCheck,
  Clock,
  VolumeX,
  CigaretteOff,
  HeartHandshake,
  Compass,
  Sunset,
  Users,
  MessageCircle,
  Send,
  ArrowDown,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  Award
} from 'lucide-react'
import apartmentsData from './data/apartments.json'
import ApartmentCard from './components/ApartmentCard'
import ApartmentModal from './components/ApartmentModal'
import BookingModal from './components/BookingModal'

const AVITO_PROFILE_URL =
  'https://www.avito.ru/brands/0017a3e431247110949d438e61f89e6f/all/kvartiry?context=H4sIAAAAAAAA_wFFALr_YToxOntzOjg6ImZyb21QYWdlIjtzOjQwOiJleHRlbmRlZF9wcm9maWxlX3RhcmlmZl8zMTQzXzMxNDNfc2VhcmNoIjt9-CiyFEUAAAA&sellerId=a950cd603923dccccfd840b6bd5176cc'

const WHATSAPP_URL =
  'https://wa.me/79200000000?text=' +
  encodeURIComponent(
    'Здравствуйте! Присматриваем уютную квартиру для отдыха в Нижнем Новгороде («Go to Горький»). Подскажите, пожалуйста, свободные варианты!'
  )

const TELEGRAM_URL =
  'https://t.me/share/url?url=' +
  encodeURIComponent('https://www.avito.ru/brands/0017a3e431247110949d438e61f89e6f/all/kvartiry') +
  '&text=' +
  encodeURIComponent('Здравствуйте! Хотим забронировать квартиру для отдыха в Нижнем Новгороде.')

export default function App() {
  const [selectedApartment, setSelectedApartment] = useState(null)
  const [bookingApartment, setBookingApartment] = useState(null)
  const [guestFilter, setGuestFilter] = useState('all')
  const [areaFilter, setAreaFilter] = useState('all')

  const filteredApartments = useMemo(() => {
    return apartmentsData.filter((apt) => {
      if (guestFilter === '3+' && apt.maxGuests < 3) return false
      if (guestFilter === '4+' && apt.maxGuests < 4) return false
      if (guestFilter === '5' && apt.maxGuests < 5) return false

      if (areaFilter === 'yarmarka' && !apt.district.toLowerCase().includes('ярмарк')) {
        return false
      }
      if (areaFilter === 'pokrovka' && !apt.address.toLowerCase().includes('покровск')) {
        return false
      }
      if (areaFilter === 'sovetsky' && !apt.district.toLowerCase().includes('советск')) {
        return false
      }
      return true
    })
  }, [guestFilter, areaFilter])

  const handleOpenBookFromDetails = (apt) => {
    setSelectedApartment(null)
    setBookingApartment(apt)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7DEC3]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1917] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:bg-[#C86D51] transition-colors">
              <Sunset className="w-6 h-6 text-[#E7B58F] group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] block leading-none">
                Go to Горький
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#78716C] block mt-0.5">
                Бутик-апартаменты • Нижний Новгород
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44403C]">
            <a href="#catalog" className="hover:text-[#C86D51] transition-colors">
              Коллекция (7 квартир)
            </a>
            <a href="#service" className="hover:text-[#C86D51] transition-colors">
              Сервис и уют
            </a>
            <a href="#locations" className="hover:text-[#C86D51] transition-colors">
              Локации для прогулок
            </a>
            <a href="#rules" className="hover:text-[#C86D51] transition-colors">
              Правила проживания
            </a>
          </nav>

          {/* Rating & CTA */}
          <div className="flex items-center gap-3">
            <a
              href={AVITO_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Открыть наш профиль Go to Горький на Авито"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#F3EDE2] border border-[#E7DEC3] text-xs font-semibold text-[#1C1917] shadow-2xs transition-colors"
            >
              <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
              <span>4.9</span>
              <span className="text-[#78716C] font-normal">• 126 отзывов на Авито</span>
              <ExternalLink className="w-3 h-3 text-[#78716C]" />
            </a>
            <a
              href="#catalog"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#B2593E] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              Выбрать квартиру
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
          {/* Decorative warm background glow */}
          <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E8C5A5]/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-[#C86D51]/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Editorial Boutique Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E7DEC3] shadow-2xs">
                  <Sparkles className="w-4 h-4 text-[#C86D51]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#57534E]">
                    Атмосферный отдых в столице закатов — Нежном Нижнем
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#1C1917] leading-[1.06] tracking-tight">
                  Квартиры с душой для{' '}
                  <span className="italic font-normal text-[#C86D51]">вдохновляющих</span>{' '}
                  путешествий и тёплых выходных
                </h1>

                <p className="text-base sm:text-lg text-[#57534E] max-w-2xl leading-relaxed">
                  Мы собрали коллекцию из 7 авторских апартаментов в самых живописных уголках Нижнего
                  Новгорода — на пешеходной Большой Покровской, у стен Кремля, Стрелки и
                  Нижегородской Ярмарки. Просыпайтесь под аромат свежего кофе и встречайте знаменитые
                  волжские закаты как дома.
                </p>

                {/* Primary Hero Actions */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#catalog"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#1C1917] hover:bg-[#C86D51] text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>Смотреть все 7 квартир</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-[#F3EDE2] text-[#1C1917] border border-[#E0D6C5] font-semibold text-sm sm:text-base transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Подобрать даты в WhatsApp</span>
                  </a>
                  <a
                    href={AVITO_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-[#F3EDE2] hover:bg-[#E7DEC3] text-[#1C1917] font-semibold text-sm sm:text-base transition-colors"
                  >
                    <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                    <span>Наш профиль на Авито</span>
                    <ExternalLink className="w-4 h-4 text-[#78716C]" />
                  </a>
                </div>

                {/* Key Boutique Highlights */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E7DEC3]/80 max-w-xl">
                  <div>
                    <div className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                      7
                    </div>
                    <div className="text-xs sm:text-sm text-[#57534E]">
                      уютных квартир в лучших локациях
                    </div>
                  </div>
                  <div>
                    <div className="font-serif-display text-3xl sm:text-4xl font-bold text-[#C86D51]">
                      4.9 ★
                    </div>
                    <div className="text-xs sm:text-sm text-[#57534E]">
                      рейтинг по 126 отзывам гостей
                    </div>
                  </div>
                  <div>
                    <div className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                      24/7
                    </div>
                    <div className="text-xs sm:text-sm text-[#57534E]">
                      бесконтактное заселение в удобный час
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Bento Photo Collage from Real Apartments */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-5 grid grid-cols-12 gap-3.5"
              >
                <div
                  onClick={() => setSelectedApartment(apartmentsData[3])}
                  className="col-span-12 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-[#E7DEC3]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/apartments/apt-4/2.jpg`}
                    alt="Бутик-студия на Большой Покровской"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                        Большая Покровская, 32
                      </span>
                      <p className="text-lg font-bold mt-1">10 минут пешком до Кремля</p>
                    </div>
                    <span className="text-sm font-semibold bg-[#C86D51] px-3 py-1 rounded-xl">
                      3 500 ₽
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedApartment(apartmentsData[5])}
                  className="col-span-6 relative aspect-square rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-[#E7DEC3]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/apartments/apt-6/2.jpg`}
                    alt="Апартаменты с качелями и ретро-фонариками"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-white/85">Лаунж с качелями</p>
                    <p className="text-sm font-bold truncate">Простор 43 м² • 2 700 ₽</p>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedApartment(apartmentsData[2])}
                  className="col-span-6 relative aspect-square rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-[#E7DEC3]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/apartments/apt-3/2.jpg`}
                    alt="Изумрудная студия на бульваре Мира"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-white/85">У Стрелки и Ярмарки</p>
                    <p className="text-sm font-bold truncate">Бульвар Мира, 15 • 2 900 ₽</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Catalog Section (7 Apartments) */}
        <section id="catalog" className="py-16 sm:py-20 bg-[#F4EFE6]/70 border-y border-[#E7DEC3]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Section Heading & Filters */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C86D51]">
                  <Compass className="w-4 h-4" />
                  <span>Коллекция апартаментов</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-[#1C1917]">
                  Выберите свою квартиру для отдыха
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] max-w-2xl">
                  Каждая квартира создана для романтических поездок, семейных каникул и знакомства с
                  Нижним Новгородом. Реальные фотографии и прямое бронирование без комиссий.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2.5 bg-white p-2 rounded-2xl border border-[#E7DEC3] shadow-2xs">
                <div className="flex items-center gap-1.5 px-2.5 text-xs font-semibold text-[#78716C]">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>Локация:</span>
                </div>
                {[
                  { id: 'all', label: 'Все (7)' },
                  { id: 'pokrovka', label: 'Большая Покровская и Кремль' },
                  { id: 'yarmarka', label: 'Ярмарка и Стрелка' },
                  { id: 'sovetsky', label: 'У Канатной дороги и парков' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAreaFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      areaFilter === tab.id
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'text-[#57534E] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Guest Capacity Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#78716C] mr-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#C86D51]" /> Число гостей:
                </span>
                {[
                  { id: 'all', label: 'Любое' },
                  { id: '3+', label: 'До 3 гостей (пары и семьи)' },
                  { id: '4+', label: 'До 4 гостей' },
                  { id: '5', label: 'Большая семья (до 5 гостей)' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGuestFilter(g.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      guestFilter === g.id
                        ? 'bg-[#C86D51] text-white border-[#C86D51]'
                        : 'bg-white text-[#44403C] border-[#E0D6C5] hover:border-[#C86D51]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="text-xs sm:text-sm text-[#57534E]">
                Показано квартир: <strong className="text-[#1C1917]">{filteredApartments.length}</strong> из 7
              </div>
            </div>

            {/* Cards Grid */}
            {filteredApartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredApartments.map((apartment, index) => (
                  <ApartmentCard
                    key={apartment.id}
                    apartment={apartment}
                    index={index}
                    onOpenDetails={setSelectedApartment}
                    onBook={setBookingApartment}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#E7DEC3] space-y-3">
                <p className="text-lg font-semibold text-[#1C1917]">
                  По выбранному сочетанию фильтров квартир не найдено
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAreaFilter('all')
                    setGuestFilter('all')
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#C86D51] text-white text-sm font-semibold cursor-pointer"
                >
                  Показать все 7 квартир
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Boutique Service Block */}
        <section id="service" className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C86D51]">
                <Sparkles className="w-4 h-4" />
                <span>Стандарт гостеприимства</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#1C1917]">
                Забота о вашем отдыхе на уровне бутик-отеля
              </h2>
              <p className="text-sm sm:text-base text-[#57534E]">
                Мы продумали каждую деталь, чтобы вы могли путешествовать налегке и наслаждаться
                прогулками по Нижнему Новгороду с первой минуты приезда.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: 'Безупречная чистота',
                  desc: 'Тщательная профессиональная уборка и проветривание перед каждым заездом. Сияющая сантехника и свежесть в каждой комнате.'
                },
                {
                  icon: BedDouble,
                  title: 'Отельное бельё и гигиена',
                  desc: 'Выглаженное постельное бельё, мягкие полотенца, фен, шампунь, бальзам, гель для душа и гигиенические наборы для гостей.'
                },
                {
                  icon: KeyRound,
                  title: 'Бесконтактный заезд 24/7',
                  desc: 'Приезжайте даже поздним вечером: подробная инструкция и кодовый сейф для ключей позволят заселиться без ожидания.'
                },
                {
                  icon: Coffee,
                  title: 'Домашний уют и мелочи',
                  desc: 'На кухне всегда ждут чай, кофе, сахар и масло, а в квартирах — Smart TV с онлайн-кинотеатрами, книги, путеводители и настольные игры.'
                }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E7DEC3]/80 shadow-xs hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#F3EDE2] text-[#C86D51] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1C1917]">{item.title}</h3>
                    <p className="text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Verified Avito Profile Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DEC3] shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#1C1917] text-[#E7B58F] flex items-center justify-center shrink-0 shadow-md">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF5EE] text-[#2F6844]">
                      Надёжный хозяин • Профиль подтверждён
                    </span>
                    <span className="text-xs text-[#78716C]">На Авито с мая 2011 года</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    Профиль «Go to Горький» на Авито
                  </h3>
                  <p className="text-sm text-[#57534E] max-w-2xl">
                    Ознакомьтесь со всеми <strong>126 реальными отзывами наших гостей</strong>,
                    актуальным календарём занятости и мгновенным бронированием в официальном профиле
                    сети.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
                <div className="px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E7DEC3] text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-[#1C1917]">
                    <Star className="w-5 h-5 fill-[#D97706] text-[#D97706]" />
                    <span>4.9 / 5.0</span>
                  </div>
                  <div className="text-xs text-[#78716C]">126 отзывов гостей</div>
                </div>
                <a
                  href={AVITO_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#1C1917] hover:bg-[#C86D51] text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>Перейти в профиль Авито</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sightseeing & Locations Banner */}
        <section id="locations" className="py-14 bg-[#1C1917] text-[#FAF7F2] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E7B58F]">
                  Гид по локациям «Go to Горький»
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                  Все знаковые места Нижнего — в шаговой доступности
                </h2>
                <p className="text-sm sm:text-base text-[#D6C7B7] leading-relaxed">
                  От наших квартир вы легко дойдёте пешком или доедете за считанные минуты до главных
                  символов города. В каждой квартире вас ждут путеводители и рекомендации лучших
                  видовых площадок.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {[
                  { place: 'Нижегородская Ярмарка', dist: '300–400 метров', note: 'Главный исторический ансамбль' },
                  { place: 'Стрелка и Пакгаузы', dist: '1,5 км (15 мин пешком)', note: 'Слияние Оки и Волги' },
                  { place: 'Большая Покровская', dist: 'Прямо у дома / 10 мин', note: 'Главная пешеходная улица' },
                  { place: 'Нижегородский Кремль', dist: 'от 700 метров', note: 'Сердце древнего города' },
                  { place: 'Набережная Федоровского', dist: '1–3 км', note: 'Лучшая точка для закатов' },
                  { place: 'Канатная дорога через Волгу', dist: '2–4 км', note: 'Самая длинная в Европе' }
                ].map((loc, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1"
                  >
                    <div className="text-xs font-semibold text-[#E7B58F]">{loc.dist}</div>
                    <div className="text-sm sm:text-base font-bold text-white">{loc.place}</div>
                    <div className="text-xs text-[#A8A29E]">{loc.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* House Rules Section */}
        <section id="rules" className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C86D51]">
                <ShieldCheck className="w-4 h-4" />
                <span>Прозрачные условия</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#1C1917]">
                Правила проживания и бронирования
              </h2>
              <p className="text-sm sm:text-base text-[#57534E]">
                Мы бережно храним уют и тишину в наших квартирах, чтобы каждый гость чувствовал себя
                комфортно и безопасно.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Check-in / Check-out */}
              <div className="bg-white p-7 rounded-3xl border border-[#E7DEC3] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F3EDE2] text-[#C86D51] flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1917]">Расчётный час и заселение</h3>
                <ul className="space-y-2.5 text-sm text-[#44403C]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D7C5D] shrink-0 mt-0.5" />
                    <span>
                      <strong>Заезд с 15:00</strong> (возможен ранний заезд по предварительному
                      согласованию).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D7C5D] shrink-0 mt-0.5" />
                    <span>
                      <strong>Выезд до 12:00</strong> (поздний выезд возможен по согласованию).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D7C5D] shrink-0 mt-0.5" />
                    <span>
                      Удобное <strong>бесконтактное заселение</strong> в любое время дня и вечера при
                      предъявлении паспорта.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Security Deposit & Payment */}
              <div className="bg-white p-7 rounded-3xl border border-[#E7DEC3] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F3EDE2] text-[#C86D51] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1917]">Условия залога и оплаты</h3>
                <ul className="space-y-2.5 text-sm text-[#44403C]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D7C5D] shrink-0 mt-0.5" />
                    <span>
                      Страховой возвратный залог составляет <strong>2 000 – 3 000 ₽</strong> (в
                      зависимости от выбранной квартиры).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D7C5D] shrink-0 mt-0.5" />
                    <span>
                      Залог полностью возвращается на карту гостя в день выезда после уборки и
                      проверки квартиры.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D7C5D] shrink-0 mt-0.5" />
                    <span>
                      Удобная оплата для гостей: <strong>наличными или онлайн-переводом</strong>.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Quiet Hours & Restrictions */}
              <div className="bg-white p-7 rounded-3xl border border-[#E7DEC3] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FBEAE5] text-[#C86D51] flex items-center justify-center">
                  <VolumeX className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1917]">Тишина и бережный отдых</h3>
                <ul className="space-y-2.5 text-sm text-[#44403C]">
                  <li className="flex items-start gap-2">
                    <VolumeX className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                    <span>
                      <strong>Строгий запрет на шумные вечеринки</strong> и мероприятия. Соблюдение
                      часов тишины с <strong>21:00 до 08:00</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CigaretteOff className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                    <span>
                      В квартирах и на балконах <strong>строго запрещено курить</strong> (при
                      нарушении залог не возвращается).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#4D7C5D] shrink-0 mt-0.5" />
                    <span>
                      Мы рады семьям с детьми (предоставляем кроватку и стульчик по запросу). В
                      большинстве квартир возможно проживание с питомцем по согласованию.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1C1917] text-[#D6C7B7] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C86D51] text-white flex items-center justify-center">
              <Sunset className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif-display text-2xl font-bold text-white block leading-none">
                Go to Горький
              </span>
              <span className="text-xs text-[#A8A29E]">
                Сеть из 7 уютных квартир для отдыха в Нижнем Новгороде
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={AVITO_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
              <span>Профиль на Авито (4.9 ★)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Написать в WhatsApp</span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#229ED9] hover:bg-[#1C8BC0] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Direct Booking Buttons (WhatsApp & Telegram) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Забронировать в Telegram"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#229ED9] hover:bg-[#1C8BC0] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <Send className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold pr-1">Telegram</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Забронировать в WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold pr-1">Бронь в WhatsApp</span>
        </a>
      </div>

      {/* Apartment Details Modal */}
      <ApartmentModal
        apartment={selectedApartment}
        onClose={() => setSelectedApartment(null)}
        onBook={handleOpenBookFromDetails}
      />

      {/* Direct Booking Modal */}
      <BookingModal
        apartment={bookingApartment}
        onClose={() => setBookingApartment(null)}
      />
    </div>
  )
}
