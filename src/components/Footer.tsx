import React from "react";
import Link from "next/link";
import { LayoutDashboard, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-250 bg-slate-50 text-slate-550 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-sm shadow-cyan-500/10">
                <LayoutDashboard className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-slate-900 text-base font-bold tracking-tight">
                Redmine Portal
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              Hệ thống quản lý công việc và cộng tác tối ưu cho doanh nghiệp. 
              Mang lại hiệu năng cao và giao diện người dùng trực quan, sang trọng.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors" title="Website">
                <Globe className="h-5 w-5" />
              </a>
              <a href="mailto:support@genome.vn" className="text-slate-400 hover:text-cyan-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Đường dẫn nhanh
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-600 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-4.5 w-4.5 text-cyan-500 shrink-0" />
                <span>Tòa nhà Innovation, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4.5 w-4.5 text-cyan-500 shrink-0" />
                <span>+84 (0) 123 456 789</span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4.5 w-4.5 text-cyan-500 shrink-0" />
                <span>info@redmineportal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center md:flex md:justify-between md:items-center text-xs">
          <p className="mb-4 md:mb-0 text-slate-400">&copy; {new Date().getFullYear()} Redmine Portal. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <span className="text-[10px] bg-slate-200/50 text-cyan-600 px-2 py-0.5 rounded font-mono font-bold uppercase">Next.js 15 App</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
