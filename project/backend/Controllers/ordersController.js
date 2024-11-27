const Order = require('../model/ordersM');

exports.getBaristaStats = async (req, res) => {
  try {
    const baristaId = req.user;
    const orders = await Order.find({ 'baristaOrders.baristaId': baristaId });

    let totalBeveragesSold = 0;
    let totalSales = 0;
    const customerSet = new Set();

    orders.forEach(order => {
      order.baristaOrders.forEach(baristaOrder => {
        if (baristaOrder.baristaId && baristaOrder.baristaId.toString() === baristaId) {
          totalSales += baristaOrder.totalBaristaAmount;

          baristaOrder.beverages.forEach(beverage => {
            totalBeveragesSold += beverage.quantity;
           if (beverage.customerId) {
              customerSet.add(beverage.customerId.toString());
            }
          });
        }
      });
    });

    res.json({
      totalBeveragesSold,
      totalCustomers: customerSet.size,
      totalSales,
      sharedRecipes: 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
