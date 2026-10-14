import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DESK_SEATS } from '../data/cafeData';
import { DeskSeat } from '../types';

interface WorkDesksScreenProps {
  onOpenStudentModal: () => void;
  onOpenReserveModal: () => void;
}

export const WorkDesksScreen: React.FC<WorkDesksScreenProps> = ({
  onOpenStudentModal,
  onOpenReserveModal,
}) => {
  const [selectedDesk, setSelectedDesk] = useState<DeskSeat | null>(null);
  const [reservedDesks, setReservedDesks] = useState<string[]>([]);
  const [deskReservedSuccess, setDeskReservedSuccess] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingTime, setBookingTime] = useState('12:00 PM – 4:00 PM');

  // Interactive Live Wi-Fi Speedtest State
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(348.6);
  const [uploadSpeed, setUploadSpeed] = useState(192.4);
  const [pingMs, setPingMs] = useState(4);

  const availableCount = DESK_SEATS.filter(
    (d) => !d.isOccupied && !reservedDesks.includes(d.id)
  ).length;

  const handleTestWifi = () => {
    setIsTesting(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setDownloadSpeed(Math.floor(250 + Math.random() * 120));
      setUploadSpeed(Math.floor(150 + Math.random() * 60));
      setPingMs(Math.floor(3 + Math.random() * 3));
      if (count > 6) {
        clearInterval(interval);
        setIsTesting(false);
        setDownloadSpeed(352.4);
        setUploadSpeed(204.1);
        setPingMs(4);
      }
    }, 200);
  };

  const handleBookDesk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesk) return;
    setReservedDesks([...reservedDesks, selectedDesk.id]);
    setDeskReservedSuccess(true);
    try {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#8e4d2a', '#feaa7f', '#231b15'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3] text-[#1c1c18] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#231b15] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#feaa7f] text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
              <span>Acoustic Mezzanine &amp; Enterprise Mesh</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Work &amp; Desks Sanctuary
            </h1>
            <p className="text-xs sm:text-sm text-[#d3c4ba] leading-relaxed">
              Engineered for founders, AU researchers, GITAM coders, and remote creatives. Zero music bleed, universal power at every chair, and dual ISP failover redundancy.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-2 shrink-0">
            <button
              onClick={onOpenStudentModal}
              className="px-5 py-3 rounded-full bg-[#feaa7f] hover:bg-[#ffb691] text-[#341100] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span>AU / GITAM Student Pass</span>
            </button>
            <span className="text-[11px] text-[#d3c4ba] text-center">
              15% discount on all coffee
            </span>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#8e4d2a]/30 blur-3xl pointer-events-none"></div>
        </div>

        {/* Live Network & Acoustic Telemetry Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Wi-Fi Speed */}
          <div className="p-5 rounded-2xl bg-white border border-[#ebe8e2] flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4d4540] uppercase tracking-wider">
                Enterprise Fiber Mesh
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#040200] font-mono tabular-nums">
                {downloadSpeed.toFixed(1)} <span className="text-sm font-sans font-normal text-[#4d4540]">Mbps Down</span>
              </p>
              <p className="text-xs text-[#4d4540] mt-0.5">
                Upload: <strong className="font-mono">{uploadSpeed.toFixed(1)} Mbps</strong> • Latency: <strong className="font-mono">{pingMs}ms</strong>
              </p>
            </div>
            <button
              onClick={handleTestWifi}
              disabled={isTesting}
              className="py-1.5 px-3 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-semibold text-[#1c1c18] transition-colors cursor-pointer w-max"
            >
              {isTesting ? 'Simulating Packets...' : 'Run Speedtest Check'}
            </button>
          </div>

          {/* Acoustic Decibels */}
          <div className="p-5 rounded-2xl bg-white border border-[#ebe8e2] flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4d4540] uppercase tracking-wider">
                Acoustic Dampening
              </span>
              <span className="material-symbols-outlined text-[#8e4d2a] text-[18px]">graphic_eq</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#040200] font-mono tabular-nums">
                38 – 42 <span className="text-sm font-sans font-normal text-[#4d4540]">dB (Whisper Level)</span>
              </p>
              <p className="text-xs text-[#4d4540] mt-0.5">
                Engineered cork-wood ceiling baffles prevent speech reverberation.
              </p>
            </div>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-max font-semibold">
              Optimal Deep Focus Zone
            </span>
          </div>

          {/* Plugs & Ergonomics */}
          <div className="p-5 rounded-2xl bg-white border border-[#ebe8e2] flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4d4540] uppercase tracking-wider">
                Seat Availability
              </span>
              <span className="material-symbols-outlined text-[#8e4d2a] text-[18px]">chair</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#8e4d2a] font-mono tabular-nums">
                {availableCount} <span className="text-sm font-sans font-normal text-[#4d4540]">/ 14 Desks Open</span>
              </p>
              <p className="text-xs text-[#4d4540] mt-0.5">
                Every station equipped with 65W GaN USB-C and 3-pin universal sockets.
              </p>
            </div>
            <button
              onClick={onOpenReserveModal}
              className="py-1.5 px-3 rounded-full bg-[#231b15] hover:bg-[#8e4d2a] text-xs font-semibold text-white transition-colors cursor-pointer w-max"
            >
              Full Space Booking
            </button>
          </div>
        </div>

        {/* Interactive Desk Floor Map */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#f0eee8] border border-[#ebe8e2] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#040200]">
                Mezzanine Interactive Seat Selector
              </h2>
              <p className="text-xs text-[#4d4540]">
                Click an open desk to view hardware specs, acoustic level, and lock your reservation.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-white border border-emerald-500"></span>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#231b15]"></span>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#d1c4bd]"></span>
                <span>Occupied</span>
              </div>
            </div>
          </div>

          {/* Grid of Desks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {DESK_SEATS.map((desk) => {
              const isReservedByMe = reservedDesks.includes(desk.id);
              const isOccupied = desk.isOccupied || isReservedByMe;
              const isSelected = selectedDesk?.id === desk.id;

              return (
                <div
                  key={desk.id}
                  onClick={() => {
                    if (!isOccupied) {
                      setSelectedDesk(desk);
                      setDeskReservedSuccess(false);
                    }
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-[#231b15] text-white border-[#231b15] shadow-md scale-102'
                      : isOccupied
                      ? 'bg-[#ebe8e2] text-[#7f756f] border-transparent cursor-not-allowed opacity-75'
                      : 'bg-white text-[#1c1c18] border-[#ebe8e2] hover:border-[#8e4d2a] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-wider">
                      {desk.id}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-[#feaa7f] text-[#341100]'
                          : isOccupied
                          ? 'bg-[#d1c4bd] text-[#4d4540]'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isReservedByMe ? 'Booked by You' : isOccupied ? 'Occupied' : 'Open'}
                    </span>
                  </div>

                  <div>
                    <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#040200]'}`}>
                      {desk.label}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#d3c4ba]' : 'text-[#4d4540]'}`}>
                      {desk.plugType}
                    </p>
                  </div>

                  <div className="pt-1 border-t border-current/10 flex items-center justify-between text-[10px]">
                    <span>{desk.noiseLevel}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {desk.type === 'ocean_view' ? 'waves' : 'electrical_services'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Desk Reservation Bar */}
          {selectedDesk && (
            <div className="p-6 rounded-2xl bg-white border border-[#8e4d2a] shadow-lg animate-fadeIn flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold bg-[#8e4d2a] text-white px-2 py-0.5 rounded">
                    {selectedDesk.id}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#040200]">
                    {selectedDesk.label}
                  </h3>
                </div>
                <p className="text-xs text-[#4d4540]">
                  Power: <strong>{selectedDesk.plugType}</strong> • Acoustic: <strong>{selectedDesk.noiseLevel}</strong>
                </p>
              </div>

              {!deskReservedSuccess ? (
                <form onSubmit={handleBookDesk} className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Rohith)"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="px-3.5 py-2 rounded-full bg-[#f6f3ed] text-xs text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#8e4d2a]"
                  />
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="px-3.5 py-2 rounded-full bg-[#f6f3ed] text-xs text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#8e4d2a]"
                  >
                    <option>8:00 AM – 12:00 PM</option>
                    <option>12:00 PM – 4:00 PM</option>
                    <option>4:30 PM – 8:30 PM</option>
                    <option>All-Day Study Shift</option>
                  </select>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Lock This Desk
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>{selectedDesk.id} reserved for {bookingName || 'you'}! Show pass at counter.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
