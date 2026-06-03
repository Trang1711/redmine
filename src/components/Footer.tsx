import React from "react";
import Link from "next/link";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-250 bg-slate-50 text-slate-550 py-12 md:py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1">
            <div className="flex items-center gap-2">
              <img
                src="/logogenome.png"
                alt="Genome Logo"
                className="h-24 w-auto object-contain"
              />

            </div>
            <p className="text-xs font-semibold text-slate-650 leading-relaxed uppercase">
              CÔNG TY TNHH KHOA HỌC KỸ THUẬT & DỊCH VỤ GENOME
            </p>
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                KẾT NỐI VỚI CHÚNG TÔI
              </h3>
              <div className="flex items-center gap-4">
                <a href="https://www.genome.com.vn" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-600 transition-colors" title="Website">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="mailto:cskh@genome.com.vn" className="text-slate-400 hover:text-cyan-600 transition-colors" title="Email">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="tel:1900068839" className="text-slate-400 hover:text-cyan-600 transition-colors" title="Tổng đài">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-4 col-span-1">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              MENU
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-600 transition-colors font-medium">
                  GIỚI THIỆU
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-colors font-medium">
                  DỊCH VỤ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-colors font-medium">
                  HƯỚNG DẪN
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-colors font-medium">
                  KIẾN THỨC Y KHOA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-colors font-medium">
                  CHÍNH SÁCH BẢO MẬT
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              THÔNG TIN LIÊN HỆ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Hà Nội - Địa chỉ:</span> Tầng 2, tòa V1 - Victoria Văn Phú, Phường Kiến Hưng, Hà Nội
                </div>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">TPHCM - Địa chỉ:</span> Tầng 1, Số 41-43, đường Hoàng Trọng Mậu, Phường Tân Hưng, Thành phố Hồ Chí Minh
                </div>
              </li>
              <li className="flex gap-2">
                <Phone className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Tổng đài:</span> <a href="tel:1900068839" className="hover:text-cyan-600 transition-colors font-medium">1900 06 88 39</a>
                </div>
              </li>
              <li className="flex gap-2">
                <Mail className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Email:</span> <a href="mailto:cskh@genome.com.vn" className="hover:text-cyan-600 transition-colors font-medium">cskh@genome.com.vn</a>
                </div>
              </li>
              <li className="flex gap-2">
                <Globe className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Website:</span> <a href="https://www.genome.com.vn" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 transition-colors font-medium">www.genome.com.vn</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center md:flex md:justify-between md:items-center text-xs">
          <p className="mb-4 md:mb-0 text-slate-400">&copy; {new Date().getFullYear()} GENOME. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <span className="text-[10px] bg-slate-200/50 text-cyan-600 px-2 py-0.5 rounded font-mono font-bold uppercase">Next.js 15 App</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
