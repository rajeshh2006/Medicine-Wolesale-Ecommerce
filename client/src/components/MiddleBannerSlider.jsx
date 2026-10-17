import React, { useEffect, useState } from 'react';
import axios from '../utils/Axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';

const MiddleBannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(baseURL + SummaryApi.getAllBanners.url);
        const middleBanners = res.data?.filter(b => b.type === 'middle') || [];
        setBanners(middleBanners);
      } catch (err) {
        console.error('Error fetching middle banners:', err);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners.length) {
    return (
      <div className="w-full max-w-screen-xl mx-auto bg-slate-100 h-44 md:h-64 rounded-2xl animate-pulse mb-6 border border-slate-200" />
    );
  }

  return (
    <section className="my-8 relative max-w-screen-xl mx-auto px-4">
      <div className="relative w-full rounded-2xl overflow-hidden h-[180px] md:h-[260px] lg:h-[380px] shadow-sm border border-slate-200 bg-slate-900">
        {banners.map((item, i) => (
          <div
            key={item._id || i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.image_url}
              alt={item.title || `Wholesale Promo Banner ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MiddleBannerSlider;
