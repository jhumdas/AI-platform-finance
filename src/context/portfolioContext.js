import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [pRes, hRes] = await Promise.all([
          fetch('/portfolio.json'),
          fetch('/holdings.json')
        ]);
        if (!pRes.ok || !hRes.ok) throw new Error('Failed to fetch JSON');
        const pData = await pRes.json();
        const hData = await hRes.json();
        setPortfolio(pData.equity || pData);
        setHoldings(hData.equity || hData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolio, holdings, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
