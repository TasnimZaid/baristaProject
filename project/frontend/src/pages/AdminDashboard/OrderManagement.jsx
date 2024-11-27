import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaHome,
  FaUsers,
  FaCoffee,
  FaBook,
  FaGlassWhiskey,
  FaShoppingCart,
  FaComments,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminDashboard from "./HomeDash";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [search, page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/orders",
        {
          params: { search, page, limit: 7 }
        }
      );
      setOrders(response.data.orders);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/order/${editingOrder._id}`,
        {
          quantity: editingOrder.quantity,
          totalPrice: editingOrder.totalPrice
        }
      );
      setOrders(
        orders.map((order) =>
          order._id === editingOrder._id ? response.data : order
        )
      );
      setEditingOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/order/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditingOrder({
      ...editingOrder,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const NavItem = ({ to, icon, text }) => (
    <li>
      <Link
        to={to}
        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
      >
        <span className="mr-3 text-lg">{icon}</span>
        {text}
      </Link>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminDashboard />
      <div className="flex flex-col ml-8 w-full mt-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h2>

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search orders..."
          className="border rounded px-4 py-2 mb-4 w-full"
        />

        {loading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beverage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.userId.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.baristaId.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.beverageId.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingOrder && editingOrder._id === order._id ? (
                        <input
                          type="number"
                          name="quantity"
                          value={editingOrder.quantity}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-20"
                        />
                      ) : (
                        order.quantity
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingOrder && editingOrder._id === order._id ? (
                        <input
                          type="number"
                          name="totalPrice"
                          value={editingOrder.totalPrice}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-20"
                        />
                      ) : (
                        `$${order.totalPrice.toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingOrder && editingOrder._id === order._id ? (
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-900 mr-2 transition duration-150 ease-in-out"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(order)}
                          className="text-yellow-600 hover:text-yellow-800 mr-2 transition duration-150 ease-in-out"
                        >
                          <FaEdit className="inline mr-1" /> Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
          >
            Previous
          </button>
          <span className="flex items-center">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
