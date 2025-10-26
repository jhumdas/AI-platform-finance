import React, { useState, useMemo } from 'react';

export default function HoldingsTable({ portfolio }) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('roi');
  const [order, setOrder] = useState('desc');

  const instruments = useMemo(() => {
    if (!portfolio?.constituents) return [];
    return portfolio.constituents.flatMap(c =>
      c.instruments.map(i => ({ ...i, category: c.name }))
    );
  }, [portfolio]);

  const filtered = instruments.filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const A = a[sortKey] ?? 0;
    const B = b[sortKey] ?? 0;
    return order === 'asc' ? A - B : B - A;
  });

  function toggleSort(key) {
    if (key === sortKey) setOrder(o => (o === 'asc' ? 'desc' : 'asc'));
    else setSortKey(key);
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="border rounded px-3 py-2 flex-1"
        />
      </div>
      <div className="table-scroll">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="py-2 px-2 text-left">Name</th>
              <th className="py-2 px-2 text-left">Category</th>
              <th className="py-2 px-2 text-left cursor-pointer" onClick={() => toggleSort('roi')}>ROI</th>
              <th className="py-2 px-2 text-left cursor-pointer" onClick={() => toggleSort('market_value')}>Market Value</th>
              <th className="py-2 px-2 text-left cursor-pointer" onClick={() => toggleSort('unrealized_pnl')}>Unrealized P&L</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(i => (
              <tr key={i.name} className="border-t">
                <td className="py-2 px-2">{i.name}</td>
                <td className="py-2 px-2 text-gray-500">{i.category}</td>
                <td className="py-2 px-2">{(i.roi * 100).toFixed(2)}%</td>
                <td className="py-2 px-2">₹{i.market_value.toLocaleString()}</td>
                <td className={`py-2 px-2 ${i.unrealized_pnl < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ₹{i.unrealized_pnl.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!sorted.length && <p className="py-6 text-center text-gray-500">No matching results</p>}
      </div>
    </div>
  );
}
