import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { MERCH_ITEMS } from '../data/songsData';
import confetti from 'canvas-confetti';

export default function MerchStore({
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  isCartOpen,
  setIsCartOpen
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleAddToCart = (item) => {
    const size = selectedSize[item.id] || item.sizes[0];
    addToCart(item, size);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ec4899', '#8b5cf6']
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = discountApplied ? subtotal * 0.15 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LOVEYOU' || promoCode.trim().toUpperCase() === 'NIGHTLY10') {
      setDiscountApplied(true);
    } else {
      alert('Try promo code "LOVEYOU" for 15% off!');
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b']
    });
  };

  return (
    <section id="merch" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-pink-300">
              Official Merch & Vinyl Store
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            wear your heart out store<span className="text-pink-500">.</span>
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
            Heavyweight French terry hoodies, exclusive splatter vinyl pressings, clear shell cassette tapes, and dad hats.
          </p>
        </div>

        {/* View Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-pink-400" />
          <span>Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
        </button>
      </div>

      {/* Merch Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MERCH_ITEMS.map((item) => {
          const activeSize = selectedSize[item.id] || item.sizes[0];

          return (
            <div
              key={item.id}
              className="group rounded-3xl glass-panel border border-white/10 hover:border-pink-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-black/40 border border-white/10">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-pink-500 text-white shadow-lg">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono font-extrabold bg-black/80 text-white backdrop-blur-md border border-white/20">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Tag & Rating */}
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span className="font-mono text-pink-400 font-semibold uppercase">{item.tag}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-syne text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-pink-300 transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Sizes Selector */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">Select Option:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(prev => ({ ...prev, [item.id]: s }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          activeSize === s
                            ? 'bg-pink-500 text-white font-bold shadow-[0_0_10px_rgba(236,72,153,0.4)]'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart • ${item.price.toFixed(2)}
              </button>
            </div>
          );
        })}
      </div>

      {/* Slide-out Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md h-full bg-[#0d0d17] border-l border-white/15 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            
            {/* Cart Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-pink-400" />
                  <h3 className="font-syne text-xl font-bold text-white">Your Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Banner */}
              <div className="mt-4 p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center gap-2 text-xs font-mono text-pink-300">
                <Truck className="w-4 h-4 text-pink-400" />
                <span>Free shipping on all US orders over $50</span>
              </div>

              {/* Items List */}
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <ShoppingBag className="w-10 h-10 opacity-30 mx-auto mb-2 text-pink-400" />
                    <p className="font-mono text-sm">Your cart is currently empty.</p>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div
                      key={`${cartItem.id}-${cartItem.size}`}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <img 
                        src={cartItem.image} 
                        alt={cartItem.name} 
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-syne text-sm font-bold text-white truncate">
                          {cartItem.name}
                        </h4>
                        <p className="text-xs font-mono text-slate-400">
                          {cartItem.size} • ${(cartItem.price * cartItem.quantity).toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.size, cartItem.quantity - 1)}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono text-white font-bold">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.size, cartItem.quantity + 1)}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.id, cartItem.size)}
                        className="p-2 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                
                {/* Promo code form */}
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input 
                    type="text"
                    placeholder='Promo (try "LOVEYOU")'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-pink-300 font-bold"
                  >
                    Apply
                  </button>
                </form>

                {discountApplied && (
                  <div className="flex justify-between text-xs font-mono text-emerald-400">
                    <span>Promo Discount (15%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-white font-syne">
                  <span>Total</span>
                  <span className="text-pink-400">${total.toFixed(2)}</span>
                </div>

                {!checkoutComplete ? (
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Simulated Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center text-emerald-300 space-y-1">
                    <Check className="w-6 h-6 mx-auto text-emerald-400" />
                    <p className="font-syne font-bold text-sm">Order Confirmed!</p>
                    <p className="text-[11px] font-mono">Thank you for supporting Nightly. night, love you.</p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                  <span>Secure 256-bit SSL Simulated Checkout</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
