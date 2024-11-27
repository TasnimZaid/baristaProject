const express = require("express");
const router = express.Router();


const adminController = require("../Controllers/adminController");
const userController = require("../Controllers/user");
const baristaController = require("../Controllers/barista");
const recipeController = require("../Controllers/recipes");
const beverageController = require("../Controllers/beverages");
const orderController = require("../Controllers/order");
const reviewsController = require("../Controllers/reviews");
const contactController = require("../Controllers/contactController");
const baristaReqController = require("../Controllers/baristaReq");
const profitController = require("../Controllers/profit")



router.get("/dashboard-stats", adminController.getDashboardStats);



router.get("/daily-profits", profitController.getDailyProfits);
router.get("/daily-order-details/:id", profitController.getDailyOrderDetails);



router.get("/users", userController.getUsers);
router.put("/users/:id", userController.updateUser);
router.patch("/users/:id", userController.deleteUser);
router.patch("/users/:id/toggle-status", userController.toggleUserStatus);




router.get("/baristas", baristaController.getBaristas);
router.get("/baristas/stats", baristaController.getBaristastats);
router.patch("/baristas/:id/toggle-status",baristaController.toggleBaristaStatus);
router.patch("/baristas/:id", baristaController.deleteBarista);




router.get("/requests", baristaReqController.getRequests);
router.patch("/requests/:id", baristaReqController.deleteRequest);
router.patch("/requests/:id/toggle-status",baristaReqController.toggleRequestStatus);





router.get("/recipes", recipeController.getRecipes);
router.get("/recipes/rate",recipeController .getReviewRate);
router.patch("/recipes/:id", recipeController.deleteRecipe);





router.get("/beverages", beverageController.getBeverages);
router.get("/beverages/rate",beverageController .getReviewRate);
router.put("/beverages/:id", beverageController.editBeverage);
router.patch("/beverages/:id", beverageController.softDeleteBeverage);




router.get("/orders", orderController.getOrders);
router.put("/order/:id", orderController.updateOrderItem);
router.delete("/order/:id", orderController.softDeleteOrder);




router.get("/reviews", reviewsController.getReviews);
router.delete("/reviews/:id", reviewsController.softDeleteReview);




router.get("/contacts", contactController.getContactMessages);

module.exports = router;
