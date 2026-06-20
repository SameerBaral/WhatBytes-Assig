'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 'r1',
    name: 'John Doe',
    rating: 5,
    comment: 'Absolutely love this product! The quality is outstanding and it exceeded all my expectations.',
    date: 'June 15, 2026',
  },
  {
    id: 'r2',
    name: 'Sarah Smith',
    rating: 4,
    comment: 'Great value for the price. Works exactly as described, highly recommend.',
    date: 'May 28, 2026',
  },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b549d] hover:bg-[#09437d] text-white font-bold rounded-lg transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Images list for carousel effect
  const productImages = [
    product.image,
    // Add additional color variations or angles using the same image/placeholder to simulate a carousel
    product.image,
    product.image,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#0b549d] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      {/* Main product section */}
      <div className="bg-white rounded-[25px] border border-gray-100 shadow-sm overflow-hidden p-6 md:p-10 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Image Section (Carousel) */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
              <Image
                src={productImages[activeImageIndex]}
                alt={product.title}
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            
            {/* Carousel Thumbnails */}
            <div className="flex gap-3 justify-center mt-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border-2 transition-all ${
                    idx === activeImageIndex
                      ? 'border-[#0b549d] scale-105'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Details Section */}
          <div className="flex flex-col justify-between py-2">
            <div>
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#0b549d] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                {product.title}
              </h1>

              {/* Price */}
              <span className="text-3xl font-extrabold text-gray-900 block mb-4">
                ${product.price}
              </span>

              {/* Ratings */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(product.rating)
                          ? 'fill-[#0b549d] stroke-[#0b549d]'
                          : 'stroke-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-500">
                  {product.rating} ({mockReviews.length} reviews)
                </span>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gray-100 my-6"></div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div>
              {/* Action area: Qty and Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between border border-gray-200 rounded-lg p-1.5 shrink-0 bg-slate-50">
                  <button
                    onClick={decrementQty}
                    className="w-10 h-10 rounded-md hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-800 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    className="w-10 h-10 rounded-md hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-8 rounded-lg font-bold text-sm text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-md ${
                    isAdded
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-[#0b549d] hover:bg-[#09437d]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-[25px] border border-gray-100 shadow-sm p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">Customer Reviews</h2>
        <div className="flex flex-col gap-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 last:border-none pb-6 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{review.name}</h4>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= review.rating
                            ? 'fill-[#0b549d] stroke-[#0b549d]'
                            : 'stroke-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-semibold">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
