import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import GlobalProvider from './provider/GlobalProvider';
import CartMobileLink from './components/CartMobile';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    } catch (error) {
      console.error("Failed to fetch category:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    } catch (error) {
      console.error("Failed to fetch subcategory:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <GlobalProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
        <Header />
        <main className='flex-1 min-h-[75vh]'>
          <Outlet />
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f172a',
              color: '#fff',
              fontSize: '14px',
              borderRadius: '10px',
              padding: '12px 18px',
            },
            success: {
              style: {
                background: '#047857',
              },
            },
            error: {
              style: {
                background: '#be123c',
              },
            },
          }}
        />
        {location.pathname !== '/checkout' && <CartMobileLink />}
      </div>
    </GlobalProvider>
  );
}

export default App;
