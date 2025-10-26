import React from 'react';

export default function Sidebar({ portfolio }) {
  const total = portfolio?.total_cost ?? 0;
  const mv = portfolio?.market_value ?? 0;
  const pnl = portfolio?.unrealized_pnl ?? 0;
  const roi = portfolio?.roi ?? 0;
  const xirr = portfolio?.xirr ?? 0;

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <div>
        <h3 className="font-semibold mb-3">Portfolio Summary</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>Total Cost: ₹{total.toLocaleString()}</p>
          <p>Market Value: ₹{mv.toLocaleString()}</p>
          <p className={pnl < 0 ? 'text-red-600' : 'text-green-600'}>
            Unrealized P&L: ₹{pnl.toLocaleString()}
          </p>
          <p>ROI: {(roi * 100).toFixed(2)}%</p>
          <p>XIRR: {(xirr * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}
