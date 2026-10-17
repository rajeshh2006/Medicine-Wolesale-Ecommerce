import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const medicineSamples = [
  'Paracetamol 650mg',
  'Amoxicillin 500mg',
  'Cetirizine 10mg',
  'Azithromycin 500mg',
  'ORS Electro Powder',
  'Pantoprazole 40mg',
  'Betadine 100ml',
  'Metformin 500mg'
];

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const searchText = new URLSearchParams(location.search).get('q') || '';
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  useEffect(() => {
    if (isSearchPage) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % medicineSamples.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isSearchPage]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className='w-full min-w-[280px] lg:min-w-[440px] h-11 lg:h-12 rounded-xl border border-slate-200 overflow-hidden flex items-center text-slate-500 bg-white shadow-sm group focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all'>
      <div>
        {isMobile && isSearchPage ? (
          <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 text-slate-700 bg-slate-100 rounded-full'>
            <FaArrowLeft size={16} />
          </Link>
        ) : (
          <button className='flex justify-center items-center h-full p-3 text-slate-400 group-focus-within:text-emerald-600 transition-colors'>
            <IoSearch size={20} />
          </button>
        )}
      </div>
      <div className='w-full h-full'>
        {!isSearchPage ? (
          <div onClick={redirectToSearchPage} className='w-full h-full flex items-center cursor-pointer text-sm text-slate-400 select-none'>
            <span>Search wholesale medicines like&nbsp;</span>
            <span className="font-medium text-emerald-700 transition-all">"{medicineSamples[placeholderIndex]}"</span>
          </div>
        ) : (
          <div className='w-full h-full'>
            <input
              type='text'
              placeholder='Search by medicine name, salt, or manufacturer...'
              autoFocus
              defaultValue={searchText}
              className='bg-transparent w-full h-full outline-none text-sm text-slate-800 placeholder-slate-400 pr-3'
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
