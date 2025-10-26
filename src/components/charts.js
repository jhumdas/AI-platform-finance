import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PerformanceChart({ portfolio }) {
  const mv = portfolio?.market_value || 0;
  const mockData = [
    { date: '2025-06', value: mv * 0.9 },
    { date: '2025-07', value: mv * 0.95 },
    { date: '2025-08', value: mv },
    { date: '2025-09', value: mv * 1.03 },
    { date: '2025-10', value: mv * 1.05 }
  ].map(d => ({ ...d, value: +(d.value / 1000000).toFixed(2) }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Performance (in ₹ Millions)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
