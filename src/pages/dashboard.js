import React from "react";
import { usePortfolio } from "../context/portfolioContext";
import PortfolioSummary from "../components/portfoliosummary";
import HoldingsTable from "../components/holdingTables";
import PerformanceChart from "../components/charts";
import Sidebar from "../components/sidebar";
import ChatWidget from "../components/ChatWidget";

export default function Dashboard() {
  const { portfolio, holdings, loading, error } = usePortfolio();

  if (loading)
    return <div className="py-16 text-center">Loading portfolio...</div>;
  if (error)
    return <div className="py-16 text-center text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 lg:col-span-3">
        <Sidebar portfolio={portfolio} />
      </aside>

      <section className="col-span-12 lg:col-span-9 space-y-6">
        <PortfolioSummary portfolio={portfolio} />
        <PerformanceChart portfolio={portfolio} />
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Holdings</h3>
          <HoldingsTable portfolio={portfolio} />
        </div>
        <ChatWidget />
      </section>
    </div>
  );
}
