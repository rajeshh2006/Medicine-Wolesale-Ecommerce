import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart) || [];
  const user = useSelector((state) => state?.user);

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      // User might be guest or offline
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty
        }
      });
      const { data: responseData } = response;

      if (responseData.success) {
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId
        }
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message || "Item removed");
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (!Array.isArray(cartItem)) return;

    const qty = cartItem.reduce((prev, curr) => prev + (curr?.quantity || 0), 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((prev, curr) => {
      const price = curr?.productId?.price || 0;
      const discount = curr?.productId?.discount || 0;
      const priceAfterDiscount = pricewithDiscount(price, discount);
      return prev + (priceAfterDiscount * (curr?.quantity || 1));
    }, 0);
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem.reduce((prev, curr) => {
      const price = curr?.productId?.price || 0;
      return prev + (price * (curr?.quantity || 1));
    }, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      // Ignored for unauthenticated users
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      // Ignored for unauthenticated users
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchCartItem();
      fetchAddress();
      fetchOrder();
    } else {
      // If user logs out, safely clear memory state (without wiping localStorage prematurely)
      dispatch(handleAddItemCart([]));
      dispatch(handleAddAddress([]));
      dispatch(setOrder([]));
    }
  }, [user?._id]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        fetchOrder
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
