import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  flavor: string;
  nicotine: string;
  throatHit?: string;
  capacity?: string;
  isCustom: boolean;
  quantity: number;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md"
        >
          <div className="h-full flex flex-col bg-white shadow-2xl overflow-y-scroll no-scrollbar">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-display font-bold text-slate-800 uppercase tracking-wider" id="cart-drawer-title">
                  Shopping Cart
                </h2>
                <div className="bg-sky-100 text-sky-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {items.reduce((acc, item) => acc + item.quantity, 0)} Items
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 py-4 px-6 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center text-sky-400 mb-4 animate-pulse">
                    <Trash2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-800 text-sm">Your cart is empty</h3>
                  <p className="text-slate-400 text-xs mt-1 max-w-[240px]">
                    Configure your high-performance vaping hardware and custom juices to start your bespoke journey.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-sky-500 transition-all duration-300"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl flex gap-3 hover:border-sky-100 transition-all"
                      id={`cart-item-${item.id}`}
                    >
                      <div className="w-16 h-16 rounded-lg bg-white p-1 overflow-hidden flex-shrink-0 border border-neutral-100">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-contain scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-bold text-slate-800">{item.product.name}</h4>
                            <span className="text-xs font-mono font-bold text-slate-950">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          
                          {/* Specs breakdown */}
                          <div className="text-[10px] text-slate-550 mt-1 space-y-0.5 leading-tight">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-block w-2 h-2 rounded-full border border-white" style={{ backgroundColor: item.selectedColor }} />
                              <span>Finish: {item.isCustom ? 'Anodized Premium' : 'Factory Tint'}</span>
                            </div>
                            <p>Juice Blend: <span className="text-sky-600 font-medium">{item.flavor} ({item.nicotine})</span></p>
                            {item.isCustom && (
                              <p className="text-[9px] text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded inline-block">
                                Customize: {item.throatHit} draw | {item.capacity} reservoir
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/60">
                          <div className="flex items-center gap-1 bg-white border border-slate-100 rounded-lg p-0.5 text-xs">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateQuantity(item.id, item.quantity - 1);
                                } else {
                                  onRemoveItem(item.id);
                                }
                              }}
                              className="p-1 rounded hover:bg-slate-50 text-slate-500"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-mono font-medium text-slate-800 text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded hover:bg-slate-50 text-slate-500"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Remove item"
                            id={`remove-item-btn-${item.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 px-6 py-5 bg-slate-50/50 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Delivery</span>
                    <span className="font-mono">
                      {shipping === 0 ? <span className="text-emerald-600 font-semibold uppercase text-[10px]">Free Shipping</span> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-slate-400">
                      Add <span className="font-medium text-slate-600">${(50 - subtotal).toFixed(2)}</span> more to unlock <span className="font-semibold text-emerald-600">Free Shipping</span>!
                    </p>
                  )}
                  <div className="h-px bg-slate-100 my-2" />
                  <div className="flex justify-between text-slate-850 font-display font-extrabold text-sm pt-1">
                    <span>Total Cost</span>
                    <span className="font-mono text-sky-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-slate-900 border border-transparent text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-sky-500 tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-sky-100 transition-all duration-300"
                    id="checkout-btn"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Delivery
                  </button>
                  <p className="flex items-center justify-center gap-1 text-[9px] text-slate-400 text-center mt-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                    100% Encrypted 256-Bit SSL Checkout Portal
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
