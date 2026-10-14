import React, { useState } from 'react';
import { TERROIR_FACTS, ROAST_BATCH_INFO, ARAKU_PLANTATION_IMG } from '../data/cafeData';

export const BeanOriginScreen: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<'ananthagiri' | 'dumbriguda' | 'chintapalli'>('ananthagiri');

  const regions = {
    ananthagiri: {
      name: 'Ananthagiri Hills Micro-Lot',
      elevation: '1,050 meters',
      soil: 'Ferruginous red laterite rich in mountain iron',
      varietal: 'SLN-795 Arabica & S-288',
      process: 'Eco-Pulped Honey Process',
      tastingNotes: 'Jasmine, starfruit, wild orange blossom, sugarcane syrup',
      farmerCollective: 'Girimani Tribal Producers Society',
      qScore: '86.5 Points',
    },
    dumbriguda: {
      name: 'Dumbriguda Plateau Sun-Dried',
      elevation: '1,200 meters',
      soil: 'High plateau loam with natural bamboo mulch',
      varietal: 'Red Bourbon & Catimor',
      process: 'Slow African Raised Bed Natural (28 Days)',
      tastingNotes: 'Blackberry preserve, dark chocolate, ripe fig, cocoa nibs',
      farmerCollective: 'Champi Valley Smallholder Collective',
      qScore: '87.2 Points',
    },
    chintapalli: {
      name: 'Chintapalli Cloud Forest Washed',
      elevation: '1,100 meters',
      soil: 'Deep humus under silver oak & pepper canopy',
      varietal: 'Selection 9 Arabica',
      process: 'Mountain Spring Water Washed',
      tastingNotes: 'Crisp green apple, Meyer lemon, roasted almond, clean lime zest',
      farmerCollective: 'Eastern Ghats Organic Federation',
      qScore: '86.0 Points',
    },
  };

  const current = regions[selectedRegion];

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-12 bg-[#fcf9f3] text-[#1c1c18] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#231b15] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#feaa7f]">
              Direct Trade Terroir &amp; Traceability
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              From Araku Valley Mist to Coastal Waves
            </h1>
            <p className="text-xs sm:text-sm text-[#d3c4ba] leading-relaxed">
              Located 115 km north of Visakhapatnam, Araku Valley's high altitude, misty winters, and shade-canopied agroforestry yield one of the most celebrated micro-lots in the Indian subcontinent.
            </p>
          </div>

          <div className="relative z-10 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center shrink-0">
            <p className="text-[11px] uppercase tracking-wider text-[#feaa7f] font-bold">Current Roast</p>
            <p className="font-serif text-2xl font-bold text-white">{ROAST_BATCH_INFO.batchNumber}</p>
            <p className="text-[10px] text-[#d3c4ba]">Roasted {ROAST_BATCH_INFO.roastDate}</p>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#8e4d2a]/30 blur-3xl pointer-events-none"></div>
        </div>

        {/* Plantation Photo Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[21/9] max-h-[380px] bg-[#231b15]">
          <img
            src={ARAKU_PLANTATION_IMG}
            alt="Araku Valley Coffee Plantation in Andhra Pradesh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#8e4d2a] text-white text-[11px] font-bold">
                1,050m – 1,200m Elevation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                Shade Grown Under Silver Oak &amp; Pepper Vines
              </h2>
              <p className="text-xs sm:text-sm text-[#d3c4ba] max-w-xl">
                Cherries ripen at a gentle pace over 9 months, locking in delicate stone-fruit and floral aromatics.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] text-[#feaa7f]">Zero Pesticides</span>
              <p className="text-sm font-bold">100% Certified Organic</p>
            </div>
          </div>
        </div>

        {/* Region Micro-Lot Selector */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ebe8e2] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#040200]">
                Explore Araku Micro-Lot Estates
              </h2>
              <p className="text-xs text-[#4d4540]">
                Select a terroir micro-region to view cupping scores, elevation, and tasting notes.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#f6f3ed] p-1.5 rounded-full border border-[#ebe8e2]">
              {(['ananthagiri', 'dumbriguda', 'chintapalli'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-[#231b15] text-white shadow-xs'
                      : 'text-[#4d4540] hover:text-[#040200]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Region Details Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-[#f0eee8]">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#feaa7f] text-[#341100] text-xs font-bold">
                  {current.qScore}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#040200]">{current.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[#4d4540] font-semibold">Elevation:</span>
                  <p className="font-bold text-[#040200]">{current.elevation}</p>
                </div>
                <div>
                  <span className="text-[#4d4540] font-semibold">Processing:</span>
                  <p className="font-bold text-[#040200]">{current.process}</p>
                </div>
                <div>
                  <span className="text-[#4d4540] font-semibold">Varietal:</span>
                  <p className="font-bold text-[#040200]">{current.varietal}</p>
                </div>
                <div>
                  <span className="text-[#4d4540] font-semibold">Farmer Society:</span>
                  <p className="font-bold text-[#040200]">{current.farmerCollective}</p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-[#8e4d2a] uppercase tracking-wider block mb-1">
                  Cupping Tasting Notes
                </span>
                <p className="text-sm text-[#1c1c18] font-medium leading-relaxed bg-white p-3 rounded-xl border border-[#ebe8e2]">
                  "{current.tastingNotes}"
                </p>
              </div>
            </div>

            <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-[#ebe8e2] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#040200]">
                Sensory Profile Wheel
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[#4d4540] mb-1">
                    <span>Aromatic Jasmine Sweetness</span>
                    <span className="font-bold text-[#040200]">9.2 / 10</span>
                  </div>
                  <div className="w-full bg-[#f0eee8] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#8e4d2a] h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#4d4540] mb-1">
                    <span>Citric Sparkling Acidity</span>
                    <span className="font-bold text-[#040200]">8.6 / 10</span>
                  </div>
                  <div className="w-full bg-[#f0eee8] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#feaa7f] h-full rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#4d4540] mb-1">
                    <span>Silky Body &amp; Mouthfeel</span>
                    <span className="font-bold text-[#040200]">8.9 / 10</span>
                  </div>
                  <div className="w-full bg-[#f0eee8] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#231b15] h-full rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#4d4540] mb-1">
                    <span>Clean Sugarcane Finish</span>
                    <span className="font-bold text-[#040200]">9.0 / 10</span>
                  </div>
                  <div className="w-full bg-[#f0eee8] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3e9192] h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terroir & Processing 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TERROIR_FACTS.map((f, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-[#ebe8e2] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#8e4d2a] font-bold">
                {f.label}
              </span>
              <p className="font-serif text-lg font-bold text-[#040200] mt-1">{f.value}</p>
              <p className="text-xs text-[#4d4540] mt-1">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
