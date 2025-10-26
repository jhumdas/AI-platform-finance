import React from "react";
import "./App.css";

import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold md:text-xl">
            Financial Dashboard
          </h1>
          <button className="text-white text-lg rounded py-2 px-8 font-semibold bg-red-500">
            Logout
          </button>
        </div>
      </header>

      <main className="min-h-screen max-w-7xl mx-auto p-4">
        <Dashboard />
      </main>
    </>
  );
}
