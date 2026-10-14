import React, { useState } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuScreenProps {
  onAddToCart: (item: MenuItem, milkChoice?: string) => void;
  onOpenCart: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onAddToCart, onOpenCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDiet, setActiveDiet] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [selectedMilk, setSelectedMilk] = useState('Whole Dairy');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet =
      activeDiet === 'all' ||
      (activeDiet === 'vegan' && item.dietTag?.includes('Vegan')) ||
      (activeDiet === 'jain' && item.diet === 'jain') ||
      (activeDiet === 'special' && item.diet === 'special');
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDiet && matchesSearch;
  });

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3] text-[#1c1c18] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#231b15] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#feaa7f]">
              Hand-Roasted in Vizag • Sourced from Araku Smallholders
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Seasonal Specialty Brews &amp; Kitchen
            </h1>
            <p className="text-xs sm:text-sm text-[#d3c4ba] leading-relaxed">
              Explore our single-estate micro-lots roasted on Tuesdays, botanical coastal espresso tonics, and European sourdough bakes prepared fresh every morning.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-2 shrink-0">
            <button
              onClick={onOpenCart}
              className="px-5 py-3 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Open Brew Tray &amp; Checkout</span>
            </button>
            <span className="text-[11px] text-[#d3c4ba] text-center">
              Instant delivery or table service
            </span>
          </div>

          {/* Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#8e4d2a]/30 blur-3xl pointer-events-none"></div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#f0eee8] p-4 rounded-2xl border border-[#ebe8e2]">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#7f756f]">
              search
            </span>
            <input
              type="text"
              placeholder="Search brews, toasts, or origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white text-xs text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#8e4d2a] border border-[#d1c4bd]/40"
            />
          </div>

          {/* Diet filters */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Menu' },
              { id: 'vegan', label: '🌱 Vegan' },
              { id: 'jain', label: '🕊️ Jain Friendly' },
              { id: 'special', label: '⭐ Chef’s Special' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDiet(d.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeDiet === d.id
                    ? 'bg-[#231b15] text-white shadow-xs'
                    : 'bg-white text-[#4d4540] hover:text-[#040200]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'araku', label: 'Araku Valley Terroir Specials' },
            { id: 'espresso', label: 'Espresso Bar & Kyoto Cold Drip' },
            { id: 'breakfast', label: 'Artisanal Sourdough & Bowls' },
            { id: 'continental', label: 'Continental & Pressed Panini' },
            { id: 'desserts', label: 'Handmade Bakes & Babkas' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#8e4d2a] text-white shadow-sm'
                  : 'bg-[#f0eee8] text-[#4d4540] hover:bg-[#ebe8e2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl overflow-hidden bg-white border border-[#ebe8e2] shadow-xs hover:shadow-lg transition-all"
            >
              <div className="relative w-full h-56 bg-[#f0eee8] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
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

              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8e4d2a] font-semibold">
                    <span>{item.origin}</span>
                    <span>{item.subTitle}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#040200] font-bold mt-1 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#4d4540] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>

                  {item.notes && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {item.notes.map((n, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#f6f3ed] text-[#4d4540] font-medium"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.brewMethod && (
                    <div className="mt-2 text-[11px] text-[#4d4540] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#8e4d2a]">
                        coffee_maker
                      </span>
                      <span>Brewed via: <strong>{item.brewMethod}</strong></span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#ebe8e2]">
                  <button
                    onClick={() => {
                      setSelectedItemForModal(item);
                      setSelectedMilk('Whole Dairy');
                    }}
                    className="flex-1 py-2 px-3 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-semibold text-[#1c1c18] transition-colors cursor-pointer"
                  >
                    Customize Brew
                  </button>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="py-2 px-4 rounded-full bg-[#231b15] hover:bg-[#8e4d2a] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    + Add to Tray
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Customization Modal */}
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#ebe8e2]">
              <div className="relative h-44 bg-[#f0eee8]">
                <img
                  src={selectedItemForModal.imageUrl}
                  alt={selectedItemForModal.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#040200]">
                    {selectedItemForModal.name}
                  </h3>
                  <p className="text-xs text-[#8e4d2a] font-semibold">
                    {selectedItemForModal.origin} • ₹{selectedItemForModal.price}
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1.5">
                    Select Milk or Plant Alternative
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Whole Dairy', 'Oat Milk (+₹30)', 'Almond Milk (+₹35)'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMilk(m)}
                        className={`p-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedMilk === m
                            ? 'bg-[#231b15] text-white border-[#231b15]'
                            : 'bg-[#f6f3ed] text-[#4d4540] border-[#d1c4bd]/40'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(selectedItemForModal, selectedMilk);
                      setSelectedItemForModal(null);
                    }}
                    className="w-full py-3 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>Add to Tray with {selectedMilk}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
