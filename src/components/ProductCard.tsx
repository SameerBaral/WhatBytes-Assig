'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page if wrapping card in a Link
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  // Render rating stars
  const renderStars = (rating: number) => {
    const stars = [];
    const filledStars = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= filledStars
              ? 'fill-[#0b549d] stroke-[#0b549d]'
              : 'stroke-gray-300'
          }`}
        />
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  if (product.isLarge) {
    // Smartphone Large Card (spans 2 columns)
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden p-6 col-span-1 md:col-span-2 flex flex-col md:flex-row gap-6 transition-all duration-300 hover:shadow-md">
        {/* Left: Image */}
        <Link href={`/product/${product.id}`} className="relative block shrink-0 w-full md:w-1/2 h-64 md:h-auto min-h-[260px] rounded-xl overflow-hidden bg-gray-50 group">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </Link>

        {/* Right: Info */}
        <div className="flex flex-col justify-between flex-1 py-2">
          <div className="flex flex-col gap-3">
            <Link href={`/product/${product.id}`} className="hover:text-[#0b549d] transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h3>
            </Link>
            <span className="text-2xl font-extrabold text-gray-900">
              ${product.price}
            </span>
            <div className="my-1">{renderStars(product.rating)}</div>
            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mt-1">
              {product.description}
            </p>
            <div className="mt-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Category
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {product.category}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`mt-6 w-full md:w-auto px-8 py-3 rounded-lg font-bold text-sm text-white transition-all duration-300 ${
              isAdded
                ? 'bg-green-600 hover:bg-green-700 shadow-sm'
                : 'bg-[#0b549d] hover:bg-[#09437d] hover:shadow-md'
            }`}
          >
            {isAdded ? 'Added ✔' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  }

  // Regular Card
  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md group">
      <div className="flex flex-col gap-4">
        {/* Image */}
        <Link href={`/product/${product.id}`} className="relative block w-full h-48 rounded-xl overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <Link href={`/product/${product.id}`} className="hover:text-[#0b549d] transition-colors">
            <h3 className="text-base font-bold text-gray-900 line-clamp-1 leading-snug">
              {product.title}
            </h3>
          </Link>
          <span className="text-lg font-extrabold text-gray-900">
            ${product.price}
          </span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className={`mt-4 w-full py-2.5 rounded-lg font-bold text-xs text-white transition-all duration-300 ${
          isAdded
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-[#0b549d] hover:bg-[#09437d]'
        }`}
      >
        {isAdded ? 'Added ✔' : 'Add to Cart'}
      </button>
    </div>
  );
};
export default ProductCard;
