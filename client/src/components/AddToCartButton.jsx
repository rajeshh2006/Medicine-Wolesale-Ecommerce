import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState();

  const handleADDTocart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message || "Added to cart");
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Array.isArray(cartItem) || !data?._id) return;
    const checkingitem = cartItem.some((item) => item?.productId?._id === data._id);
    setIsAvailableCart(checkingitem);

    const product = cartItem.find((item) => item?.productId?._id === data._id);
    setQty(product?.quantity || 0);
    setCartItemsDetails(product);
  }, [data, cartItem]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemDetails?._id) return;

    const response = await updateCartItem(cartItemDetails._id, qty + 1);
    if (response?.success) {
      toast.success("Quantity updated");
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemDetails?._id) return;

    if (qty === 1) {
      deleteCartItem(cartItemDetails._id);
    } else {
      const response = await updateCartItem(cartItemDetails._id, qty - 1);
      if (response?.success) {
        toast.success("Item removed");
      }
    }
  };

  return (
    <div className='w-full max-w-[120px]'>
      {isAvailableCart ? (
        <div className='flex items-center bg-emerald-50 border border-emerald-300 rounded-lg overflow-hidden h-8'>
          <button
            onClick={decreaseQty}
            className='bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white w-7 h-full flex items-center justify-center transition-all'
            aria-label="Decrease quantity"
          >
            <FaMinus size={10} />
          </button>

          <span className='flex-1 font-bold text-xs text-emerald-800 text-center select-none'>
            {qty}
          </span>

          <button
            onClick={increaseQty}
            className='bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white w-7 h-full flex items-center justify-center transition-all'
            aria-label="Increase quantity"
          >
            <FaPlus size={10} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          className='bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center min-w-[64px]'
        >
          {loading ? <Loading /> : "+ Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
