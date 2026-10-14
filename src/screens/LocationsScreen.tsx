import React, { useState } from 'react';

interface LocationsScreenProps {
  selectedLocation: 'siripuram' | 'rkbeach';
  onLocationChange: (loc: 'siripuram' | 'rkbeach') => void;
  onOpenReserveModal: () => void;
}

export const LocationsScreen: React.FC<LocationsScreenProps> = ({
  selectedLocation,
  onLocationChange,
  onOpenReserveModal,
}) => {
  const [activeTab, setActiveTab] = useState<'siripuram' | 'rkbeach'>(selectedLocation);

  const handleSelect = (loc: 'siripuram' | 'rkbeach') => {
    setActiveTab(loc);
    onLocationChange(loc);
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3] text-[#1c1c18] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#231b15] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#feaa7f]">
              Two Distinct Coastal Atmospheres
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Visakhapatnam Outposts
            </h1>
            <p className="text-xs sm:text-sm text-[#d3c4ba] leading-relaxed">
              Experience the energetic hum of our Waltair roastery and quiet work mezzanine, or wake up to Bay of Bengal sunrise waves with cold brew in hand on Beach Road.
            </p>
          </div>

          <div className="flex gap-2 bg-white/10 p-1.5 rounded-full border border-white/10">
            <button
              onClick={() => handleSelect('siripuram')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'siripuram' ? 'bg-[#feaa7f] text-[#341100]' : 'text-white hover:text-[#feaa7f]'
              }`}
            >
              Siripuram Flagship
            </button>
            <button
              onClick={() => handleSelect('rkbeach')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'rkbeach' ? 'bg-[#a0f0f1] text-[#002020]' : 'text-white hover:text-[#a0f0f1]'
              }`}
            >
              RK Beach Outpost
            </button>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#8e4d2a]/30 blur-3xl pointer-events-none"></div>
        </div>

        {/* Location Spotlight */}
        {activeTab === 'siripuram' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
            {/* Visuals */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/10] bg-[#231b15]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                  alt="Siripuram Flagship Cafe Interior with Wooden Roasting Counter"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#231b15]/90 text-white text-xs font-bold">
                  Waltair Uplands Flagship
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 text-[#040200] text-xs font-bold shadow-md">
                  Giesen Drum Roaster on Display
                </div>
              </div>

              {/* Specs Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#ebe8e2] text-center">
                  <span className="text-[10px] uppercase text-[#4d4540] font-bold">Seating Capacity</span>
                  <p className="font-serif text-lg font-bold text-[#040200] mt-0.5">72 Guests</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#ebe8e2] text-center">
                  <span className="text-[10px] uppercase text-[#4d4540] font-bold">Quiet Work Plugs</span>
                  <p className="font-serif text-lg font-bold text-[#8e4d2a] mt-0.5">14 Desks Open</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#ebe8e2] text-center">
                  <span className="text-[10px] uppercase text-[#4d4540] font-bold">Roasting Days</span>
                  <p className="font-serif text-lg font-bold text-[#040200] mt-0.5">Tue &amp; Thu</p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#ebe8e2] shadow-sm flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#231b15] text-white font-bold">
                    Flagship &amp; Roastery
                  </span>
                  <span className="text-xs text-[#8e4d2a] font-bold">Open Daily till 11 PM</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#040200]">
                  Waltair Uplands / Siripuram
                </h2>

                <p className="text-xs sm:text-sm text-[#4d4540] leading-relaxed">
                  Located in the bustling center of Visakhapatnam across from Dutt Island. Houses our main batch roastery, acoustic mezzanine work sanctum, and open cupping table.
                </p>

                <div className="p-3.5 rounded-xl bg-[#f6f3ed] space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4d2a] shrink-0 mt-0.5">
                      location_on
                    </span>
                    <p className="text-[#1c1c18]">
                      Plot 42, Waltair Uplands, Opposite Dutt Island, Siripuram, Visakhapatnam – 530003
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4d2a] shrink-0">
                      schedule
                    </span>
                    <p className="text-[#1c1c18]">7:30 AM – 11:00 PM Daily</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4d2a] shrink-0">
                      call
                    </span>
                    <p className="text-[#1c1c18]">+91 891 278 4400</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <span className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider block mb-2">
                    Location Features
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">Valet Parking</span>
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">Pet Patio</span>
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">Quiet AC Mezzanine</span>
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">Public Cuppings</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#ebe8e2]">
                <button
                  onClick={onOpenReserveModal}
                  className="flex-1 py-3 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold transition-all cursor-pointer shadow-sm text-center"
                >
                  Book Seat at Siripuram
                </button>
                <a
                  href="https://maps.google.com/?q=Siripuram+Visakhapatnam"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-5 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-bold text-[#1c1c18] transition-colors flex items-center justify-center gap-1"
                >
                  <span>Google Maps</span>
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
            {/* Visuals */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/10] bg-[#002121]">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                  alt="Visakhapatnam Beach Road Sea Waves"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#002121]/90 text-[#a0f0f1] text-xs font-bold">
                  RK Beach Coastal Outpost
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 text-[#040200] text-xs font-bold shadow-md">
                  Sunrise Brews from 6:30 AM
                </div>
              </div>

              {/* Beach Telemetry Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#ebe8e2] text-center">
                  <span className="text-[10px] uppercase text-[#4d4540] font-bold">Bay Breeze</span>
                  <p className="font-serif text-lg font-bold text-[#004f50] mt-0.5">14 Knots Mild</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#ebe8e2] text-center">
                  <span className="text-[10px] uppercase text-[#4d4540] font-bold">Distance from Submarine</span>
                  <p className="font-serif text-lg font-bold text-[#040200] mt-0.5">150 Meters</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#ebe8e2] text-center">
                  <span className="text-[10px] uppercase text-[#4d4540] font-bold">Sunset Golden Hour</span>
                  <p className="font-serif text-lg font-bold text-[#8e4d2a] mt-0.5">5:45 PM</p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#ebe8e2] shadow-sm flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#002121] text-[#a0f0f1] font-bold">
                    Coastal Outpost
                  </span>
                  <span className="text-xs text-[#8e4d2a] font-bold">Early Morning 6:30 AM</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#040200]">
                  RK Beach Road Coastal Outpost
                </h2>

                <p className="text-xs sm:text-sm text-[#4d4540] leading-relaxed">
                  Perched along Beach Road Promenade with direct sightlines of the Bay of Bengal surf. Perfect for morning joggers, cyclists, and sunset cold brews under the sea breeze.
                </p>

                <div className="p-3.5 rounded-xl bg-[#f6f3ed] space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4d2a] shrink-0 mt-0.5">
                      location_on
                    </span>
                    <p className="text-[#1c1c18]">
                      Beach Road Promenade, 150m from Kursura Submarine Museum, Visakhapatnam – 530017
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4d2a] shrink-0">
                      schedule
                    </span>
                    <p className="text-[#1c1c18]">6:30 AM – 11:30 PM Daily</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4d2a] shrink-0">
                      call
                    </span>
                    <p className="text-[#1c1c18]">+91 891 278 4401</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <span className="text-[11px] font-bold text-[#4d4540] uppercase tracking-wider block mb-2">
                    Location Features
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">Ocean View Seating</span>
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">Cyclist Racks</span>
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">Express Takeaway Window</span>
                    <span className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18]">350 Mbps Wi-Fi</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#ebe8e2]">
                <button
                  onClick={onOpenReserveModal}
                  className="flex-1 py-3 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold transition-all cursor-pointer shadow-sm text-center"
                >
                  Book Seat at RK Beach
                </button>
                <a
                  href="https://maps.google.com/?q=Kursura+Submarine+Museum+RK+Beach+Visakhapatnam"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-5 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-bold text-[#1c1c18] transition-colors flex items-center justify-center gap-1"
                >
                  <span>Google Maps</span>
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
