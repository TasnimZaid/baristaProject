const Order = require("../model/orders");
const User = require("../model/users");
const Beverage = require("../model/beverages");
const Barista = require("../model/baristas");

exports.getDailyProfits = async (req, res) => {
  try {
    const dailyProfits = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          totalProfit: { $sum: { $multiply: ["$totalPrice", 0.1] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(dailyProfits);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching daily profits", error: error.message });
  }
};

exports.getDailyOrderDetails = async (req, res) => {
  const { date } = req.params;

  try {
    const orders = await Order.find({
      orderDate: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
    })
      .populate("userId", "username")
      .populate("beverageId", "name")
      .populate("baristaId", "username");

    const orderDetails = orders.map((order) => ({
      orderId: order._id,
      userName: order.userId.username,
      beverageName: order.beverageId.name,
      baristaName: order.baristaId.username,
      totalPrice: order.totalPrice,
      profit: order.totalPrice * 0.1,
    }));

    res.json(orderDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order details", error: error.message });
  }
};
