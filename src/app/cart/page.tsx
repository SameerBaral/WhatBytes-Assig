'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  // Price calculations
  const shippingFee = cartTotal > 200 || cartTotal === 0 ? 0 : 15;
  const estimatedTax = parseFloat((cartTotal * 0.08).toFixed(2));
  const orderTotal = parseFloat((cartTotal + shippingFee + estimatedTax).toFixed(2));

  const handleCheckout = () => {
    alert('Thank you for your purchase! (This is a demo checkout)');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-slate-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Before you proceed to checkout, you must add some products to your shopping cart.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b549d] hover:bg-[#09437d] text-white font-bold rounded-lg transition-colors shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-extrabold text-[#0b549d] tracking-tight">Shopping Cart</h1>
        <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
          {cartItems.length} type{cartItems.length > 1 ? 's' : ''} of items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col sm:flex-row items-center gap-5 transition-all hover:shadow-md"
            >
              {/* Product Image */}
              <Link
                href={`/product/${item.product.id}`}
                className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  fill
                  className="object-contain p-2"
                />
              </Link>

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left">
                <Link
                  href={`/product/${item.product.id}`}
                  className="font-bold text-gray-900 hover:text-[#0b549d] transition-colors line-clamp-1"
                >
                  {item.product.title}
                </Link>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mt-0.5">
                  {item.product.category}
                </span>
                <span className="text-base font-extrabold text-[#0b549d] block mt-2">
                  ${item.product.price} each
                </span>
              </div>

              {/* Actions Area */}
              <div className="flex items-center gap-6 justify-between w-full sm:w-auto">
                {/* Quantity Control */}
                <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-slate-50 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-md hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center font-bold text-gray-800 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-md hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <span className="text-lg font-extrabold text-gray-900 min-w-[70px] text-right hidden sm:block">
                  ${item.product.price * item.quantity}
                </span>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="w-10 h-10 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors border border-transparent hover:border-red-100"
                  title="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Back to Shopping Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#0b549d] transition-colors py-2 px-1 self-start mt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Right Side: Price Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

          <div className="flex flex-col gap-4 text-sm font-semibold text-gray-600">
            {/* Subtotal */}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-950 font-bold">${cartTotal}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-gray-950 font-bold">
                {shippingFee === 0 ? (
                  <span className="text-green-600 font-bold uppercase text-xs bg-green-50 px-2 py-0.5 rounded border border-green-150">
                    Free
                  </span>
                ) : (
                  `$${shippingFee}`
                )}
              </span>
            </div>

            {/* Estimated Tax */}
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="text-gray-950 font-bold">${estimatedTax}</span>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-100 my-2"></div>

            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="text-base text-gray-900 font-bold">Order Total</span>
              <span className="text-2xl font-extrabold text-[#0b549d]">${orderTotal}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full mt-8 py-3 px-6 bg-[#0b549d] hover:bg-[#09437d] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-3 transition-colors shadow-md"
          >
            <CreditCard className="w-5 h-5" /> Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
