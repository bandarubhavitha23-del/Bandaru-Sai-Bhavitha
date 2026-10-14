import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocation?: 'siripuram' | 'rkbeach';
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  defaultLocation = 'siripuram',
}) => {
  const [location, setLocation] = useState<'siripuram' | 'rkbeach'>(defaultLocation);
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState<'morning' | 'deepwork' | 'sunset' | 'night'>('deepwork');
  const [seatingZone, setSeatingZone] = useState('Quiet AC Work Mezzanine (Plug Desks)');
  const [guestsCount, setGuestsCount] = useState('1 Person (Solo Work Desk)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedData, setConfirmedData] = useState<ReservationData | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: ReservationData = {
      id: `AC-${Math.floor(100000 + Math.random() * 900000)}`,
      location,
      date,
      slot,
      seatingZone,
      guestsCount,
      name,
      phone,
      specialNotes,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedData(newReservation);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8e4d2a', '#feaa7f', '#231b15', '#3e9192'],
      });
    } catch {
      // ignore
    }
  };

  const getSlotLabel = (s: string) => {
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

  const handleWhatsAppShare = () => {
    if (!confirmedData) return;
    const loc =
      confirmedData.location === 'siripuram'
        ? 'Siripuram Flagship (Opp. Dutt Island)'
        : 'RK Beach Promenade (Nr Submarine)';
    const text =
      `*Araku Coast Reservation Confirmation*\n` +
      `Booking ID: *${confirmedData.id}*\n` +
      `Name: ${confirmedData.name}\n` +
      `Location: ${loc}\n` +
      `Date: ${confirmedData.date}\n` +
      `Session: ${getSlotLabel(confirmedData.slot)}\n` +
      `Zone: ${confirmedData.seatingZone}\n` +
      `Guests: ${confirmedData.guestsCount}\n` +
      `Tables held 20 mins. Looking forward to hosting you! ☕`;
    window.open(`https://wa.me/919440155620?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#fcf9f3] rounded-2xl shadow-2xl border border-[#ebe8e2] overflow-hidden my-6">
        {/* Modal Header */}
        <div className="p-6 bg-[#231b15] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#feaa7f] text-[22px]">calendar_today</span>
            <div>
              <h2 className="font-serif text-xl font-bold">Reserve Table or Study Pod</h2>
              <p className="text-xs text-[#d3c4ba]">Instant seat reservation at Araku Coast Vizag</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {!confirmedData ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location Picker */}
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Roastery Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value as 'siripuram' | 'rkbeach')}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] font-medium focus:outline-none focus:border-[#8e4d2a]"
                  >
                    <option value="siripuram">Siripuram Flagship (Near Dutt Island)</option>
                    <option value="rkbeach">RK Beach Coastal Outpost (Beach Rd)</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] font-medium focus:outline-none focus:border-[#8e4d2a]"
                  />
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Session Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'morning', label: 'Morning Brew', time: '8:00 – 11:30 AM' },
                    { id: 'deepwork', label: 'Deep Work', time: '12:00 – 4:00 PM' },
                    { id: 'sunset', label: 'Sunset Coffee', time: '4:30 – 7:30 PM' },
                    { id: 'night', label: 'Night Owl', time: '8:00 – 11:00 PM' },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSlot(s.id as 'morning' | 'deepwork' | 'sunset' | 'night')}
                      className={`p-2.5 text-center rounded-lg border transition-all cursor-pointer ${
                        slot === s.id
                          ? 'bg-[#231b15] text-white border-[#231b15] shadow-xs'
                          : 'bg-[#f6f3ed] text-[#4d4540] border-transparent hover:border-[#d1c4bd]'
                      }`}
                    >
                      <p className="text-xs font-bold">{s.label}</p>
                      <p className="text-[10px] opacity-80">{s.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Zone & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Seating Zone
                  </label>
                  <select
                    value={seatingZone}
                    onChange={(e) => setSeatingZone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] font-medium focus:outline-none focus:border-[#8e4d2a]"
                  >
                    <option>Quiet AC Work Mezzanine (Plug Desks)</option>
                    <option>Ocean Breeze Outdoor Patio</option>
                    <option>Roastery Central Brew Bar</option>
                    <option>Private Meeting Pod (Up to 6)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Guests Count
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] font-medium focus:outline-none focus:border-[#8e4d2a]"
                  >
                    <option>1 Person (Solo Work Desk)</option>
                    <option>2 Persons</option>
                    <option>3 - 4 Persons</option>
                    <option>5 - 8 Persons (Group Table)</option>
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] focus:outline-none focus:border-[#8e4d2a]"
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
                    className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] focus:outline-none focus:border-[#8e4d2a]"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Special Notes / Desk Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need high-power plug, client call from 2 PM"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] focus:outline-none focus:border-[#8e4d2a]"
                />
              </div>

              {/* Guarantees */}
              <div className="p-3 rounded-xl bg-[#f0eee8] text-xs text-[#4d4540] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#1c1c18]">
                  <span className="material-symbols-outlined text-[16px] text-[#8e4d2a]">verified</span>
                  <span>Instant Booking Guarantee</span>
                </div>
                <p className="text-[11px]">
                  Tables held for 20 mins. Instant confirmation will be saved and sent directly to WhatsApp.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                <span>Confirm Instant Reservation</span>
              </button>
            </form>
          ) : (
            /* Digital Boarding Pass Ticket */
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#231b15] text-white border border-white/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#feaa7f]/10 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#feaa7f] uppercase">
                      Reservation Pass
                    </span>
                    <h3 className="font-serif text-lg font-bold">
                      {confirmedData.location === 'siripuram'
                        ? 'Waltair Uplands / Siripuram'
                        : 'RK Beach Coastal Outpost'}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#d3c4ba]">Ref Number</span>
                    <p className="font-mono text-sm font-bold text-[#feaa7f]">{confirmedData.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3.5 text-xs border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#d3c4ba]">Guest Name</span>
                    <p className="font-semibold text-white">{confirmedData.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#d3c4ba]">Guests</span>
                    <p className="font-semibold text-white">{confirmedData.guestsCount}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#d3c4ba]">Date</span>
                    <p className="font-semibold text-white">{confirmedData.date}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#d3c4ba]">Session Slot</span>
                    <p className="font-semibold text-[#feaa7f]">
                      {getSlotLabel(confirmedData.slot)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-[#d3c4ba]">Reserved Area</span>
                    <p className="font-semibold text-white">{confirmedData.seatingZone}</p>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] text-[#d3c4ba]">
                  <span>Present this screen to the barista</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Seat Confirmed
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppShare}
                  className="flex-1 py-3 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Open WhatsApp Confirmation</span>
                </button>
                <button
                  onClick={() => {
                    setConfirmedData(null);
                    onClose();
                  }}
                  className="py-3 px-6 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-bold text-[#1c1c18] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
