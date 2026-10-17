import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      });
      if (response.data.success) {
        if (close) close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message || "Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) close();
  };

  return (
    <div className="p-1">
      <div className='font-bold text-slate-800 text-sm'>My Account</div>
      <div className='text-xs flex items-center justify-between gap-2 mt-1 text-slate-500'>
        <span className='max-w-[180px] truncate font-medium text-slate-700'>
          {user.name || user.mobile}
        </span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
          user.role === 'ADMIN' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {user.role === "ADMIN" ? "Admin" : "Buyer"}
        </span>
      </div>

      <Divider />

      <div className='text-xs grid gap-1'>
        <Link 
          onClick={handleClose} 
          to={"/dashboard/profile"} 
          className='flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'
        >
          <span>My Profile & License</span>
          <HiOutlineExternalLink size={14} className="text-slate-400" />
        </Link>

        {isAdmin(user.role) ? (
          <>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 pt-2">Admin Control</div>
            <Link onClick={handleClose} to={"/dashboard/category"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Categories</Link>
            <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Sub Categories</Link>
            <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Upload Medicine</Link>
            <Link onClick={handleClose} to={"/dashboard/product"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Medicine Catalog</Link>
            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>All Wholesale Orders</Link>
            <Link onClick={handleClose} to={"/dashboard/admin-stock-manager"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Inventory & Stock</Link>
            <Link onClick={handleClose} to={"/dashboard/admin-user-verification"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>License Verifications</Link>
            <Link onClick={handleClose} to={"/dashboard/verified-users"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Verified Retailers</Link>
            <Link onClick={handleClose} to={"/dashboard/banner-upload"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Banner Management</Link>
          </>
        ) : (
          <>
            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>My Orders</Link>
            <Link onClick={handleClose} to={"/dashboard/address"} className='px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors'>Delivery Addresses</Link>
          </>
        )}

        <div className="pt-1 border-t border-slate-100 mt-1">
          <button 
            onClick={handleLogout} 
            className='w-full text-left px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-colors'
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
