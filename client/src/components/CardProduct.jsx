import React from 'react';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton';

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const finalPrice = pricewithDiscount(data.price, data.discount);

  return (
    <Link 
      to={url} 
      className='group relative bg-white border border-slate-200/90 rounded-2xl p-3 lg:p-4 flex flex-col justify-between min-w-[150px] lg:min-w-[210px] shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-200 cursor-pointer overflow-hidden'
    >
      {/* Top Badges */}
      <div className='flex items-center justify-between gap-1 mb-2'>
        {Boolean(data.discount) ? (
          <span className='text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full'>
            {data.discount}% OFF
          </span>
        ) : (
          <span className='text-[10px] font-medium text-slate-400 uppercase tracking-wider'>
            Wholesale
          </span>
        )}
        <span className={`text-[10px] font-semibold flex items-center gap-1 ${
          data.stock > 0 ? 'text-emerald-600' : 'text-rose-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${data.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          {data.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Product Image */}
      <div className='w-full h-28 lg:h-36 rounded-xl bg-slate-50 p-2 flex items-center justify-center overflow-hidden mb-3 group-hover:bg-emerald-50/30 transition-colors'>
        <img 
          src={data.image[0]} 
          alt={data.name}
          loading="lazy"
          className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      {/* Product Details */}
      <div className='flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='font-semibold text-slate-800 text-xs lg:text-sm line-clamp-2 mb-1 group-hover:text-emerald-700 transition-colors'>
            {data.name}
          </h3>
          <p className='text-xs text-slate-500 mb-2 font-medium'>
            Pack: <span className="text-slate-700">{data.unit || 'Standard'}</span>
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className='pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto'>
          <div>
            <div className='text-sm lg:text-base font-extrabold text-emerald-700'>
              {DisplayPriceInRupees(finalPrice)}
            </div>
            {Boolean(data.discount) && (
              <div className='text-[11px] text-slate-400 line-through'>
                {DisplayPriceInRupees(data.price)}
              </div>
            )}
          </div>

          <div className='shrink-0' onClick={(e) => e.stopPropagation()}>
            {data.stock === 0 ? (
              <span className='text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-1 rounded-lg border border-rose-100'>
                Unavailable
              </span>
            ) : (
              <AddToCartButton data={data} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
