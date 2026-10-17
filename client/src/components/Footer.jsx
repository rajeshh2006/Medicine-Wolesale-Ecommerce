import React from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, Headphones } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      {/* Value Proposition Badges */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-850/60 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine Medicines</h4>
              <p className="text-xs text-slate-400">Sourced directly from verified pharma manufacturers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Cold-Chain Delivery</h4>
              <p className="text-xs text-slate-400">Temperature-controlled temperature shipping for vaccines</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Dispatch</h4>
              <p className="text-xs text-slate-400">Same-day dispatch for bulk retail orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dedicated Support</h4>
              <p className="text-xs text-slate-400">Assistance for order tracking & credit billing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Company & Info */}
        <div className="space-y-3">
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
            Med<span className="text-emerald-400">Wholesale</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">B2B</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            India's premier digital B2B pharmaceutical marketplace connecting licensed pharmacies, hospitals, and distributors with transparent wholesale pricing.
          </p>
          <div className="pt-2 flex items-center gap-3 text-slate-400">
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"><FaFacebookF size={14} /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"><FaTwitter size={14} /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"><FaWhatsapp size={14} /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"><FaLinkedinIn size={14} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/" className="hover:text-emerald-400 transition-colors">Wholesale Catalog</Link></li>
            <li><Link to="/search" className="hover:text-emerald-400 transition-colors">Search Medicines</Link></li>
            <li><Link to="/dashboard/myorders" className="hover:text-emerald-400 transition-colors">Track Orders</Link></li>
            <li><Link to="/support" className="hover:text-emerald-400 transition-colors">Help & Pharmacist Support</Link></li>
            <li><Link to="/register" className="hover:text-emerald-400 transition-colors">Retailer Registration</Link></li>
          </ul>
        </div>

        {/* Regulatory & Compliance */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">B2B Compliance</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Sale of Schedule H & X drugs is strictly governed under the Drugs and Cosmetics Act. Valid Form 20B/21B wholesale license verification mandatory.
          </p>
          <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg">
            CDSCO & FDA Compliant Platform
          </span>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Distribution Hub</h4>
          <p className="text-xs text-slate-400 leading-5">
            Kanpur Road, Alambagh<br />
            Lucknow, Uttar Pradesh 226005, India
          </p>
          <p className="mt-2 text-xs text-slate-300 font-semibold">Toll Free: 1800-120-MEDS</p>
          <p className="text-xs text-emerald-400">support@medwholesale.in</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
        <p>© {new Date().getFullYear()} MedWholesale Systems. All Rights Reserved.</p>
        <p className="text-slate-400">Crafted for Pharmaceutical Retailers & Distributors</p>
      </div>
    </footer>
  );
};

export default Footer;
