import React, { useState } from 'react';
import { ScreenType } from '../types';
import { LOGO_URL } from '../data/cafeData';
import { coastalSoundscape } from '../utils/audioAmbiance';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  selectedLocation: 'siripuram' | 'rkbeach';
  onLocationChange: (loc: 'siripuram' | 'rkbeach') => void;
  onOpenReserveModal: () => void;
  onOpenCart: () => void;
  onOpenStudentModal: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  selectedLocation,
  onLocationChange,
  onOpenReserveModal,
  onOpenCart,
  onOpenStudentModal,
  cartCount,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = coastalSoundscape.toggle();
    setIsPlayingAudio(active);
  };

  const navItems: { label: string; screen: ScreenType }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Seasonal Menu', screen: 'seasonal-menu' },
    { label: 'Work & Desks', screen: 'work-and-desks' },
    { label: 'Bean Origin', screen: 'bean-origin' },
    { label: 'Reserve Table', screen: 'reserve-table' },
    { label: 'Locations', screen: 'locations' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f3]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(35,27,21,0.04)] transition-all">
      {/* Top Telemetry / Status Bar */}
      <div className="w-full bg-[#f6f3ed] px-4 sm:px-6 lg:px-12 py-1 text-[#4d4540] text-[11px] font-semibold tracking-wider transition-colors border-b border-[#231b15]/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Status and Speed */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8e4d2a] animate-pulse"></span>
              <span className="text-[#1c1c18] font-semibold">Open Now</span>
              <span className="text-[#d1c4bd]">|</span>
              <span className="hidden sm:inline">Peak Hours 5:00 PM – 9:00 PM</span>
            </div>
            <div className="flex items-center gap-1 bg-[#f0eee8] px-2 py-0.5 rounded-full text-[#8e4d2a]">
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span>300 Mbps Fiber</span>
            </div>
          </div>

          {/* Location Picker, Hours & Ambient Sound */}
          <div className="flex items-center gap-3">
            {/* Audio Ambiance Toggle */}
            <button
              onClick={toggleSound}
              className={`hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all ${
                isPlayingAudio
                  ? 'bg-[#8e4d2a] text-white shadow-sm'
                  : 'bg-[#ebe8e2] text-[#4d4540] hover:text-[#1c1c18]'
              }`}
              title="Toggle Serene Coastal Waves Soundscape"
            >
              <span className="material-symbols-outlined text-[14px]">
                {isPlayingAudio ? 'volume_up' : 'volume_mute'}
              </span>
              <span>{isPlayingAudio ? 'Coastal Waves ON' : 'Ambient Lo-Fi'}</span>
            </button>

            {/* Location Switcher */}
            <div className="flex items-center bg-[#ebe8e2] rounded-full p-0.5 text-[11px] font-semibold">
              <button
                onClick={() => onLocationChange('siripuram')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  selectedLocation === 'siripuram'
                    ? 'bg-[#fcf9f3] text-[#1c1c18] shadow-[0_1px_4px_rgba(0,0,0,0.05)]'
                    : 'text-[#4d4540] hover:text-[#1c1c18]'
                }`}
              >
                Siripuram
              </button>
              <button
                onClick={() => onLocationChange('rkbeach')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  selectedLocation === 'rkbeach'
                    ? 'bg-[#fcf9f3] text-[#1c1c18] shadow-[0_1px_4px_rgba(0,0,0,0.05)]'
                    : 'text-[#4d4540] hover:text-[#1c1c18]'
                }`}
              >
                RK Beach Rd
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-[#4d4540]">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              <span>{selectedLocation === 'siripuram' ? '7:30 AM – 11:00 PM' : '6:30 AM – 11:30 PM'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <img
            alt="Araku Coast Roastery Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-serif text-[19px] sm:text-[21px] tracking-tight text-[#040200] font-bold leading-none">
              ARAKU COAST
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#8e4d2a] font-semibold">
              Roastery & Cafe • Vizag
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[15px] font-semibold text-[#4d4540]">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`transition-colors whitespace-nowrap pb-1 ${
                  isActive
                    ? 'text-[#040200] font-bold border-b-2 border-[#8e4d2a]'
                    : 'hover:text-[#040200]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Order Button */}
          <button
            onClick={onOpenCart}
            className="relative hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#1c1c18] bg-[#f0eee8] hover:bg-[#ebe8e2] transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-[#8e4d2a]">chat</span>
            <span>WhatsApp Order</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#8e4d2a] text-white text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve Table Button */}
          <button
            onClick={onOpenReserveModal}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-[#231b15] hover:bg-[#040200] transition-all shadow-[0_4px_16px_-4px_rgba(35,27,21,0.15)] cursor-pointer"
          >
            Reserve Table
          </button>

          {/* Student Perk / Member Button */}
          <button
            onClick={onOpenStudentModal}
            className="w-9 h-9 rounded-full bg-[#040200] hover:bg-[#8e4d2a] text-white flex items-center justify-center transition-colors cursor-pointer"
            title="AU & GITAM Student Pass Perk"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#1c1c18] hover:bg-[#f0eee8] transition-colors"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fcf9f3] border-b border-[#d1c4bd]/40 px-6 py-4 flex flex-col gap-3 shadow-lg animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => {
                onNavigate(item.screen);
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                currentScreen === item.screen
                  ? 'bg-[#f0eee8] text-[#8e4d2a]'
                  : 'text-[#4d4540] hover:bg-[#f6f3ed]'
              }`}
            >
              <span>{item.label}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          ))}
          <div className="pt-2 border-t border-[#ebe8e2] flex items-center justify-between">
            <button
              onClick={() => {
                toggleSound();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#8e4d2a]"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPlayingAudio ? 'volume_up' : 'volume_mute'}
              </span>
              <span>{isPlayingAudio ? 'Coastal Waves (Playing)' : 'Play Coastal Waves'}</span>
            </button>
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-full bg-[#8e4d2a] text-white text-xs font-bold"
            >
              Order ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
