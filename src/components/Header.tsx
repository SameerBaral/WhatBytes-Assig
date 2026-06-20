'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Search } from 'lucide-react';

const HeaderContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Keep search input in sync with URL search parameter (e.g. if cleared or changed elsewhere)
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }

    // Always navigate to home page on search submit
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="bg-[#0b549d] text-white py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
      {/* Left: Logo */}
      <Link href="/" className="text-3xl font-extrabold tracking-tight hover:opacity-90 transition-opacity">
        Logo
      </Link>

      {/* Center: Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="w-full max-w-xl relative flex items-center bg-[#1d6cb5] border border-white/10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-white/50 focus-within:border-transparent transition-all"
      >
        <span className="pl-3 text-white/70">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full py-2.5 px-3 bg-transparent text-white placeholder-white/70 focus:outline-none text-sm font-semibold"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              const params = new URLSearchParams(searchParams.toString());
              params.delete('search');
              router.push(`/?${params.toString()}`);
            }}
            className="pr-3 text-white/50 hover:text-white text-xs font-bold"
          >
            Clear
          </button>
        )}
      </form>

      {/* Right: Cart */}
      <div className="flex items-center shrink-0">
        <Link
          href="/cart"
          className="bg-[#083b70] hover:bg-[#062c54] px-5 py-2.5 rounded-lg flex items-center gap-3 transition-colors duration-200 shadow-inner group"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-white group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-sm font-bold tracking-wide">Cart</span>
        </Link>
      </div>
    </header>
  );
};

export const Header = () => {
  return (
    <Suspense fallback={
      <header className="bg-[#0b549d] text-white py-4 px-6 md:px-12 flex items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="text-3xl font-extrabold">Logo</div>
        <div className="w-full max-w-xl h-10 bg-[#1d6cb5] rounded-lg animate-pulse"></div>
        <div className="w-24 h-10 bg-[#083b70] rounded-lg animate-pulse"></div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
};

export default Header;
