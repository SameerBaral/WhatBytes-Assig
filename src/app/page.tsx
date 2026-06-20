'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products, Product } from '@/data/products';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';

const HomeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State initialized from URL search params
  const [category, setCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync state with URL search parameters
  useEffect(() => {
    // Sync category
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      // Find matching category case-insensitive
      const match = ['electronics', 'clothing', 'home'].find(
        (c) => c === urlCategory.toLowerCase()
      );
      if (match) {
        setCategory(match.charAt(0).toUpperCase() + match.slice(1));
      } else {
        setCategory('All');
      }
    } else {
      setCategory('All');
    }

    // Sync price
    const urlPrice = searchParams.get('price');
    if (urlPrice) {
      const price = parseInt(urlPrice, 10);
      if (!isNaN(price) && price >= 0) {
        setMaxPrice(price);
      }
    } else {
      setMaxPrice(5000); // Default value from mockup white input
    }

    // Sync search
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch =
      category === 'All' ||
      product.category.toLowerCase() === category.toLowerCase();

    // Price match
    const priceMatch = product.price <= maxPrice;

    // Search query match
    const searchMatch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && priceMatch && searchMatch;
  });

  const handleResetFilters = () => {
    setCategory('All');
    setMaxPrice(5000);
    setSearchQuery('');
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <Sidebar
          category={category}
          maxPrice={maxPrice}
          setCategory={setCategory}
          setMaxPrice={setMaxPrice}
        />

        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#0b549d] tracking-tight">
              Product Listing
            </h1>
          </div>

          {/* Conditional Rendering for empty product list */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-[20px] border border-gray-100 p-12 text-center shadow-sm max-w-xl mx-auto mt-8 flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  We couldn&apos;t find any products matching your current filters. Try adjusting your category, price range, or search keywords.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#0b549d] hover:bg-[#09437d] text-white font-bold text-sm rounded-lg transition-colors shadow-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            /* Responsive Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        <div className="w-64 h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="flex-1">
          <div className="w-48 h-8 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
