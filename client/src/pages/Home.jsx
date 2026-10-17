import React from 'react';
import banner from '../assets/banner.jpg';
import bannerMobile from '../assets/banner-mobile.jpg';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import BannerSlider from '../components/BannerSlider';
import MiddleBannerSlider from '../components/MiddleBannerSlider';
import BrandPromotion from '../components/BrandPromotion';

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData?.find((sub) =>
      sub.category?.some((c) => c._id === id)
    );

    if (subcategory) {
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
      navigate(url);
    } else {
      navigate(`/search?q=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className='bg-slate-50 min-h-screen pb-12'>
      {/* Top Banner Hero */}
      <div className='max-w-7xl mx-auto px-4 pt-4'>
        <div className='w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900'>
          <img
            src={banner}
            className='w-full h-auto hidden lg:block object-cover'
            alt='Medicine Wholesale Banner'
          />
          <img
            src={bannerMobile}
            className='w-full h-auto lg:hidden object-cover'
            alt='Medicine Wholesale Banner Mobile'
          />
        </div>
      </div>

      {/* Dynamic Promotion Sliders */}
      <div className="max-w-7xl mx-auto px-4">
        <BannerSlider />
      </div>

      {/* Medicine Categories Carousel/Grid */}
      <div className='max-w-7xl mx-auto px-4 my-6'>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-extrabold text-slate-800 tracking-tight">
              Therapeutic Categories
            </h2>
            <p className="text-xs lg:text-sm text-slate-500 font-medium">Browse verified pharmaceuticals by category</p>
          </div>
        </div>

        <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3'>
          {loadingCategory ? (
            new Array(10).fill(null).map((_, index) => (
              <div key={index} className='bg-white rounded-2xl p-3 h-28 flex flex-col items-center justify-center gap-2 border border-slate-100 shadow-sm animate-pulse'>
                <div className='w-12 h-12 bg-slate-200 rounded-full'></div>
                <div className='w-14 h-3 bg-slate-200 rounded'></div>
              </div>
            ))
          ) : (
            categoryData?.map((cat) => (
              <div
                key={cat._id}
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                className='group bg-white rounded-2xl p-2.5 flex flex-col items-center text-center cursor-pointer border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all duration-200'
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-slate-50 group-hover:bg-emerald-50/50 p-1 flex items-center justify-center mb-1.5 transition-colors overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-200'
                  />
                </div>
                <span className="text-[11px] lg:text-xs font-semibold text-slate-700 group-hover:text-emerald-700 line-clamp-1 w-full">
                  {cat.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* First 3 Category Product Sections */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {categoryData?.slice(0, 3).map((c) => (
          <CategoryWiseProductDisplay
            key={c?._id}
            id={c?._id}
            name={c?.name}
          />
        ))}

        {/* Middle Promotional Banner */}
        <MiddleBannerSlider />

        {/* Remaining Categories */}
        {categoryData?.slice(3, 9).map((c) => (
          <CategoryWiseProductDisplay
            key={c?._id}
            id={c?._id}
            name={c?.name}
          />
        ))}
      </div>

      {/* Brand Partners Promotion */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <BrandPromotion />
      </div>
    </div>
  );
};

export default Home;
