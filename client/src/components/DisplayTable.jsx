import React from 'react';

const DisplayTable = ({ data = [], column = [] }) => {
  return (
    <div className="p-2 w-full overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <thead className="bg-slate-800 text-white text-xs uppercase tracking-wider font-semibold">
          <tr>
            <th className="py-3 px-4 border-b border-slate-700 w-16">Sr.No</th>
            {column.map((col, idx) => (
              <th key={col.header || idx} className="py-3 px-4 border-b border-slate-700 whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={column.length + 1} className="py-8 text-center text-slate-400">
                No records found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item._id || index} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-mono text-xs text-slate-500">{index + 1}</td>
                {column.map((col, idx) => (
                  <td key={idx} className="py-3 px-4 whitespace-nowrap">
                    {col.cell ? col.cell({ row: { original: item } }) : item[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
