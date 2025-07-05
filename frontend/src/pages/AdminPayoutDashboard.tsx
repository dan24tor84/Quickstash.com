// FILE: frontend/src/pages/AdminPayoutDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPayoutDashboard() {
  const [summary, setSummary] = useState<{ total: number; byCourier: Record<string, number> }>({
    total: 0,
    byCourier: {},
  });

  useEffect(() => {
    axios.get('/api/admin/payouts/summary')
      .then(res => setSummary(res.data))
      .catch(() => alert('Failed to load payout summary.'));
  }, []);

  const downloadCSV = () => {
    window.open('/api/admin/payouts/export/csv', '_blank');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payout Summary</h1>
      <p className="mb-4">
        <strong>Total Payouts:</strong> ${summary.total.toFixed(2)}
      </p>

      <h2 className="text-xl font-semibold mb-2">By Courier</h2>
      <ul className="mb-4">
        {Object.entries(summary.byCourier).map(([courierId, amount]) => (
          <li key={courierId}>
            Courier {courierId}: ${amount.toFixed(2)}
          </li>
        ))}
      </ul>

      <button onClick={downloadCSV} className="bg-blue-600 text-white px-4 py-2 rounded">
        Export CSV
      </button>
    </div>
  );
}
