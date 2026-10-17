import React, { useState } from 'react';
import logo from '../assets/logo.png';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import { HiOutlineExternalLink } from "react-icons/hi";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { logout } from '../store/userSlice';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className='sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'>
      {/* Top Wholesale Trust Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Verified Wholesale Pharma Distributor Network
          </span>
          <span className="text-slate-500">•</span>
          <span>B2B Drug License Verification Required for Purchase</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <Link to="/support" className="hover:text-white transition-colors">Help & Pharmacist Support</Link>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Toll Free: 1800-120-MEDS</span>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 h-16 lg:h-20 flex items-center justify-between gap-4'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Link to={"/"} className='flex items-center gap-2 group'>
            {logo ? (
              <img
                src={logo}
                alt="MedWholesale Logo"
                className='h-9 lg:h-11 w-auto object-contain'
              />
            ) : null}
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                Med<span className="text-emerald-600">Wholesale</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded uppercase">B2B</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 hidden sm:inline">Bulk Medicine & Healthcare</span>
            </div>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className='hidden lg:block flex-1 max-w-xl mx-4'>
          <Search />
        </div>

        {/* Right Section: User & Cart */}
        <div className='flex items-center gap-3 lg:gap-5'>
          {/* Mobile User Icon */}
          <button className='text-slate-700 lg:hidden p-2 hover:bg-slate-100 rounded-lg' onClick={handleMobileUser}>
            <FaRegCircleUser size={22} />
          </button>

          {/* Desktop User Menu */}
          <div className='hidden lg:flex items-center gap-2'>
            {user?._id ? (
              <div className='relative'>
                <div
                  onClick={() => setOpenUserMenu((prev) => !prev)}
                  className='flex items-center gap-2 cursor-pointer select-none py-1.5 px-3 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200'
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-semibold text-slate-800 line-clamp-1 max-w-[100px]">{user.name || "Account"}</p>
                    <p className="text-[10px] text-emerald-600 font-bold">{user.role === 'ADMIN' ? 'Admin Portal' : 'Verified Buyer'}</p>
                  </div>
                  {openUserMenu ? <GoTriangleUp className="text-slate-500" /> : <GoTriangleDown className="text-slate-500" />}
                </div>

                {openUserMenu && (
                  <div className='absolute right-0 top-12 z-50'>
                    <div className='bg-white rounded-2xl p-2 min-w-56 shadow-xl border border-slate-200'>
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={redirectToLoginPage}
                className='text-sm font-bold text-emerald-700 hover:text-emerald-800 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors'
              >
                Sign In / Register
              </button>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setOpenCartSection(true)}
            className='flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl shadow-sm transition-all'
          >
            <div className='relative'>
              <BsCart4 size={20} />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </div>
            <div className='font-semibold text-xs lg:text-sm text-left hidden sm:block'>
              {cartItem && cartItem[0] ? (
                <div>
                  <p className="text-[10px] text-emerald-100 font-medium leading-none">{totalQty} Items</p>
                  <p className="font-bold leading-tight">{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              ) : (
                <p className="font-bold">Wholesale Cart</p>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar below Header */}
      <div className='container mx-auto px-4 pb-3 lg:hidden'>
        <Search />
      </div>

      {/* Cart Drawer */}
      {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
    </header>
  );
};

export default Header;
