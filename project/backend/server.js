require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const beveragesMarketRoute = require("./routes/beveragesMarketRoute");
const userProfileRoutes = require("./routes/userProfile");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const wishListRoute = require("./routes/wishListRoute");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/users");
const baristaAuthRoutes = require("./routes/baristaAuthRoutes");
const beverageRoutes = require("./routes/beverageRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const orderRoutes = require("./routes/ordersMRouter");
const ordersRoutes = require("./routes/ordersRoutes");
const share = require("./routes/shareUserRoutes");
const report = require('./routes/report');

app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

  
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE" ,"PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
// ---------------------------------------------------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -----------------------------------------------------------
// obada
app.use("/api", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/barista-auth", baristaAuthRoutes);
app.use("/api/beverage", beverageRoutes);
app.use("/api/recipe", recipeRoutes);
app.use('/api/users' , userRoutes)
app.use('/api/orders' , ordersRoutes)

// Tasneem Routes
app.use("/api", productRoutes);
app.use("/api", userProfileRoutes);
app.use("/api", wishListRoute);
app.use("/api" , share )
app.use('/api' , report)
// Mohammad Routes
app.use("/api", beveragesMarketRoute);
app.use("/api/admin", adminRoutes);
// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//stripe // mohammad
const stripe = require("stripe")(
  "sk_test_51PeAmLGFMsHudRVCdXHM5azFYtgX4en8crg9c7reVqX19nbkiJealMIbVmO3RJpXijpqXIQ85jozUJymsfMOaS43009rAUHPl8"
);

app.post("/api/payment", async (req, res) => {
  try {
    const { amount, payment_method } = req.body; // payment_method from card

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method,
      confirm: true, // Immediately confirms the payment
      payment_method_types: ["card"], // Only allow card payments, as Apple Pay is handled separately
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.use("/api/orders", orderRoutes);
