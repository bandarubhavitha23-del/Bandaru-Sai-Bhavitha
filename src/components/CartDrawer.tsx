import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  selectedLocation: 'siripuram' | 'rkbeach';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
  selectedLocation,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerTable, setCustomerTable] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleWhatsAppOrder = () => {
    const locName = selectedLocation === 'siripuram' ? 'Siripuram Flagship' : 'RK Beach Coastal Outpost';
    const itemsList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.menuItem.name} (₹${i.menuItem.price * i.quantity})${
            i.milkChoice ? ` [${i.milkChoice}]` : ''
          }`
      )
      .join('\n');

    const msg = `*Araku Coast Roastery Order*\n` +
      `📍 *Location:* ${locName}\n` +
      `${customerName ? `👤 *Name:* ${customerName}\n` : ''}` +
      `${customerTable ? `🪑 *Table/Desk:* ${customerTable}\n` : ''}` +
      `\n*Order Items:*\n${itemsList}\n\n` +
      `Subtotal: ₹${subtotal}\n` +
      `5% GST: ₹${gst}\n` +
      `*Total: ₹${total}*\n` +
      `${notes ? `\n📝 *Notes:* ${notes}\n` : ''}\n` +
      `Please confirm order preparation! ☕`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919440155620?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#fcf9f3] text-[#1c1c18] shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#ebe8e2] bg-[#f6f3ed] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8e4d2a] text-[22px]">shopping_bag</span>
            <h2 className="font-serif text-lg font-bold text-[#040200]">Your Coffee &amp; Brew Tray</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe8e2] hover:bg-[#dcdad4] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#8e4d2a]/40">coffee</span>
              <p className="font-semibold text-base text-[#040200]">Your tray is empty</p>
              <p className="text-xs text-[#4d4540] max-w-xs mx-auto">
                Explore our hand-crafted seasonal specialty brews, cold drips, and freshly baked sourdough to start your order.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="p-3.5 rounded-xl bg-white border border-[#ebe8e2] flex items-center justify-between gap-3 shadow-xs"
                >
                  <img
                    src={item.menuItem.imageUrl}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 bg-[#ebe8e2]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#040200] truncate">{item.menuItem.name}</p>
                    <p className="text-[11px] text-[#8e4d2a] font-semibold">
                      ₹{item.menuItem.price} × {item.quantity} = ₹{item.menuItem.price * item.quantity}
                    </p>
                    {item.milkChoice && (
                      <p className="text-[10px] text-[#4d4540]">{item.milkChoice}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#f0eee8] rounded-full px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                      className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold hover:bg-[#8e4d2a] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1 tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                      className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold hover:bg-[#8e4d2a] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {/* Order options */}
              <div className="p-4 rounded-xl bg-[#f0eee8] space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rohith"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#d1c4bd]/40 text-xs focus:outline-none focus:border-[#8e4d2a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Table / Mezzanine Desk No. (if seated)
                  </label>
                  <input
                    type="text"
                    value={customerTable}
                    onChange={(e) => setCustomerTable(e.target.value)}
                    placeholder="e.g. Pod M-03 or Takeaway"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#d1c4bd]/40 text-xs focus:outline-none focus:border-[#8e4d2a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4d4540] uppercase tracking-wider mb-1">
                    Special Preparation Notes
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra hot, oat milk, less ice"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#d1c4bd]/40 text-xs focus:outline-none focus:border-[#8e4d2a]"
                  />
                </div>
              </div>

              {/* Delivery Outpost links */}
              <div className="flex items-center justify-between text-xs pt-1 px-1 text-[#4d4540]">
                <span>Also ordering via delivery apps?</span>
                <div className="flex gap-2">
                  <a
                    href="https://swiggy.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#8e4d2a] hover:underline"
                  >
                    Swiggy
                  </a>
                  <span>•</span>
                  <a
                    href="https://zomato.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#8e4d2a] hover:underline"
                  >
                    Zomato
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with WhatsApp button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#ebe8e2] bg-[#f6f3ed] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#4d4540]">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#4d4540]">
                <span>5% GST</span>
                <span className="font-semibold tabular-nums">₹{gst}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#040200] pt-1 border-t border-[#ebe8e2]">
                <span>Total Amount</span>
                <span className="tabular-nums">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 px-4 rounded-full bg-[#8e4d2a] hover:bg-[#783d1a] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Send Order to WhatsApp Barista</span>
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-[11px] text-[#4d4540] hover:text-[#ba1a1a] transition-colors"
            >
              Clear Tray
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
