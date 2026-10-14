import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ReservationData } from '../types';

interface ReserveScreenProps {
  selectedLocation: 'siripuram' | 'rkbeach';
}

export const ReserveScreen: React.FC<ReserveScreenProps> = ({ selectedLocation }) => {
  const [location, setLocation] = useState<'siripuram' | 'rkbeach'>(selectedLocation);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = useState<'morning' | 'deepwork' | 'sunset' | 'night'>('deepwork');
  const [seatingZone, setSeatingZone] = useState('Quiet AC Work Mezzanine (Plug Desks)');
  const [guestsCount, setGuestsCount] = useState('2 Persons');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('Casual Specialty Coffee');
  const [notes, setNotes] = useState('');
  const [confirmedPass, setConfirmedPass] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: ReservationData = {
      id: `AC-${Math.floor(100000 + Math.random() * 900000)}`,
      location,
      date,
      slot,
      seatingZone,
      guestsCount,
      name,
      phone,
      specialNotes: `${specialOccasion}: ${notes}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedPass(data);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8e4d2a', '#feaa7f', '#231b15'],
      });
    } catch {
      // ignore
    }
  };

  const getSlotName = (s: string) => {
    switch (s) {
      case 'morning':
        return 'Morning Brew (8:00 – 11:30 AM)';
      case 'deepwork':
        return 'Deep Work Shift (12:00 – 4:00 PM)';
      case 'sunset':
        return 'Sunset Coffee (4:30 – 7:30 PM)';
      case 'night':
        return 'Night Owl (8:00 – 11:00 PM)';
      default:
        return s;
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3] text-[#1c1c18] min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#231b15] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#feaa7f]">
              Guaranteed Seating • Instant Confirmation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              Reserve Your Roastery Table or Work Nook
            </h1>
            <p className="text-xs sm:text-sm text-[#d3c4ba]">
              Reserve online and we will hold your spot for 20 minutes with complimentary sparkling pour-over water.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center shrink-0 border border-white/10">
            <p className="text-[10px] uppercase text-[#feaa7f] font-bold">Concierge Hotline</p>
            <p className="font-mono text-sm font-bold">+91 891 278 4400</p>
          </div>
        </div>

        {!confirmedPass ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ebe8e2] shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#040200]">
              Step 1: Choose Location &amp; Time
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Roastery Outpost
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as 'siripuram' | 'rkbeach')}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs font-medium focus:outline-none focus:border-[#8e4d2a]"
                >
                  <option value="siripuram">Siripuram Flagship (Near Dutt Island)</option>
                  <option value="rkbeach">RK Beach Coastal Outpost (Beach Rd)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs font-medium focus:outline-none focus:border-[#8e4d2a]"
                />
              </div>
            </div>

            {/* Session slot */}
            <div>
              <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-2">
                Session Shift
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'morning', label: 'Morning Brew', time: '8:00 – 11:30 AM' },
                  { id: 'deepwork', label: 'Deep Work Shift', time: '12:00 – 4:00 PM' },
                  { id: 'sunset', label: 'Sunset Coffee', time: '4:30 – 7:30 PM' },
                  { id: 'night', label: 'Night Owl', time: '8:00 – 11:00 PM' },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSlot(s.id as 'morning' | 'deepwork' | 'sunset' | 'night')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      slot === s.id
                        ? 'bg-[#231b15] text-white border-[#231b15] shadow-xs'
                        : 'bg-[#f6f3ed] text-[#4d4540] border-transparent hover:border-[#d1c4bd]'
                    }`}
                  >
                    <p className="text-xs font-bold">{s.label}</p>
                    <p className="text-[10px] opacity-80 mt-0.5">{s.time}</p>
                  </button>
                ))}
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#040200] pt-4 border-t border-[#ebe8e2]">
              Step 2: Table Zone &amp; Party Size
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Seating Zone
                </label>
                <select
                  value={seatingZone}
                  onChange={(e) => setSeatingZone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs font-medium focus:outline-none focus:border-[#8e4d2a]"
                >
                  <option>Quiet AC Work Mezzanine (Plug Desks)</option>
                  <option>Ocean Breeze Outdoor Patio</option>
                  <option>Roastery Central Brew Bar</option>
                  <option>Private Meeting Pod (Up to 6)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Party Size
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs font-medium focus:outline-none focus:border-[#8e4d2a]"
                >
                  <option>1 Person (Solo Work Desk)</option>
                  <option>2 Persons (Duo Coffee)</option>
                  <option>3 - 4 Persons (Small Group)</option>
                  <option>5 - 8 Persons (Meeting Table)</option>
                </select>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#040200] pt-4 border-t border-[#ebe8e2]">
              Step 3: Contact &amp; Special Occasion
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sravanthi Varma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs focus:outline-none focus:border-[#8e4d2a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  WhatsApp Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs focus:outline-none focus:border-[#8e4d2a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Occasion Type
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs font-medium focus:outline-none focus:border-[#8e4d2a]"
                >
                  <option>Casual Specialty Coffee</option>
                  <option>Remote Work &amp; Laptop Sprint</option>
                  <option>Client Meeting / Interview</option>
                  <option>Birthday / Celebration</option>
                  <option>Coffee Tasting &amp; Cupping</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Specific Requests
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need corner quiet table with two plugs"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs focus:outline-none focus:border-[#8e4d2a]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span className="material-symbols-outlined text-[20px]">check</span>
              <span>Confirm Instant Table Reservation</span>
            </button>
          </form>
        ) : (
          <div className="p-8 rounded-3xl bg-white border border-[#ebe8e2] shadow-xl space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 text-emerald-800">
              <span className="material-symbols-outlined text-3xl">verified</span>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#040200]">
                  Table Reserved Successfully!
                </h3>
                <p className="text-xs text-[#4d4540]">
                  Your reservation reference is ready. We look forward to welcoming you.
                </p>
              </div>
            </div>

            {/* Boarding pass */}
            <div className="p-6 rounded-2xl bg-[#231b15] text-white space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#feaa7f] font-bold">
                    Official Reservation Pass
                  </span>
                  <h4 className="font-serif text-xl font-bold">
                    {confirmedPass.location === 'siripuram'
                      ? 'Siripuram Flagship Roastery'
                      : 'RK Beach Coastal Outpost'}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#d3c4ba]">Ref Number</span>
                  <p className="font-mono text-base font-bold text-[#feaa7f]">{confirmedPass.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs py-2">
                <div>
                  <span className="text-[10px] text-[#d3c4ba]">Name</span>
                  <p className="font-bold">{confirmedPass.name}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#d3c4ba]">Party</span>
                  <p className="font-bold">{confirmedPass.guestsCount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#d3c4ba]">Date</span>
                  <p className="font-bold">{confirmedPass.date}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#d3c4ba]">Session</span>
                  <p className="font-bold text-[#feaa7f]">{getSlotName(confirmedPass.slot)}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs text-[#d3c4ba]">
                <span>Zone: <strong>{confirmedPass.seatingZone}</strong></span>
                <span className="text-emerald-400 font-semibold">Priority Seat Held</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const locText =
                    confirmedPass.location === 'siripuram'
                      ? 'Siripuram Flagship'
                      : 'RK Beach Coastal Outpost';
                  const msg = `*Araku Coast Reservation Verified*\nBooking ID: ${confirmedPass.id}\nName: ${confirmedPass.name}\nLocation: ${locText}\nDate: ${confirmedPass.date}\nShift: ${getSlotName(confirmedPass.slot)}\nZone: ${confirmedPass.seatingZone}`;
                  window.open(`https://wa.me/919440155620?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="flex-1 py-3 px-5 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Send to WhatsApp Concierge</span>
              </button>

              <button
                onClick={() => setConfirmedPass(null)}
                className="py-3 px-6 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-bold text-[#1c1c18] transition-colors cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
