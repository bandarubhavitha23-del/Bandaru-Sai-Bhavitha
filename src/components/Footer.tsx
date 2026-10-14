import React from 'react';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenStudentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStudentModal }) => {
  return (
    <footer className="w-full bg-[#f6f3ed] text-[#1c1c18] border-t border-[#ebe8e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-8">
        {/* GITAM & AU Community Perk Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#f0eee8] border border-[#d1c4bd]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#feaa7f] flex items-center justify-center text-[#783d1a] shrink-0">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div>
              <p className="text-[15px] sm:text-[16px] text-[#040200] font-bold">
                Gitam &amp; Andhra University Student Community Perk
              </p>
              <p className="text-xs sm:text-sm text-[#4d4540]">
                Show your valid student university ID at the brew bar for 15% off espresso beverages &amp; free co-working hours.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenStudentModal}
            className="text-xs font-bold px-4 py-2 rounded-full bg-white text-[#8e4d2a] hover:bg-[#8e4d2a] hover:text-white transition-all shadow-sm shrink-0 cursor-pointer"
          >
            Claim Student Pass
          </button>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          {/* Col 1: Brand story */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl text-[#040200] font-bold">Araku Coast</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4d4540] leading-relaxed">
              Crafting single-estate Araku Valley coffee with the coastal breeze of the Bay of Bengal. Roasted weekly in Visakhapatnam.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] flex items-center justify-center text-[#4d4540] hover:text-[#040200] transition-colors"
                title="Instagram"
              >
                <span className="material-symbols-outlined text-[16px]">camera</span>
              </a>
              <a
                href="https://wa.me/919440155620"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] flex items-center justify-center text-[#4d4540] hover:text-[#040200] transition-colors"
                title="WhatsApp"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
              </a>
              <a
                href="mailto:hello@arakucoast.in"
                className="w-8 h-8 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] flex items-center justify-center text-[#4d4540] hover:text-[#040200] transition-colors"
                title="Email"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </a>
            </div>
          </div>

          {/* Col 2: Locations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#040200] uppercase tracking-wider">Roastery Locations</h3>
            <div className="space-y-2 text-xs sm:text-sm text-[#4d4540]">
              <div>
                <p className="font-semibold text-[#1c1c18]">Siripuram Flagship</p>
                <p>Plot 42, Waltair Uplands, Siripuram, Vizag</p>
                <p className="text-[11px] text-[#8e4d2a] font-semibold">Opposite Dutt Island</p>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-[#1c1c18]">RK Beach Coastal Outpost</p>
                <p>Beach Road Promenade, Near Submarine Museum, Vizag</p>
              </div>
              <button
                onClick={() => onNavigate('locations')}
                className="inline-flex items-center gap-1 text-[#8e4d2a] font-semibold hover:underline pt-1 text-xs"
              >
                <span className="material-symbols-outlined text-[15px]">map</span>
                <span>Get Google Maps Directions</span>
              </button>
            </div>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#040200] uppercase tracking-wider">Roastery Hours</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#4d4540]">
              <li>
                Monday – Friday: <span className="text-[#1c1c18] font-medium">7:30 AM – 11:00 PM</span>
              </li>
              <li>
                Saturday – Sunday: <span className="text-[#1c1c18] font-medium">7:00 AM – 11:30 PM</span>
              </li>
              <li>
                Tasting Sessions: <span className="text-[#1c1c18] font-medium">Tue &amp; Thu at 4:00 PM</span>
              </li>
              <li>
                Quiet Work Hours: <span className="text-[#1c1c18] font-medium">8:00 AM – 1:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Connect */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#040200] uppercase tracking-wider">Quick Connect</h3>
            <div className="space-y-1 text-xs sm:text-sm text-[#4d4540]">
              <p>Phone: +91 891 278 4400</p>
              <p>WhatsApp: +91 94401 55620</p>
              <p>hello@arakucoast.in</p>
            </div>
            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 rounded bg-[#ebe8e2] text-[#1c1c18] text-[11px] font-semibold">
                High-Speed Mesh Wi-Fi Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#ebe8e2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4d4540]">
          <p>© 2025 Araku Coast Roastery &amp; Cafe. Visakhapatnam, Andhra Pradesh.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="hover:text-[#040200] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('bean-origin')} className="hover:text-[#040200] transition-colors">
              Brew Terms
            </button>
            <span className="text-[#7f756f]">FSSAI License #10123028000412</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
