import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#052648] text-white py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Column 1: Filters */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold tracking-wide">Filters</h4>
          <div className="flex flex-col gap-2.5 text-sm font-semibold text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              All
            </Link>
            <Link href="/?category=electronics" className="hover:text-white transition-colors">
              elæcronk
            </Link>
          </div>
        </div>

        {/* Column 2: About Us */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold tracking-wide">About Us</h4>
          <div className="flex flex-col gap-2.5 text-sm font-semibold text-white/70">
            <Link href="#" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Column 3: Follow Us */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold tracking-wide">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Facebook className="w-5 h-5 fill-white stroke-none" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Twitter className="w-5 h-5 fill-white stroke-none" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-white/50">
        <span>© 2024 American</span>
      </div>
    </footer>
  );
};

export default Footer;
