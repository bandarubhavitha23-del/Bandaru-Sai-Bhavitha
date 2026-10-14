import React, { useState } from 'react';

interface StudentPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPassModal: React.FC<StudentPassModalProps> = ({ isOpen, onClose }) => {
  const [university, setUniversity] = useState('GITAM Deemed University');
  const [studentId, setStudentId] = useState('');
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim().length >= 4) {
      setVerified(true);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText('VIZAGSTUDENT15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#fcf9f3] rounded-2xl shadow-2xl border border-[#ebe8e2] overflow-hidden">
        {/* Header Banner */}
        <div className="bg-[#231b15] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#feaa7f] text-[24px]">school</span>
              <span className="text-xs uppercase tracking-widest text-[#feaa7f] font-bold">
                Student Community Pass
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <h3 className="font-serif text-2xl font-bold mt-2">15% Off Hand-Crafted Brews</h3>
          <p className="text-xs text-[#d3c4ba] mt-1">
            Exclusive perk for GITAM, Andhra University, and Vizag college students. Includes high-speed mezzanine co-working.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {!verified ? (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  University / College
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] font-medium focus:outline-none focus:border-[#8e4d2a]"
                >
                  <option value="GITAM Deemed University">GITAM Deemed University (Rushikonda)</option>
                  <option value="Andhra University (AU)">Andhra University (AU, Siripuram/Waltair)</option>
                  <option value="Gayatri Vidya Parishad (GVP)">Gayatri Vidya Parishad (GVPCOE)</option>
                  <option value="Andhra Medical College (AMC)">Andhra Medical College (AMC)</option>
                  <option value="Other Vizag Institution">Other Vizag Accredited Institute</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                  Student Registration / Roll No.
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1210317002 / AU2024CS"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#f6f3ed] border border-[#d1c4bd]/40 text-xs text-[#1c1c18] focus:outline-none focus:border-[#8e4d2a]"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#f0eee8] text-[11px] text-[#4d4540] flex items-start gap-2">
                <span className="material-symbols-outlined text-[#8e4d2a] text-[16px] shrink-0 mt-0.5">
                  info
                </span>
                <span>
                  Please present your physical or digital student ID card at the coffee counter upon ordering to redeem.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Verify &amp; Generate Digital Pass</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </form>
          ) : (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px]">check_circle</span>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#ffdbcb] text-[#341100] text-[11px] font-bold uppercase tracking-wider">
                  Pass Active • Verified Student
                </span>
                <h4 className="font-serif text-xl font-bold text-[#040200] mt-2">
                  Welcome, {studentId.toUpperCase()}
                </h4>
                <p className="text-xs text-[#4d4540] mt-1">{university}</p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-4 rounded-xl bg-[#231b15] text-white text-left space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#feaa7f]">
                    Araku Coast Pass
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">STATUS: VALID</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#d3c4ba]">Barista Promo Code</p>
                    <p className="font-mono text-lg font-bold text-[#feaa7f] tracking-wider">
                      VIZAGSTUDENT15
                    </p>
                  </div>
                  <button
                    onClick={copyCode}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-[#d3c4ba]/80">
                  Valid indefinitely across Siripuram Flagship &amp; RK Beach Outpost.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-bold text-[#1c1c18] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
