import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MenuItem, ScreenType } from '../types';
import {
  HERO_MAIN_IMG,
  HERO_POUR_OVER_IMG,
  WORKSPACE_IMG,
  ARAKU_PLANTATION_IMG,
  MENU_ITEMS,
} from '../data/cafeData';
import { coastalSoundscape } from '../utils/audioAmbiance';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenReserveModal: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenReserveModal,
  onAddToCart,
}) => {
  // Menu Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');

  // Reservation Form State
  const [reserveLoc, setReserveLoc] = useState('siripuram');
  const [reserveDate, setReserveDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [reserveSlot, setReserveSlot] = useState<'morning' | 'deepwork' | 'sunset' | 'night'>('morning');
  const [reserveZone, setReserveZone] = useState('Quiet AC Work Mezzanine (Plug Desks)');
  const [reserveGuests, setReserveGuests] = useState('1 Person (Solo Work Desk)');
  const [reserveName, setReserveName] = useState('');
  const [reservePhone, setReservePhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Speedtest simulation state
  const [testingPing, setTestingPing] = useState(false);
  const [pingSpeed, setPingSpeed] = useState('348.6 Mbps');
  const [pingJitter, setPingJitter] = useState('4ms Jitter');

  // Audio state
  const [soundPlaying, setSoundPlaying] = useState(false);

  const toggleSound = () => {
    const active = coastalSoundscape.toggle();
    setSoundPlaying(active);
  };

  const runSpeedTest = () => {
    setTestingPing(true);
    setTimeout(() => {
      const mbps = (340 + Math.random() * 25).toFixed(1);
      const jit = Math.floor(3 + Math.random() * 3);
      setPingSpeed(`${mbps} Mbps`);
      setPingJitter(`${jit}ms Jitter`);
      setTestingPing(false);
    }, 1200);
  };

  // Filter logic
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDiet =
      selectedDiet === 'all' ||
      (selectedDiet === 'vegan' && item.dietTag?.includes('Vegan')) ||
      (selectedDiet === 'jain' && item.diet === 'jain') ||
      (selectedDiet === 'special' && item.diet === 'special');
    return matchesCategory && matchesDiet;
  });

  const handleInlineReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);
    setBookingSuccess(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8e4d2a', '#feaa7f', '#231b15'],
      });
    } catch {
      // ignore
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          HERO SECTION WITH EDITORIAL OVERLAPPING & AMBIENT COASTAL/ESPRESSO GLOW
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#231b15] text-white -mt-28 pt-36 pb-24 px-4 sm:px-6 lg:px-12">
        {/* Ambient background dots & glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#feaa7f_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute -right-48 -top-48 w-96 h-96 rounded-full bg-[#8e4d2a] opacity-30 blur-[120px] pointer-events-none"></div>
        <div className="absolute -left-36 top-1/2 w-80 h-80 rounded-full bg-[#3e9192] opacity-25 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10">
          {/* Live Micro Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#fcf9f3] text-xs font-semibold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8e4d2a] animate-ping mr-1"></span>
              <span className="text-[#fcf9f3] font-semibold">Open Now in Vizag</span>
              <span className="text-[#d1c4bd]/60">/</span>
              <span className="text-[#ffdbcb]">Peak Hours 5:00 PM – 9:00 PM</span>
              <span className="text-[#d1c4bd]/60">/</span>
              <span className="flex items-center gap-1 text-[#a0f0f1]">
                <span className="material-symbols-outlined text-[15px]">wifi</span>
                350 Mbps Free Fiber
              </span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-[#d3c4ba]/80">
              <span>Single Estate Micro-Lot</span>
              <span>•</span>
              <span>Roasting Batch #104</span>
              <span>•</span>
              <span>Bay of Bengal Breeze</span>
            </div>
          </div>

          {/* Main Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#ffb691]">
                  Visakhapatnam’s Specialty Flagship
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                  Where Araku Highlands <span className="italic font-normal text-[#feaa7f]">Meet</span> the Vizag Coast.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#d3c4ba] max-w-xl leading-relaxed">
                Sip shade-grown Arabica farmed at 1,050m in the mist-veiled Eastern Ghats, roasted small-batch weekly on the shores of RK Beach. Pair with slow-fermented sourdough, seaside work desks, and unhurried coastal air.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={onOpenReserveModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white font-semibold text-sm transition-all shadow-lg hover:shadow-[#8e4d2a]/30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  <span>Reserve a Table</span>
                </button>
                <a
                  href="#digital-menu"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#feaa7f]">coffee</span>
                  <span>Explore Interactive Menu</span>
                </a>
              </div>

              {/* Micro specs strip */}
              <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg border-t border-white/10">
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl text-white font-semibold">1,050 m</span>
                  <span className="text-xs text-[#d3c4ba]">Ananthagiri Elevation</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl text-[#feaa7f] font-semibold">86.5+</span>
                  <span className="text-xs text-[#d3c4ba]">Q-Grade Score Cup</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl text-white font-semibold">14 Plugs</span>
                  <span className="text-xs text-[#d3c4ba]">Quiet Desks Available</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-[#ebe8e2]">
                <img
                  src={HERO_MAIN_IMG}
                  alt="A sunlit, minimalist coastal roastery coffee cup with silky microfoam poured in artisanal ceramic stoneware, warm wooden coffee counter in Visakhapatnam overlooking soft ocean light through tall windows, roasted coffee beans scattered on slate, warm terracotta and espresso tones."
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231b15] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Floating Origin Tag Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#fcf9f3]/95 backdrop-blur-md text-[#1c1c18] flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#feaa7f] flex items-center justify-center text-[#783d1a] shrink-0">
                      <span className="material-symbols-outlined text-[20px]">filter_vintage</span>
                    </div>
                    <div>
                      <p className="text-sm text-[#040200] font-bold leading-tight">Honey Process Micro-Lot</p>
                      <p className="text-xs text-[#4d4540]">Tribal Farmers Co-op, Araku Valley</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#ffdbcb] text-[#341100] font-bold">
                    ₹240
                  </span>
                </div>
              </div>

              {/* Overlapping Secondary Visual */}
              <div className="hidden sm:block absolute -top-8 -left-12 w-48 h-56 rounded-xl overflow-hidden shadow-xl bg-[#f0eee8] border-2 border-white/20">
                <img
                  src={HERO_POUR_OVER_IMG}
                  alt="Close up shot of skilled barista hand pouring hot kettle water through a Japanese V60 coffee dripper, steam rising delicately, amber filtered Araku coffee dripping into a glass server, golden hour ambient lighting."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Live Vibe Check Telemetry Bar */}
          <div className="w-full rounded-2xl bg-white/10 backdrop-blur-lg px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs text-white/90 shadow-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#feaa7f] text-[18px]">verified</span>
              <span>
                Coffee Origin: <strong className="text-white font-semibold">100% Araku Specialty Tribal Estate</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a0f0f1] text-[18px]">speed</span>
              <span>
                Wi-Fi: <strong className="text-white font-semibold">350 Mbps Low Latency (5ms)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdbcb] text-[18px]">power</span>
              <span>
                Work Desks: <strong className="text-white font-semibold">14 Plugs Open (Waltair &amp; Beach Rd)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#feaa7f] text-[18px]">graphic_eq</span>
              <span>
                Acoustic Vibe: <strong className="text-white font-semibold">Lo-Fi Ambient Coast Beats</strong>
              </span>
              <button
                onClick={toggleSound}
                className="ml-1 text-[11px] underline text-[#feaa7f] hover:text-white cursor-pointer"
              >
                {soundPlaying ? '(Pause Surf)' : '(Play Surf)'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE DIGITAL MENU SHOWCASE
         ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3]" id="digital-menu">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eee8] text-[#8e4d2a] text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">local_cafe</span>
                <span>Hand-Crafted Menu • Summer Coastal Edition</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#040200] font-bold tracking-tight">
                Seasonal Specialty Brews &amp; Kitchen
              </h2>
              <p className="text-sm text-[#4d4540] max-w-2xl">
                Sourced transparently from Araku Valley tribal smallholders, roasted within 7 days, and served alongside artisan breads baked fresh at 6:00 AM daily.
              </p>
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedDiet('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDiet === 'all'
                    ? 'bg-[#231b15] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#4d4540] hover:text-[#1c1c18]'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setSelectedDiet('vegan')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDiet === 'vegan'
                    ? 'bg-[#231b15] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#4d4540] hover:text-[#1c1c18]'
                }`}
              >
                🌱 Vegan
              </button>
              <button
                onClick={() => setSelectedDiet('jain')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDiet === 'jain'
                    ? 'bg-[#231b15] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#4d4540] hover:text-[#1c1c18]'
                }`}
              >
                🕊️ Jain Friendly
              </button>
              <button
                onClick={() => setSelectedDiet('special')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDiet === 'special'
                    ? 'bg-[#231b15] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#4d4540] hover:text-[#1c1c18]'
                }`}
              >
                ⭐ Chef's Special
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="w-full overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center gap-1.5 min-w-max bg-[#f6f3ed] p-1.5 rounded-full border border-[#ebe8e2]">
              {[
                { id: 'all', label: 'All Showcase' },
                { id: 'araku', label: 'Araku Specials' },
                { id: 'espresso', label: 'Espresso & Cold Brews' },
                { id: 'breakfast', label: 'Breakfast & Sourdough' },
                { id: 'continental', label: 'Continental & Panini' },
                { id: 'desserts', label: 'Bakes & Babkas' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-[#040200] shadow-sm'
                      : 'text-[#4d4540] hover:text-[#040200]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl overflow-hidden bg-white border border-[#ebe8e2] shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image Window */}
                <div className="relative w-full h-56 bg-[#f0eee8] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#231b15] text-[#ffdbcb]">
                        {item.badge}
                      </span>
                    )}
                    {item.dietTag && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#1c1c18]">
                        {item.dietTag}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#040200] font-bold text-sm shadow-md">
                    ₹{item.price}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8e4d2a] font-semibold">
                      <span>{item.origin}</span>
                      <span>{item.subTitle}</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#040200] font-bold mt-1 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#4d4540] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.notes && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {item.notes.map((note, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#f6f3ed] text-[#4d4540] font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#ebe8e2]">
                    <a
                      href={`https://wa.me/919440155620?text=${encodeURIComponent(
                        `Hi Araku Coast, I would like to order the ${item.name} (₹${item.price}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#f0eee8] hover:bg-[#feaa7f] text-[#1c1c18] hover:text-[#783d1a] text-xs font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#8e4d2a]">chat</span>
                      <span>Order on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3.5 py-2 rounded-full bg-[#231b15] hover:bg-[#8e4d2a] text-white text-xs font-semibold transition-colors cursor-pointer"
                      title="Add to tray"
                    >
                      + Tray
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORK & REMOTE PRODUCTIVITY SANCTUARY
         ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#f6f3ed] text-[#1c1c18]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe8e2] text-[#8e4d2a] text-xs font-bold w-max">
                <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
                <span>Remote Work Sanctuary &amp; Student Hub</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#040200] font-bold leading-tight">
                Designed for Deep Focus. Built for Gitam, AU &amp; Digital Nomads.
              </h2>

              <p className="text-sm sm:text-base text-[#4d4540] leading-relaxed">
                Tired of spotty connections and noisy cafes? Our mezzanine floor at Siripuram Flagship is acoustically dampened and engineered specifically for uninterrupted laptop sessions, client sprints, and thesis study.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white border border-[#ebe8e2] flex flex-col gap-1 shadow-xs">
                  <div className="flex items-center gap-2 text-[#040200] text-sm font-bold">
                    <span className="material-symbols-outlined text-[#8e4d2a] text-[20px]">router</span>
                    <span>Dual 350 Mbps Mesh</span>
                  </div>
                  <p className="text-xs text-[#4d4540]">Low latency enterprise lines with failover redundancy.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#ebe8e2] flex flex-col gap-1 shadow-xs">
                  <div className="flex items-center gap-2 text-[#040200] text-sm font-bold">
                    <span className="material-symbols-outlined text-[#8e4d2a] text-[20px]">electrical_services</span>
                    <span>Every Desk Plugged</span>
                  </div>
                  <p className="text-xs text-[#4d4540]">Universal sockets &amp; Type-C 65W fast-charging docks.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#ebe8e2] flex flex-col gap-1 shadow-xs">
                  <div className="flex items-center gap-2 text-[#040200] text-sm font-bold">
                    <span className="material-symbols-outlined text-[#8e4d2a] text-[20px]">chair</span>
                    <span>Ergonomic Seating</span>
                  </div>
                  <p className="text-xs text-[#4d4540]">Custom teak work tables and posture-support leather chairs.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#ebe8e2] flex flex-col gap-1 shadow-xs">
                  <div className="flex items-center gap-2 text-[#040200] text-sm font-bold">
                    <span className="material-symbols-outlined text-[#8e4d2a] text-[20px]">school</span>
                    <span>Student Study Pass</span>
                  </div>
                  <p className="text-xs text-[#4d4540]">15% off all beverages with valid AU / GITAM student IDs.</p>
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl aspect-[16/10]">
                <img
                  src={WORKSPACE_IMG}
                  alt="Modern serene cafe workspace in Visakhapatnam with young creative remote professionals working on sleek laptops, warm overhead brass pendant lamps, green potted tropical plants, ergonomic chairs, wooden communal table with coffee cups."
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#231b15] text-white text-xs font-semibold flex items-center gap-2 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#8e4d2a]"></span>
                  <span>14 Desk Seats Open Now</span>
                </div>
              </div>

              {/* Speedtest & Desk Telemetry Widget */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ebe8e2] flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#040200]">
                    <span className="material-symbols-outlined text-[24px]">network_check</span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#4d4540] font-bold">Live Ping Check</p>
                    <p className="text-sm font-bold text-[#040200]">
                      {testingPing ? 'Testing latency...' : `${pingSpeed} • ${pingJitter}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={runSpeedTest}
                    disabled={testingPing}
                    className="px-3 py-2 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-semibold text-[#1c1c18] transition-colors cursor-pointer"
                  >
                    {testingPing ? 'Testing...' : 'Retest Ping'}
                  </button>

                  <button
                    onClick={() => onNavigate('work-and-desks')}
                    className="px-4 py-2 rounded-full bg-[#040200] hover:bg-[#231b15] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Reserve Study Desk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAN ORIGIN & SUSTAINABILITY STORY
         ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3] text-[#1c1c18]" id="bean-origin">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8e4d2a]">Direct Trade Terroir</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#040200] font-bold">
              From the Shaded Slopes of Araku Valley to Your Cup
            </h2>
            <p className="text-sm sm:text-base text-[#4d4540] leading-relaxed">
              We bypass multi-tier middlemen to partner directly with indigenous tribal farmer collectives in the Eastern Ghats, paying 40% above fair-trade market rates.
            </p>
          </div>

          {/* Bento Story Mosaic */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Big Bento Card: The Tribal Soil */}
            <div className="md:col-span-7 rounded-2xl overflow-hidden bg-[#f0eee8] p-6 sm:p-8 flex flex-col justify-between relative min-h-[360px] shadow-xs border border-[#ebe8e2]">
              <div className="relative z-10 max-w-md space-y-2">
                <span className="px-3 py-1 rounded-full bg-white/90 text-[#040200] text-xs font-bold inline-block">
                  100% Organic Shade Grown
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#040200]">
                  Grown Under Silver Oaks &amp; Pepper Vines
                </h3>
                <p className="text-xs sm:text-sm text-[#4d4540] leading-relaxed">
                  Araku’s microclimate features cool mountain mists and rich iron-bearing red soil. Coffee cherries mature slowly over 9 months, accumulating nuanced fructose and sparkling acidity.
                </p>
              </div>

              <div className="relative z-10 pt-6 flex items-center gap-8 border-t border-[#d1c4bd]/40">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8e4d2a]">320+</p>
                  <p className="text-xs text-[#4d4540]">Tribal Family Partnerships</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8e4d2a]">0 Chemical</p>
                  <p className="text-xs text-[#4d4540]">Fertilizers or Pesticides</p>
                </div>
              </div>

              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src={ARAKU_PLANTATION_IMG}
                  alt="Lush green coffee plantation in Araku Valley Andhra Pradesh with silver oak trees filtering morning sunrays over ripe red coffee cherries, mist over mountains."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Small Bento 1: Small Batch Roastery in Vizag */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden bg-[#231b15] text-white p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-white/10">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#8e4d2a] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white">Weekly Small-Batch Roasting</h3>
                <p className="text-xs sm:text-sm text-[#d3c4ba] leading-relaxed">
                  Our Giesen drum roaster at the Siripuram Roastery is calibrated every Tuesday to roast in meticulous 5kg batches, preserving regional terroir.
                </p>
              </div>

              <div
                onClick={() => onNavigate('bean-origin')}
                className="pt-6 flex items-center justify-between border-t border-white/10 text-xs font-semibold text-[#feaa7f] cursor-pointer hover:underline"
              >
                <span>Next Public Cupping: Thu 4:00 PM</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>

            {/* Metric Mini Bar: Cupping Journey */}
            <div className="md:col-span-12 rounded-2xl bg-[#ebe8e2] p-4 sm:p-6 flex flex-wrap items-center justify-around gap-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#8e4d2a] text-[24px]">altitude</span>
                <div>
                  <p className="text-sm font-bold text-[#040200]">1050m - 1200m</p>
                  <p className="text-xs text-[#4d4540]">High Elevation Grown</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#8e4d2a] text-[24px]">water_drop</span>
                <div>
                  <p className="text-sm font-bold text-[#040200]">Eco-Pulped &amp; Honey</p>
                  <p className="text-xs text-[#4d4540]">Low-Water Processing</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#8e4d2a] text-[24px]">inventory_2</span>
                <div>
                  <p className="text-sm font-bold text-[#040200]">Degassed in Vizag</p>
                  <p className="text-xs text-[#4d4540]">Brewed at Peak Day 14</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TABLE RESERVATION & EVENT DESK WIDGET
         ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#f0eee8]" id="reserve-desk">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left Pitch */}
          <div className="lg:w-5/12 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#feaa7f] text-[#783d1a] text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">table_bar</span>
                <span>Real-Time Seat Booking</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#040200] font-bold">
                Reserve Your Table or Productivity Pod
              </h2>
              <p className="text-sm text-[#4d4540] leading-relaxed">
                Guarantee your favorite nook whether you are hosting an afternoon client meeting, catching the sunset ocean breeze, or needing a quiet power-backed work session.
              </p>
            </div>

            <div className="space-y-2.5 bg-white p-5 rounded-2xl shadow-xs border border-[#ebe8e2]">
              <p className="text-sm font-bold text-[#040200]">Reservation Assurance</p>
              <ul className="space-y-2 text-xs text-[#4d4540]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8e4d2a] text-[18px]">check_circle</span>
                  <span>Tables held for 20 minutes past reservation time</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8e4d2a] text-[18px]">check_circle</span>
                  <span>Instant WhatsApp confirmation with location map pin</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8e4d2a] text-[18px]">check_circle</span>
                  <span>Complimentary sparkling pour-over water service</span>
                </li>
              </ul>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#231b15] text-white flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#8e4d2a] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Need an urgent desk?</p>
                <p className="text-xs text-[#d3c4ba]">Call concierge: +91 891 278 4400</p>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:w-7/12 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#ebe8e2] flex flex-col gap-5">
            <h3 className="font-serif text-2xl text-[#040200] font-bold">Select Booking Preferences</h3>

            <form onSubmit={handleInlineReservation} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location Picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider">
                    Roastery Location
                  </label>
                  <select
                    value={reserveLoc}
                    onChange={(e) => setReserveLoc(e.target.value)}
                    className="w-full bg-[#f6f3ed] text-[#1c1c18] px-3.5 py-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e4d2a] border border-[#d1c4bd]/40"
                  >
                    <option value="siripuram">Siripuram Flagship (Near Dutt Island)</option>
                    <option value="rkbeach">RK Beach Coastal Outpost (Near Submarine)</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={reserveDate}
                    onChange={(e) => setReserveDate(e.target.value)}
                    className="w-full bg-[#f6f3ed] text-[#1c1c18] px-3.5 py-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e4d2a] border border-[#d1c4bd]/40"
                  />
                </div>
              </div>

              {/* Time Shift Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider">
                  Session Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'morning', title: 'Morning Brew', hours: '8:00 - 11:30 AM' },
                    { id: 'deepwork', title: 'Deep Work Shift', hours: '12:00 - 4:00 PM' },
                    { id: 'sunset', title: 'Sunset Coffee', hours: '4:30 - 7:30 PM' },
                    { id: 'night', title: 'Night Owl', hours: '8:00 - 11:00 PM' },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setReserveSlot(s.id as 'morning' | 'deepwork' | 'sunset' | 'night')}
                      className={`p-2.5 text-center rounded-lg border transition-all cursor-pointer ${
                        reserveSlot === s.id
                          ? 'bg-[#231b15] text-white border-[#231b15]'
                          : 'bg-[#f6f3ed] text-[#4d4540] border-transparent hover:border-[#d1c4bd]'
                      }`}
                    >
                      <p className="text-xs font-bold">{s.title}</p>
                      <p className="text-[10px] opacity-80">{s.hours}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Zone and Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider">
                    Seating Zone
                  </label>
                  <select
                    value={reserveZone}
                    onChange={(e) => setReserveZone(e.target.value)}
                    className="w-full bg-[#f6f3ed] text-[#1c1c18] px-3.5 py-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e4d2a] border border-[#d1c4bd]/40"
                  >
                    <option>Quiet AC Work Mezzanine (Plug Desks)</option>
                    <option>Ocean Breeze Outdoor Patio</option>
                    <option>Roastery Central Brew Bar</option>
                    <option>Private Meeting Pod (Up to 6)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider">
                    Guests Count
                  </label>
                  <select
                    value={reserveGuests}
                    onChange={(e) => setReserveGuests(e.target.value)}
                    className="w-full bg-[#f6f3ed] text-[#1c1c18] px-3.5 py-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e4d2a] border border-[#d1c4bd]/40"
                  >
                    <option>1 Person (Solo Work Desk)</option>
                    <option>2 Persons</option>
                    <option>3 - 4 Persons</option>
                    <option>5 - 8 Persons (Group Table)</option>
                  </select>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={reserveName}
                    onChange={(e) => setReserveName(e.target.value)}
                    className="w-full bg-[#f6f3ed] text-[#1c1c18] px-3.5 py-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e4d2a] border border-[#d1c4bd]/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={reservePhone}
                    onChange={(e) => setReservePhone(e.target.value)}
                    className="w-full bg-[#f6f3ed] text-[#1c1c18] px-3.5 py-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e4d2a] border border-[#d1c4bd]/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Confirm Instant Reservation</span>
              </button>
            </form>

            {bookingSuccess && (
              <div className="p-4 rounded-xl bg-[#feaa7f] text-[#783d1a] text-xs font-semibold flex items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                  <span>
                    Reservation #{bookingId} confirmed! Sent details to {reservePhone || 'WhatsApp'}.
                  </span>
                </div>
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/919440155620?text=Hi%20Araku%20Coast,%20confirming%20my%20reservation%20${bookingId}`,
                      '_blank'
                    )
                  }
                  className="px-3 py-1 rounded-full bg-[#231b15] text-white text-[11px] whitespace-nowrap cursor-pointer hover:bg-black"
                >
                  Open WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          VIZAG LOCATIONS & OPERATING HOURS
         ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3] text-[#1c1c18]" id="locations">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold tracking-widest uppercase text-[#8e4d2a]">
                Find Your Nearest Outpost
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#040200] font-bold">
                Two Distinct Vizag Locations
              </h2>
              <p className="text-sm text-[#4d4540]">
                Whether you desire the energetic pulse of Waltair Uplands or sunrise waves at RK Beach.
              </p>
            </div>
            <a
              href="https://wa.me/919440155620?text=Hi%20Araku%20Coast%20Concierge"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-[#040200] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#8e4d2a] text-[18px]">chat</span>
              <span>Chat with Roastery Concierge</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location 1: Siripuram Flagship */}
            <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-md border border-[#ebe8e2]">
              <div className="w-full h-56 relative overflow-hidden bg-[#ebe8e2]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                  alt="Siripuram Flagship Roastery interior with sunlit coffee bar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#231b15] text-white text-[11px] font-bold">
                  Waltair Flagship
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#231b15] text-white font-bold">
                      Flagship &amp; Roastery
                    </span>
                    <span className="text-xs text-[#8e4d2a] font-bold">Open Daily till 11 PM</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#040200] font-bold mt-2">
                    Waltair Uplands / Siripuram
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4d4540] mt-1">
                    Plot 42, Waltair Uplands, Opposite Dutt Island, Siripuram, Visakhapatnam – 530003
                  </p>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">local_parking</span>Valet Parking
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">pets</span>Pet Patio
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">meeting_room</span>Quiet AC Desks
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">delivery_dining</span>Swiggy Delivery
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0eee8]">
                  <div>
                    <p className="text-[11px] text-[#4d4540]">Hours of Operation</p>
                    <p className="text-sm font-bold text-[#040200]">7:30 AM – 11:00 PM</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Siripuram+Visakhapatnam"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#8e4d2a] text-xs font-bold hover:underline"
                  >
                    <span>Directions</span>
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Location 2: RK Beach Coastal Outpost */}
            <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-md border border-[#ebe8e2]">
              <div className="w-full h-56 relative overflow-hidden bg-[#ebe8e2]">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Visakhapatnam RK Beach Road coastline promenade"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#002121] text-[#a0f0f1] text-[11px] font-bold">
                  Beach Road Outpost
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#002121] text-[#a0f0f1] font-bold">
                      Coastal Outpost
                    </span>
                    <span className="text-xs text-[#8e4d2a] font-bold">Sunrise Brews from 6:30 AM</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#040200] font-bold mt-2">
                    RK Beach Road Coastal Outpost
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4d4540] mt-1">
                    Beach Road Promenade, 150m from Kursura Submarine Museum, Visakhapatnam – 530017
                  </p>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">waves</span>Ocean View Seating
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">takeout_dining</span>Express Takeaway
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">wifi</span>350 Mbps Wi-Fi
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] text-xs flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">directions_bike</span>Cyclist Friendly
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0eee8]">
                  <div>
                    <p className="text-[11px] text-[#4d4540]">Hours of Operation</p>
                    <p className="text-sm font-bold text-[#040200]">6:30 AM – 11:30 PM</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Kursura+Submarine+Museum+RK+Beach+Visakhapatnam"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#8e4d2a] text-xs font-bold hover:underline"
                  >
                    <span>Directions</span>
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DISCOVERY NEWSLETTER & COMMUNITY SLATE
         ========================================================================= */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-12 bg-[#231b15] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl text-white font-semibold">
              Join the Vizag Coffee Cupping Circle
            </h3>
            <p className="text-xs sm:text-sm text-[#d3c4ba]">
              Get invited to weekly micro-lot cuppings, sensory tastings, and student creative workshops.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-3 rounded-full bg-[#f6f3ed] text-[#1c1c18] text-xs focus:outline-none w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {newsletterSuccess && (
          <div className="max-w-7xl mx-auto mt-3 text-center text-xs text-[#feaa7f] animate-fadeIn">
            ✓ Welcome to the Cupping Circle! Check your inbox for the upcoming Thursday tasting session invite.
          </div>
        )}
      </section>
    </div>
  );
};
