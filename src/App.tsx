/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ScreenType, MenuItem, CartItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { StudentPassModal } from './components/StudentPassModal';
import { HomeScreen } from './screens/HomeScreen';
import { MenuScreen } from './screens/MenuScreen';
import { WorkDesksScreen } from './screens/WorkDesksScreen';
import { BeanOriginScreen } from './screens/BeanOriginScreen';
import { ReserveScreen } from './screens/ReserveScreen';
import { LocationsScreen } from './screens/LocationsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedLocation, setSelectedLocation] = useState<'siripuram' | 'rkbeach'>('siripuram');

  // Modals
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleAddToCart = (item: MenuItem, milkChoice?: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (ci) => ci.menuItem.id === item.id && ci.milkChoice === milkChoice
      );
      if (existing) {
        return prev.map((ci) =>
          ci === existing ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1, milkChoice }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.menuItem.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f3] text-[#1c1c18] font-sans antialiased selection:bg-[#feaa7f] selection:text-[#783d1a]">
      {/* Top Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onOpenReserveModal={() => setIsReserveModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-28">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={setCurrentScreen}
            onOpenReserveModal={() => setIsReserveModalOpen(true)}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentScreen === 'seasonal-menu' && (
          <MenuScreen
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
        {currentScreen === 'work-and-desks' && (
          <WorkDesksScreen
            onOpenStudentModal={() => setIsStudentModalOpen(true)}
            onOpenReserveModal={() => setIsReserveModalOpen(true)}
          />
        )}
        {currentScreen === 'bean-origin' && <BeanOriginScreen />}
        {currentScreen === 'reserve-table' && (
          <ReserveScreen selectedLocation={selectedLocation} />
        )}
        {currentScreen === 'locations' && (
          <LocationsScreen
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            onOpenReserveModal={() => setIsReserveModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentScreen}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
      />

      {/* Interactive Cart & WhatsApp Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        selectedLocation={selectedLocation}
      />

      {/* Table & Desk Reservation Modal */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        defaultLocation={selectedLocation}
      />

      {/* AU & GITAM Student Pass Verification Modal */}
      <StudentPassModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
      />
    </div>
  );
}
