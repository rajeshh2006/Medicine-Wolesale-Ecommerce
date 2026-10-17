import React from 'react';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';
import { baseURL } from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import axios from 'axios';
import { formatDate } from '../utils/formatDate';

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/order/cancel`,
        { orderId },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || 'Order Cancelled');
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  const groupOrdersByDate = (ordersList) => {
    return ordersList.reduce((acc, order) => {
      const date = formatDate(order.createdAt, 'DD/MM/YY');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupOrdersByDate(orders || []);

  return (
    <div className="p-4 sm:p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Wholesale Orders</h2>
          <p className="text-sm text-slate-500">Track your bulk medicine procurement and dispatches</p>
        </div>
      </div>

      {!orders || orders.length === 0 ? (
        <NoData />
      ) : (
        Object.entries(groupedOrders).map(([date, ordersForDate]) => (
          <div key={date} className="mb-8">
            <h3 className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
              Ordered on {date}
            </h3>

            <div className="grid gap-4">
              {ordersForDate.map((order) => (
                <div
                  key={order._id}
                  className="p-5 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900">Order ID:</span>
                      <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{order.orderId}</span>
                      <span className="text-xs text-slate-400">• {formatDate(order.createdAt, 'hh:mm A')}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <p className="text-slate-700">
                        Total Amount: <span className="font-bold text-emerald-700">₹{order.totalAmt?.toLocaleString()}</span>
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {order.payment_status}
                      </span>
                    </div>

                    {order.product_details?.name && (
                      <p className="text-xs text-slate-500">
                        {order.product_details.name} (Qty: {order.quantity || 1})
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      order.order_status === 'Delivered' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : order.order_status === 'Cancelled'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.order_status || 'Processing'}
                    </span>

                    {order.order_status !== 'Delivered' && order.order_status !== 'Cancelled' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-xs text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 px-3 py-1 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
