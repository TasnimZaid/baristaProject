// controllers/ordersMController.js
const Order = require('../model/ordersM');
const User = require('../model/users');
const Beverage = require('../model/beverages');
const Product = require("../model/products"); 
const Barista = require('../model/baristas');
const stripe = require('stripe')('sk_test_51PeAmLGFMsHudRVCdXHM5azFYtgX4en8crg9c7reVqX19nbkiJealMIbVmO3RJpXijpqXIQ85jozUJymsfMOaS43009rAUHPl8');

const createOrder = async (req, res) => {
  const { userId, orderItems, paymentMethod } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let totalAmount = 0;
    const baristaOrders = {};
    const websiteProducts = [];

    for (let item of orderItems) {
      if (item.itemType === 'beverage') {
        const beverage = await Beverage.findById(item.itemId);
        if (!beverage) return res.status(404).json({ message: 'Beverage not found' });

        totalAmount += item.price * item.quantity;

        const baristaId = beverage.baristaId.toString();
        if (!baristaOrders[baristaId]) {
          baristaOrders[baristaId] = { baristaId, beverages: [], totalBaristaAmount: 0 };
        }

        baristaOrders[baristaId].beverages.push({
          beverageId: item.itemId,
          quantity: item.quantity,
          price: item.price,
        });

        baristaOrders[baristaId].totalBaristaAmount += item.price * item.quantity;
      } else if (item.itemType === 'product') {
        const product = await Product.findById(item.itemId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        totalAmount += item.price * item.quantity;

        websiteProducts.push({
          productId: item.itemId,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }

    const baristaOrdersArray = Object.values(baristaOrders);

    const newOrder = new Order({
      userId,
      orderItems,
      baristaOrders: baristaOrdersArray,
      websiteProducts,
      totalAmount,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    if (paymentMethod === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orderItems.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
      });

      res.json({ orderId: savedOrder._id, stripeSession: session });
    } else {
      res.status(200).json({ orderId: savedOrder._id, message: 'Order placed without Stripe' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch orders for the given userId without populating orderItems
    let orders = await Order.find({ userId })
    // Manually populate orderItems based on itemType
    orders = await Promise.all(
      orders.map(async (order) => {
        order.orderItems = await Promise.all(
          order.orderItems.map(async (item) => {
            if (item.itemType === "beverage") {
              item.itemId = await Beverage.findById(item.itemId).select(
                "name description price"
              );
            } else if (item.itemType === "product") {
              item.itemId = await Product.findById(item.itemId).select(
                "name description price"
              );
            }
            return item;
          })
        );
        return order;
      })
    );

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};