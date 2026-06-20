'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface SidebarProps {
  category: string;
  maxPrice: number;
  setCategory: (cat: string) => void;
  setMaxPrice: (price: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  category,
  maxPrice,
  setCategory,
  setMaxPrice,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [priceInput, setPriceInput] = useState<string>(maxPrice.toString());

  // Keep input in sync with external price state changes
  useEffect(() => {
    setPriceInput(maxPrice.toString());
  }, [maxPrice]);

  // Update URL search parameters
  const updateUrl = (newCategory: string, newPrice: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory && newCategory !== 'All') {
      params.set('category', newCategory.toLowerCase());
    } else {
      params.delete('category');
    }

    if (newPrice !== 1000 && newPrice !== 5000) {
      params.set('price', newPrice.toString());
    } else {
      // If it matches default or max, we can clear it or leave it
      params.set('price', newPrice.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    updateUrl(cat, maxPrice);
  };

  const handlePriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(e.target.value, 10);
    setMaxPrice(price);
    updateUrl(category, price);
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceInput(value);
    const price = parseInt(value, 10);
    if (!isNaN(price) && price >= 0) {
      setMaxPrice(price);
      updateUrl(category, price);
    }
  };

  const categories = ['All', 'Electronics', 'Clothing', 'Home'];

  return (
    <div className="flex flex-col gap-6 w-full md:w-64 shrink-0">
      {/* Blue Filter Card */}
      <div className="bg-[#0b549d] text-white p-6 rounded-[20px] shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-wide mb-4">Filters</h2>
          <div className="h-[1px] bg-white/20 w-full"></div>
        </div>

        {/* Category section */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-white/90">Category</h3>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => {
              const isChecked = category === cat;
              return (
                <label
                  key={`blue-${cat}`}
                  className="flex items-center gap-3 cursor-pointer select-none group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="blue-category"
                      checked={isChecked}
                      onChange={() => handleCategoryChange(cat)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                        isChecked
                          ? 'border-white bg-transparent'
                          : 'border-white/50 group-hover:border-white'
                      }`}
                    ></div>
                    {isChecked && (
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{cat}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-white/90">Price</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice > 1000 ? 1000 : maxPrice}
            onChange={handlePriceSliderChange}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <div className="flex justify-between text-xs font-semibold text-white/80 mt-1">
            <span>0</span>
            <span>1000</span>
          </div>
        </div>
      </div>

      {/* White Filter Card (Cacyroy) */}
      <div className="bg-white text-gray-800 p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col gap-6">
        {/* Category section (Cacyroy) */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-900">Cacyroy</h3>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => {
              const isChecked = category === cat;
              return (
                <label
                  key={`white-${cat}`}
                  className="flex items-center gap-3 cursor-pointer select-none group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="white-category"
                      checked={isChecked}
                      onChange={() => handleCategoryChange(cat)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                        isChecked
                          ? 'border-[#0b549d] bg-transparent'
                          : 'border-gray-300 group-hover:border-gray-400'
                      }`}
                    ></div>
                    {isChecked && (
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0b549d]"></div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price input section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold text-gray-800">Price</h3>
          <div className="relative">
            <input
              type="number"
              value={priceInput}
              onChange={handlePriceInputChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0b549d] focus:border-transparent transition-all"
              placeholder="5000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
