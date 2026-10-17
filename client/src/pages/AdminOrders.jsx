import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../common/SummaryApi';
import { formatDate } from '../utils/formatDate';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload?.role || '');
      } catch (err) {
        console.error("Failed to parse token", err);
      }
    }
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/order/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/order/admin/order/update-status`,
        { orderId, order_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAllOrders();
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

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="p-4 sm:p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">All Wholesale Orders</h2>
          <p className="text-sm text-slate-500">Manage and track retailer shipments & delivery status</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
          Admin Portal
        </span>
      </div>

      {Object.keys(groupedOrders).length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
          <p className="text-slate-500">No orders found.</p>
        </div>
      ) : (
        Object.entries(groupedOrders).map(([date, ordersForDate]) => (
          <div key={date} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <h3 className="text-base font-semibold text-slate-700">Orders on {date}</h3>
            </div>

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

                    <p className="text-sm text-slate-700">
                      <span className="font-medium text-slate-500">Retailer:</span> {order.userId?.name || 'Customer'} ({order.userId?.mobile || 'No Mobile'})
                    </p>

                    <div className="flex items-center gap-3 text-sm">
                      <p className="text-slate-700">
                        <span className="font-medium text-slate-500">Total:</span> <span className="font-bold text-emerald-700">₹{order.totalAmt?.toLocaleString()}</span>
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        order.payment_status === 'CASH ON DELIVERY' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {order.payment_status}
                      </span>
                    </div>

                    {order.product_details?.name && (
                      <p className="text-xs text-slate-500">
                        Item: {order.product_details.name} (Qty: {order.quantity || 1})
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <span className="text-xs font-medium text-slate-500">Status:</span>
                    <select
                      value={order.order_status || 'Order Placed'}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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

export default AdminOrders;
