import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { CalendarDays, CreditCard, HandCoins, IndianRupee } from 'lucide-react';
import { formatDate, isWithinDateRange } from '../utils/formatDate';

const EarningsReport = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const filterByDate = (dateStr) => {
    return isWithinDateRange(dateStr, startDate, endDate);
  };

  const filteredOrders = orders.filter((order) => filterByDate(order.createdAt));

  const totalEarnings = filteredOrders.reduce((sum, order) => sum + (order.totalAmt || 0), 0);
  const codEarnings = filteredOrders
    .filter((order) => order.payment_status === 'CASH ON DELIVERY')
    .reduce((sum, order) => sum + (order.totalAmt || 0), 0);
  const onlineEarnings = filteredOrders
    .filter((order) => order.payment_status !== 'CASH ON DELIVERY')
    .reduce((sum, order) => sum + (order.totalAmt || 0), 0);

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

  const groupedOrders = groupOrdersByDate(filteredOrders);

  return (
    <div className="p-4 sm:p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Financial & Earnings Analytics</h2>

      {/* Date Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">From Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">To Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <button
          onClick={() => { setStartDate(''); setEndDate(''); }}
          className="self-end text-xs text-slate-500 hover:text-slate-800 underline pb-2"
        >
          Reset Dates
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">₹{totalEarnings.toLocaleString()}</h3>
            <p className="text-xs text-slate-400 mt-1">{filteredOrders.length} wholesale orders</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <IndianRupee className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Online / Prepaid</p>
            <h3 className="text-2xl font-extrabold text-blue-700 mt-1">₹{onlineEarnings.toLocaleString()}</h3>
            <p className="text-xs text-slate-400 mt-1">Stripe verified payments</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <CreditCard className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cash on Delivery</p>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">₹{codEarnings.toLocaleString()}</h3>
            <p className="text-xs text-slate-400 mt-1">To be collected upon delivery</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <HandCoins className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Grouped Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="text-base font-bold text-slate-800 mb-4">Date-wise Breakdown</h3>
        {Object.keys(groupedOrders).length === 0 ? (
          <p className="text-slate-400 text-sm py-4 text-center">No orders in this period.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {Object.entries(groupedOrders).map(([date, dayOrders]) => {
              const dayTotal = dayOrders.reduce((sum, o) => sum + (o.totalAmt || 0), 0);
              return (
                <div key={date} className="py-3 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{date}</span>
                    <span className="text-xs text-slate-400">({dayOrders.length} orders)</span>
                  </div>
                  <span className="font-bold text-emerald-700">₹{dayTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsReport;
