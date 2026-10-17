import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import Loading from '../components/Loading';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import verifiedbadge from '../assets/verifiedbadge.png';

const VerifiedUsers = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchVerifiedUsers = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.getVerifiedUsers,
      });

      if (res.data.success) {
        setVerifiedUsers(res.data.data);
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const res = await Axios({
        ...SummaryApi.updateUserStatus,
        data: { userId, status: newStatus },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        fetchVerifiedUsers();
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  return (
    <section className="p-4 sm:p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Verified Wholesale Retailers</h2>
            <p className="text-sm text-slate-500">Retailers approved with verified pharmaceutical drug licenses</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
            {verifiedUsers.length} Approved Accounts
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loading />
          </div>
        ) : verifiedUsers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-500">No verified retailers found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                        {user.name}
                        {verifiedbadge && (
                          <img src={verifiedbadge} alt="Verified" className="w-4 h-4 object-contain inline" />
                        )}
                      </h3>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <p className="text-xs text-slate-500">Phone: {user.mobile || 'N/A'}</p>
                    </div>

                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      user.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : user.status === 'Inactive'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl mb-4 text-xs space-y-1">
                    <p><span className="text-slate-500">Role:</span> <span className="font-semibold">{user.role}</span></p>
                    <p><span className="text-slate-500">Wholesale License:</span> <span className="font-mono">{user.drug_license_number || 'Uploaded'}</span></p>
                  </div>

                  {user.drug_license_image && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-600 mb-1.5">Submitted Drug License:</p>
                      <img
                        src={user.drug_license_image}
                        alt="Drug License"
                        onClick={() => setSelectedImage(user.drug_license_image)}
                        className="w-full h-32 object-cover rounded-xl border border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 font-medium">Update Status:</span>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user._id, e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IMAGE PREVIEW LIGHTBOX MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] bg-white rounded-2xl p-2 shadow-2xl overflow-hidden flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow"
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Verified License Preview"
                className="max-h-[82vh] max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifiedUsers;
