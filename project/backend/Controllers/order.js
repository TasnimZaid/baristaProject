
const Order = require("../model/orders");

// In your order controller

exports.getOrders = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 7 } = req.query;

    // Construct search query
    const searchQuery = search
      ? {
          $or: [
            { 'userId.username': { $regex: search, $options: 'i' } },
            { 'baristaId.username': { $regex: search, $options: 'i' } },
            { 'beverageId.name': { $regex: search, $options: 'i' } },
            { status: { $regex: search, $options: 'i' } }
          ],
          isDeleted: false
        }
      : { isDeleted: false };

    // Fetch orders with search, pagination and populate
    const orders = await Order.find(searchQuery)
      .populate('userId', 'username')
      .populate('baristaId', 'username')
      .populate('beverageId', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalOrders = await Order.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalOrders / limit);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages,
        totalOrders
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};


exports.updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, totalPrice} = req.body;
    const updatedOrderItem = await Order.findByIdAndUpdate(
      id,
      { quantity, totalPrice },
      { new: true }
    )
      .populate("userId", "username")
      .populate("baristaId", "username")
      .populate("beverageId", "name");

    res.json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating order item" });
  }
};


exports.softDeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting order" });
  }
};

