import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#4F46E5', '#06B6D4', '#10B981'];

export default function PortfolioSummary({ portfolio }) {
  const data = portfolio.constituents?.map(c => ({
    name: c.name,
    value: c.market_value
  })) ?? [];

  const total = portfolio.market_value ?? 0;

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">Portfolio at a glance</h3>
        <p className="text-gray-600 text-sm">Total Market Value:</p>
        <p className="text-2xl font-bold mb-2">₹{total.toLocaleString()}</p>
      </div>
      <div className="flex-1 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
