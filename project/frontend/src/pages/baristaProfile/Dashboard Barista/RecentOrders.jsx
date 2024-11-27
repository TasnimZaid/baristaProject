import React from 'react';

const RecentOrders = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Order ID</th>
          <th className="p-2 text-left">Customer</th>
          <th className="p-2 text-left">Beverage</th>
          <th className="p-2 text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">001</td>
          <td className="p-2">John Doe</td>
          <td className="p-2">Latte</td>
          <td className="p-2">$4.50</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="p-2">002</td>
          <td className="p-2">Jane Smith</td>
          <td className="p-2">Cappuccino</td>
          <td className="p-2">$3.75</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default RecentOrders;
