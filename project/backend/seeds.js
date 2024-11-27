const mongoose = require('mongoose');
const Barista = require('./model/baristas');
const Beverage = require('./model/beverages');
const Order = require('./model/orders');
const Product = require('./model/products');
const Recipe = require('./model/recipes');
const Review = require('./model/reviews');
const User = require('./model/users');
const BaristaAuth = require("./model/baristasAuth");

require('dotenv').config(); 





mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});


// Clear existing data
const clearData = async () => {
  await User.deleteMany({});
  await Barista.deleteMany({});
  await BaristaAuth.deleteMany({});
  await Recipe.deleteMany({});
  await Beverage.deleteMany({});
  await Review.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  console.log("Existing data cleared.");
};

// Create sample data
const createSampleData = async () => {
  // Sample Users
  const user1 = new User({ username: 'john_doe', email: 'john@example.com', password: '123456' });
  const user2 = new User({ username: 'jane_doe', email: 'jane@example.com', password: 'abcdef' });

  await user1.save();
  await user2.save();

  // Sample Baristas
  const barista1 = new Barista({ username: 'barista_one', email: 'barista1@example.com', password: 'barista123', isApproved: true });
  const barista2 = new Barista({ username: 'barista_two', email: 'barista2@example.com', password: 'barista456', isApproved: true });

  await barista1.save();
  await barista2.save();
  
    const baristaAuth1 = new BaristaAuth({
    baristaId: "66d969a1c7bf2bbc0340d24d",
    profileImage: "uploadsprofileImage-1725444916669.JPG",
    phone: "0786997275",
    culinarySchool: "uploadsculinarySchool-1725444916708.pdf",
    bio: "Experienced barista with a passion for creating specialty drinks.",
    portfolio: "uploadsportfolio-1725444916726.pdf",
    recommendations: "recommendation",
    applicationStatus: "pending",
  });

  await baristaAuth1.save();
  
 // Sample Recipes
 const recipes = [
  
  { 
    name: 'Vanilla Syrup Drink Mix', 
    baristaId: barista1._id, 
    preparation: 'Shake well before serving.',
    ingredients: [ '1,5cl  Ocean Spray Cranberry Syrup' , '10cl Whole milk' , '3cl Sweetened condensed milk'],
    cookingTime: '5 minutes',
    categories: ['Syrup'],
    cuisine: 'American',
    dietaryRestrictions: ['Vegetarian'],
    photos: ['https://www.1883.com/app/uploads/2021/05/sirop_curacao-bleu-1883-1.webp'],
     bg: ['https://www.1883.com/app/uploads/2024/06/BLUE-LAGOON_COCKTAIL-SEUL.jpg'] ,
    reviews: [],
    products: []
  },

 // Curacao Syrup
 {
  name: 'Curacao Cooler',
  baristaId: barista1._id,
  preparation: 'Mix Curacao syrup with citrus juice and soda water, serve over ice.',
  ingredients: ['Curacao Syrup', 'citrus juice', 'soda water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Tropical Curacao Punch',
  baristaId: barista2._id,
  preparation: 'Combine Curacao syrup with pineapple juice and soda water, serve chilled.',
  ingredients: ['Curacao Syrup', 'pineapple juice', 'soda water', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Hazelnut Syrup
{
  name: 'Hazelnut Coffee',
  baristaId: barista1._id,
  preparation: 'Add Hazelnut syrup to brewed coffee, stir, and serve hot.',
  ingredients: ['Hazelnut Syrup', 'brewed coffee'],
  cookingTime: '2 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Hazelnut Milkshake',
  baristaId: barista2._id,
  preparation: 'Blend Hazelnut syrup with milk and ice cream, serve chilled.',
  ingredients: ['Hazelnut Syrup', 'milk', 'ice cream'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Honey Syrup
{
  name: 'Honey Lemonade',
  baristaId: barista1._id,
  preparation: 'Mix Honey syrup with lemon juice and water, serve over ice.',
  ingredients: ['Honey Syrup', 'lemon juice', 'water', 'ice'],
  cookingTime: '2 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Honey Ginger Tea',
  baristaId: barista2._id,
  preparation: 'Stir Honey syrup into brewed ginger tea, add a slice of lemon, and serve.',
  ingredients: ['Honey Syrup', 'brewed ginger tea', 'lemon slice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Red Passion Fruit Syrup
{
  name: 'Passion Fruit Mojito',
  baristaId: barista1._id,
  preparation: 'Combine Red Passion Fruit syrup with lime juice and soda water, serve over ice.',
  ingredients: ['Red Passion Fruit Syrup', 'lime juice', 'soda water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Passion Fruit Cooler',
  baristaId: barista2._id,
  preparation: 'Mix Red Passion Fruit syrup with pineapple juice and ice, serve chilled.',
  ingredients: ['Red Passion Fruit Syrup', 'pineapple juice', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Orchid Syrup
{
  name: 'Orchid Lemon Fizz',
  baristaId: barista1._id,
  preparation: 'Mix Orchid syrup with lemon juice and sparkling water, serve chilled.',
  ingredients: ['Orchid Syrup', 'lemon juice', 'sparkling water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Orchid Tea Punch',
  baristaId: barista2._id,
  preparation: 'Combine Orchid syrup with brewed tea and ice, serve chilled.',
  ingredients: ['Orchid Syrup', 'brewed tea', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Rose Syrup
{
  name: 'Rose Lemonade',
  baristaId: barista1._id,
  preparation: 'Mix Rose syrup with lemon juice and water, serve over ice.',
  ingredients: ['Rose Syrup', 'lemon juice', 'water', 'ice'],
  cookingTime: '2 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Rose Sparkler',
  baristaId: barista2._id,
  preparation: 'Combine Rose syrup with sparkling water and ice, serve chilled.',
  ingredients: ['Rose Syrup', 'sparkling water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// CRANBERRY Syrup
{
  name: 'Cranberry Fizz',
  baristaId: barista1._id,
  preparation: 'Mix CRANBERRY syrup with soda water and lime juice, serve chilled.',
  ingredients: ['CRANBERRY Syrup', 'soda water', 'lime juice', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Cranberry Lemon Cooler',
  baristaId: barista2._id,
  preparation: 'Combine CRANBERRY syrup with lemon juice and water, serve over ice.',
  ingredients: ['CRANBERRY Syrup', 'lemon juice', 'water', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Violet Syrup
{
  name: 'Violet Lemonade',
  baristaId: barista1._id,
  preparation: 'Mix Violet syrup with lemon juice and water, serve chilled.',
  ingredients: ['Violet Syrup', 'lemon juice', 'water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Violet Sparkler',
  baristaId: barista2._id,
  preparation: 'Combine Violet syrup with sparkling water and ice, serve chilled.',
  ingredients: ['Violet Syrup', 'sparkling water', 'ice'],
  cookingTime: '2 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Tarragon Syrup
{
  name: 'Tarragon Lemonade',
  baristaId: barista1._id,
  preparation: 'Mix Tarragon syrup with lemon juice and water, serve over ice.',
  ingredients: ['Tarragon Syrup', 'lemon juice', 'water', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Tarragon Sparkler',
  baristaId: barista2._id,
  preparation: 'Combine Tarragon syrup with soda water and ice, serve chilled.',
  ingredients: ['Tarragon Syrup', 'soda water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Blackberry Syrup
{
  name: 'Blackberry Lemonade',
  baristaId: barista1._id,
  preparation: 'Mix Blackberry syrup with lemon juice and water, serve chilled.',
  ingredients: ['Blackberry Syrup', 'lemon juice', 'water', 'ice'],
  cookingTime: '2 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Blackberry Fizz',
  baristaId: barista2._id,
  preparation: 'Combine Blackberry syrup with soda water and ice, serve chilled.',
  ingredients: ['Blackberry Syrup', 'soda water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Watermelon Syrup
{
  name: 'Watermelon Lemonade',
  baristaId: barista1._id,
  preparation: 'Mix Watermelon syrup with lemon juice and water, serve chilled.',
  ingredients: ['Watermelon Syrup', 'lemon juice', 'water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Watermelon Cooler',
  baristaId: barista2._id,
  preparation: 'Combine Watermelon syrup with pineapple juice and ice, serve chilled.',
  ingredients: ['Watermelon Syrup', 'pineapple juice', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Orange Syrup
{
  name: 'Orange Fizz',
  baristaId: barista1._id,
  preparation: 'Mix Orange syrup with soda water and ice, serve chilled.',
  ingredients: ['Orange Syrup', 'soda water', 'ice'],
  cookingTime: '2 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Orange Sparkler',
  baristaId: barista2._id,
  preparation: 'Combine Orange syrup with lemon juice and sparkling water, serve chilled.',
  ingredients: ['Orange Syrup', 'lemon juice', 'sparkling water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Triple Syrup
{
  name: 'Triple Citrus Cooler',
  baristaId: barista1._id,
  preparation: 'Mix Triple syrup with citrus juice and soda water, serve chilled.',
  ingredients: ['Triple Syrup', 'citrus juice', 'soda water', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Triple Berry Punch',
  baristaId: barista2._id,
  preparation: 'Combine Triple syrup with berry juice and ice, serve chilled.',
  ingredients: ['Triple Syrup', 'berry juice', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Raspberry Syrup
{
  name: 'Raspberry Lemon Cooler',
  baristaId: barista1._id,
  preparation: 'Mix Raspberry syrup with lemon juice and soda water, serve chilled.',
  ingredients: ['Raspberry Syrup', 'lemon juice', 'soda water', 'ice'],
  cookingTime: '2 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Raspberry Sparkler',
  baristaId: barista2._id,
  preparation: 'Combine Raspberry syrup with sparkling water and ice, serve chilled.',
  ingredients: ['Raspberry Syrup', 'sparkling water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Bubble Gum Syrup
{
  name: 'Bubble Gum Milkshake',
  baristaId: barista1._id,
  preparation: 'Blend Bubble Gum syrup with milk and ice cream, serve chilled.',
  ingredients: ['Bubble Gum Syrup', 'milk', 'ice cream'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Bubble Gum Fizz',
  baristaId: barista2._id,
  preparation: 'Mix Bubble Gum syrup with soda water and ice, serve chilled.',
  ingredients: ['Bubble Gum Syrup', 'soda water', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Iced Tea Peach Syrup
{
  name: 'Peach Iced Tea',
  baristaId: barista1._id,
  preparation: 'Stir Peach syrup into brewed black tea, add ice, and serve chilled.',
  ingredients: ['Iced Tea Peach Syrup', 'brewed black tea', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Peach Lemon Fizz',
  baristaId: barista2._id,
  preparation: 'Mix Peach syrup with lemon juice and soda water, serve over ice.',
  ingredients: ['Iced Tea Peach Syrup', 'lemon juice', 'soda water', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
 // Iced Tea Mango Syrup
 {
  name: 'Mango Iced Tea',
  baristaId: barista1._id,
  preparation: 'Stir Mango syrup into brewed black tea, add ice, and serve chilled.',
  ingredients: ['Iced Tea Mango Syrup', 'brewed black tea', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Mango Lemonade',
  baristaId: barista2._id,
  preparation: 'Mix Mango syrup with lemon juice and soda water, serve chilled.',
  ingredients: ['Iced Tea Mango Syrup', 'lemon juice', 'soda water', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

// Iced Tea Raspberry Syrup
{
  name: 'Raspberry Iced Tea',
  baristaId: barista1._id,
  preparation: 'Stir Raspberry syrup into brewed tea, add ice, and serve chilled.',
  ingredients: ['Iced Tea Raspberry Syrup', 'brewed black tea', 'ice'],
  cookingTime: '3 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},
{
  name: 'Raspberry Lemon Sparkler',
  baristaId: barista2._id,
  preparation: 'Mix Raspberry syrup with lemon juice, top with soda water, and serve over ice.',
  ingredients: ['Iced Tea Raspberry Syrup', 'lemon juice', 'soda water', 'ice'],
  cookingTime: '4 minutes',
  categories: ['mojito'],
  cuisine: 'jordan',
  dietaryRestrictions: ['mojito'],
  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_peppermint-1883_ps.webp'],
  bg: ['https://www.1883.com/app/uploads/2024/06/MOJITO-1-682x1024.jpg'],
  products: []
},

];

//     photos: ['https://www.1883.com/app/uploads/2021/05/sirop_cranberry-1883_ps.png'],
// bg: ['https://www.1883.com/app/uploads/2024/08/CRANBERRY-TONIC-683x1024.jpg'],



//  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_noisette-1883_ps.webp'],
// bg : ['https://www.1883.com/app/uploads/2021/05/roasted-clafoutis-683x1024.jpg'] ,

//  photos: ['https://www.1883.com/app/uploads/2021/05/sirop_curacao-bleu-1883-1.webp'],
// bg: ['https://www.1883.com/app/uploads/2024/06/BLUE-LAGOON_COCKTAIL-SEUL.jpg'] ,

const savedRecipes = await Recipe.insertMany(recipes);
// Sample Beverages with quantityAvailable
const beverages = [
  { name: 'Green Lady', baristaId: barista1._id, description: 'Refreshing Mojito.', price: 5, category: 'Mojito', quantityAvailable: 50, photos: ['https://www.1883.com/app/uploads/2021/05/green-lady.jpg'] },//0
  { name: 'blue ocean ', baristaId: barista2._id, description: 'mix ocean Curacao', price: 6, category: 'Mojito', quantityAvailable: 45, photos: ['https://www.1883.com/app/uploads/2021/05/blue-hawaiian-702x1024.jpg'] },//1
  { name: 'Cranberry Tonic', baristaId: barista1._id, description: 'Fruity cranberry tonic.', price: 4, photos: ['https://www.1883.com/app/uploads/2024/08/CRANBERRY-TONIC-683x1024.jpg'], category: 'Mojito', quantityAvailable: 60 },//2
  { name: 'Honey Lemonade', baristaId: barista2._id, description: 'Sweet honey lemonade.', price: 3, category: 'Mojito', quantityAvailable: 40, photos: ['https://www.1883.com/app/uploads/2024/08/honey-lemonade.jpg'] },//3
  { name: 'Passion Fruit Mojito', baristaId: barista1._id, description: 'Refreshing passion fruit mojito.', price: 4, category: 'Mojito', quantityAvailable: 30, photos: ['https://www.1883.com/app/uploads/2024/08/passion-fruit-mojito.jpg'] },//4
  { name: 'Watermelon Cooler', baristaId: barista2._id, description: 'Cool watermelon drink.', price: 5, category: 'Mojito', quantityAvailable: 35, photos: ['https://www.1883.com/app/uploads/2024/08/watermelon-cooler.jpg'] },//5
  { name: 'Blackberry Mate', baristaId: barista1._id, description: 'Blackberry Mate Hot Drink.', price: 5, category: 'Mate', quantityAvailable: 40, photos: ['https://www.1883.com/app/uploads/2021/05/blackberry-mate.jpg'] },//6
  { name: 'Orchid Breeze', baristaId: barista2._id, description: 'A fancy floral  drink.', price: 3, category: 'Mojito', quantityAvailable: 30, photos: ['https://www.1883.com/app/uploads/2021/05/orchid-breeze-2.jpg'] },//7
  { name: 'Raspberry Iced Tea', baristaId: barista1._id, description: 'Sweet raspberry iced tea.', price: 4, category: 'IcedTea', quantityAvailable: 50, photos: ['https://www.1883.com/app/uploads/2024/08/raspberry-iced-tea.jpg'] },//8
  { name: 'Raspberry Cooler', baristaId: barista1._id, description: 'Chilled raspberry cooler.', price: 4, category: 'IcedTea', quantityAvailable: 35, photos: ['https://www.1883.com/app/uploads/2024/08/raspberry-cooler.jpg'] },//9
  { name: 'Roasted Clafoutis', baristaId: barista2._id, description: 'Iced Coffee.', price: 4, category: 'Coffee', quantityAvailable: 20, photos: ['https://www.1883.com/app/uploads/2021/05/roasted-clafoutis.jpg'] },//10
  { name: 'Nocciola Goloso', baristaId: barista1._id, description: 'Hazelnut espresso.', price: 3, category: 'Coffee', quantityAvailable: 45, photos: ['https://www.1883.com/app/uploads/2021/07/nochiola-grosso.jpg'] },//11
  { name: 'Honey Iced Tea', baristaId: barista2._id, description: 'Sweet honey iced tea.', price: 4, category: 'IcedTea', quantityAvailable: 50, photos: ['https://www.1883.com/app/uploads/2024/08/honey-iced-tea.jpg'] },//12
  { name: 'Passion Fruit Iced Tea', baristaId: barista1._id, description: 'Passion fruit iced tea.', price: 4, category: 'IcedTea', quantityAvailable: 25, photos: ['https://www.1883.com/app/uploads/2024/08/passion-fruit-iced-tea.jpg'] },//13
  { name: 'Violet Iced Tea', baristaId: barista2._id, description: 'Floral violet iced tea.', price: 4, category: 'IcedTea', quantityAvailable: 30, photos: ['https://www.1883.com/app/uploads/2024/08/violet-iced-tea.jpg'] },//14
  { name: 'Peach Iced Tea', baristaId: barista2._id, description: 'Cool peach iced tea.', price: 4, category: 'IcedTea', quantityAvailable: 55, photos: ['https://www.1883.com/app/uploads/2024/08/peach-iced-tea.jpg'] },//15
  { name: 'Peach Mint Cooler', baristaId: barista1._id, description: 'Peach and mint cooler.', price: 5, category: 'Mojito', quantityAvailable: 30, photos: ['https://www.1883.com/app/uploads/2024/08/peach-mint-cooler.jpg'] },//16
  { name: 'Mango Lemonade', baristaId: barista2._id, description: 'Mango-flavored lemonade.', price: 3, category: 'Mojito', quantityAvailable: 35, photos: ['https://www.1883.com/app/uploads/2024/08/mango-lemonade.jpg'] },//17
  { name: 'Blue Hawaiian', baristaId: barista1._id, description: 'Hawaiian Mojito.', price: 6, category: 'Mojito', quantityAvailable: 40, photos: ['https://www.1883.com/app/uploads/2021/05/blue-hawaiian.jpg'] },//18
  { name: 'Virgin Cherry Cosmo', baristaId: barista2._id, description: 'Citrus Mojito.', price: 4, category: 'Mojito', quantityAvailable: 20, photos: ['https://www.1883.com/app/uploads/2021/07/virgin-sherry-cosmo.jpg'] },//19
  { name: 'MIMOSA', baristaId: barista2._id, description: 'Orange Mojito.', price: 4, category: 'Mojito', quantityAvailable: 20, photos: ['https://www.1883.com/app/uploads/2024/06/MIMOSA_COCKTAIL-SEUL.jpg'] },//20
  { name: 'Java Jog', baristaId: barista2._id, description: 'Pineapple And Pandan Combine.', price: 4, category: 'Mojito', quantityAvailable: 20, photos: ['https://www.1883.com/app/uploads/2022/07/java-fog-recette-1883.jpg'] },//21
  { name: 'Bubble Gum Daiquiri', baristaId: barista2._id, description: 'Bubble Gum Mojito.', price: 4, category: 'Mojito', quantityAvailable: 20, photos: ['https://www.1883.com/app/uploadshttps://www.1883.com/app/uploads/2021/05/bubble-gum-daiquiri.jpg/2024/08/ginger-ale.jpg'] },//22
  { name: 'Vermouth Heritage', baristaId: barista2._id, description: 'Raspbery cold drink.', price: 4, category: 'Mojito', quantityAvailable: 20, photos: ['https://www.1883.com/app/uploads/2021/05/vermouth-heritage.jpg'] },//23
 
];

const savedBeverages = await Beverage.insertMany(beverages);


  // // بدي اضيفهم جديد 
  // { name: 'Ocean Spray Cranberry Syrup', description: '.', price: 10, category: 'Syrup' , photos: ['https://example.com/images/hazelnut_syrup.jpg'], bg: ['https://www.1883.com/app/uploads/2024/08/Cranberry_elements_18832.png'] , recipes: [savedRecipes[1]._id], beverages: [savedBeverages[1]._id] } ,
  // { name: 'CRANBERRY Syrup', description: '.', price: 10, category: 'Syrup' , photos: ['https://www.1883.com/app/uploads/2021/05/sirop_cranberry-1883_ps.png'], bg: ['https://www.1883.com/app/uploads/2021/05/sirop_cranberry-1883_bg.jpg'] , recipes: [savedRecipes[1]._id], beverages: [savedBeverages[1]._id] } ,
  // { name: 'HONEY Syrup', description: '.', price: 10, category: 'Syrup' , photos: ['https://www.1883.com/app/uploads/2024/06/1883_miel-1.png'], bg: ['https://www.1883.com/app/uploads/2024/06/Miel_elements_18832-1.jpg'] , recipes: [savedRecipes[1]._id], beverages: [savedBeverages[1]._id] } ,
  // { name: 'RED PASSION FRUIT', description: '.', price: 10, category: 'Syrup' , photos: [''], bg: [''] , recipes: [savedRecipes[1]._id], beverages: [savedBeverages[1]._id] } ,
  // { name: 'RED PASSION FRUIT', description: '.', price: 10, category: 'Syrup' , photos: [''], bg: [''] , recipes: [savedRecipes[1]._id], beverages: [savedBeverages[1]._id] } ,

  // // بدي اضيفهم جديد 
  const products = [
    {
      name: 'Curacao Syrup',
      description: 'Vibrant and sweet blue curacao syrup offers the taste of fresh curacao accompanied.',
      price: 10,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_curacao-bleu-1883-1.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_curacao-bleu-1883_bg-1.webp'],
      recipes: [
        // Curacao Cooler
        savedRecipes[1]._id,
        // Tropical Curacao Punch
        savedRecipes[2]._id
      ],
      beverages: savedBeverages[1]._id,
      picture: ['https://www.1883.com/app/uploads/2023/11/OUIEN.webp']
    },
    {
      name: 'Hazelnut Syrup',
      description: 'Nutty hazelnut syrup  this creation combines the best of both worlds: our century-old syrup maker .',
      price: 10,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_noisette-sugar-free-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_noisette-sugar-free-1883_bg.webp'],
      recipes: [
        // Hazelnut Coffee
        savedRecipes[3]._id,
        // Hazelnut Milkshake
        savedRecipes[4]._id
      ],
      beverages: [savedBeverages[10]._id, savedBeverages[11]._id],
      picture: ['https://www.1883.com/app/uploads/2021/06/1883-hazelnut_syrup_sc.webp']
    },
    {
      name: 'Honey Syrup',
      description: 'Sweet honey syrup.',
      price: 8,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2024/06/1883_miel-1.png'],
      bg: ['https://www.1883.com/app/uploads/2024/06/Miel_elements_18832-1.jpg'],
      recipes: [
        // Honey Lemonade
        savedRecipes[5]._id,
        // Honey Ginger Tea
        savedRecipes[6]._id
      ],
      beverages: [savedBeverages[3]._id, savedBeverages[12]._id],
      picture: ['https://www.1883.com/app/uploads/2024/06/Miel_elements_18833.webp']
    },
    {
      name: 'Red Passion Fruit Syrup',
      description: 'Tart passion fruit syrup.',
      price: 9,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/12/1883-red-passion-fruit_syrup_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/12/1883-red-passion-fruit_syrup_bg.webp'],
      recipes: [
        // Passion Fruit Mojito
        savedRecipes[7]._id,
        // Passion Fruit Cooler
        savedRecipes[8]._id
      ],
      beverages: [savedBeverages[4]._id, savedBeverages[13]._id],
      picture: ['https://www.1883.com/app/uploads/2021/06/1883-passion-fruit_syrup_sc.webp']
    },
    {
      name: 'Orchid Syrup',
      description: 'Exotic orchid-flavored syrup with a unique floral taste.',
      price: 8,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_orchidee-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_orchidee-1883_bg-1.webp'],
      recipes: [
        // Orchid Lemon Fizz
        savedRecipes[9]._id,
        // Orchid Tea Punch
        savedRecipes[10]._id
      ],
      beverages: [savedBeverages[7]._id],
      picture: ['https://www.1883.com/app/uploads/2021/06/1883-orchid_syrup_sc.webp']
    },
    {
      name: 'Rose Syrup',
      description: 'With the delicate fragrance reminiscent of freshly picked rose petals , pure Alpine water.',
      price: 9,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_rose-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_rose-1883_bg.webp'],
      recipes: [
        // Rose Lemonade
        savedRecipes[11]._id,
        // Rose Sparkler
        savedRecipes[12]._id
      ],
      beverages: [savedBeverages[21]._id],
      picture: ['https://www.1883.com/app/uploads/2021/06/1883-rose_syrup_sc.webp']
    },
    {
      name: 'CRANBERRY Syrup',
      description: 'Stems from our partnership with Ocean Spray, this creation combines the best of both worlds: our century-old syrup makers expertise and Ocean Sprays fruit savoir-faire.',
      price: 10,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_cranberry-1883_ps.png'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_cranberry-1883_bg.jpg'],
      recipes: [
        // Cranberry Fizz
        savedRecipes[13]._id,
        // Cranberry Lemon Cooler
        savedRecipes[14]._id
      ],
      beverages: [savedBeverages[2]._id],
      picture: ['https://www.1883.com/app/uploads/2024/08/Cranberry_elements_1883_v25.webp']
    },
    {
      name: 'Violet Syrup',
      description: 'With its sweet scent reminiscent of spring, Violet syrup develops a subtly sweet, floral flavour with all the intensity of the violet flower.',
      price: 7,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_violette-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/Sirop_Violette-1.webp'],
      recipes: [
        // Violet Lemonade
        savedRecipes[15]._id,
        // Violet Sparkler
        savedRecipes[16]._id
      ],
      beverages: [savedBeverages[14]._id],
      picture: ['https://www.1883.com/app/uploads/2021/06/1883-orchid_syrup_sc.webp']
    },
    {
      name: 'Tarragon Syrup',
      description: 'Herbal tarragon syrup with a distinct Offering an authentic aroma of sweet tarragon and some hints of anise, aromatic flavor.',
      price: 8,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_estragon-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_estragon-1883_bg.webp'],
      recipes: [
        // Tarragon Lemonade
        savedRecipes[17]._id,
        // Tarragon Sparkler
        savedRecipes[18]._id
      ],
      beverages: [savedBeverages[0]._id],
      picture: ['https://www.1883.com/app/uploads/2021/06/1883-tarragon_syrup_sc.webp']
    },
    {
      name: 'Blackberry Syrup',
      description: 'With its floral and fruity aroma, Blackberry  syrup offers the taste of fresh blackberries accompanied by subtle herbal notes and a slight touch of acidity',
      price: 7,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_mure-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_mure-1883_bg-1.webp'],
      recipes: [
        // Blackberry Lemonade
        savedRecipes[19]._id,
        // Blackberry Fizz
        savedRecipes[20]._id
      ],
      beverages: [savedBeverages[6]._id],
      picture: ['https://www.1883.com/app/uploads/2024/08/Cranberry_elements_1883_v25.webp']
    },
    {
      name: 'Watermelon Syrup',
      description: 'With its characteristic scent of freshly cut watermelon, Watermelon syrup captures the sweet and fruity flavour of the fruit combined with notes of fresh melon and green rind. ',
      price: 8,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_pasteque-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_pasteque-1883_bg-1.webp'],
      recipes: [
        // Watermelon Lemonade
        savedRecipes[21]._id,
        // Watermelon Cooler
        savedRecipes[22]._id
      ],
      beverages: [savedBeverages[5]._id],
      picture: ['https://www.1883.com/app/uploads/2021/06/1883-rose_syrup_sc.webp']
    },
    {
      name: 'Orange Syrup',
      description: 'Citrus orange syrup.',
      price: 7,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_orange-1883-1.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_orange-1883_bg.webp'],
      recipes: [
        // Orange Fizz
        savedRecipes[23]._id,
        // Orange Sparkler
        savedRecipes[24]._id
      ],
      beverages: [savedBeverages[20]._id],
      picture: ['https://www.1883.com/app/uploads/2022/09/baobab-syrup.webp']
    },
    {
      name: 'Triple Syrup',
      description: ' triple syrup, With its sweet, subtle fragrance orange peel, Triple syrup captures all the intensity of the famous  with a light citrus taste perfect for cocktails.',
      price: 9,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_triple-sec-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_triple-sec-1883_bg-1.webp'],
      recipes: [
        // Triple Citrus Cooler
        savedRecipes[25]._id,
        // Triple Berry Punch
        savedRecipes[26]._id
      ],
      beverages: [savedBeverages[19]._id],
      picture: ['https://www.1883.com/app/uploads/2023/11/OUIEN.webp']
    },
    {
      name: 'Raspberry Syrup',
      description: 'Sweet and tangy raspberry syrup. With its bewitching scent of fresh raspberries, Raspberry Syrup pays homage to the unrivalled intensity of ripe',
      price: 7,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_framboise-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/Sirop_TheFramboise-1.webp'],
      recipes: [
        // Raspberry Lemon Cooler
        savedRecipes[27]._id,
        // Raspberry Sparkler
        savedRecipes[28]._id
      ],
      beverages: [savedBeverages[23]._id],
      picture: ['https://www.1883.com/app/uploads/2024/06/Miel_elements_18833.webp']
    },
    {
      name: 'Bubble Gum Syrup',
      description: 'Sweet bubble gum-flavored syrup Adorned in a pink that recalls the sweet delights of our childhood, Bubble Gum ',
      price: 6,
      category: 'Syrup',
      photos: ['https://www.1883.com/app/uploads/2021/05/sirop_bubble-gum-1883_ps.webp'],
      bg: ['https://www.1883.com/app/uploads/2021/05/sirop_bubble-gum-1883_bg.webp'],
      recipes: [
        // Bubble Gum Milkshake
        savedRecipes[29]._id,
        // Bubble Gum Fizz
        savedRecipes[30]._id
      ],
      beverages: [savedBeverages[22]._id],
      picture: ['https://www.1883.com/app/uploads/2021/11/1883-lime-cordial-juice_sc-1.webp']
    },

  {
    name: 'Iced Tea Peach Syrup',
    description: 'Peach-flavored iced tea syrup scent of summer fruit distilling fine notes of candied peaches, Peach .',
    price: 6,
    category: 'Syrup',
    photos: ['https://www.1883.com/app/uploads/2021/05/sirop_the-peche-1883_ps.webp'],
    bg: ['https://www.1883.com/app/uploads/2021/05/sirop_the-peche-1883_bg-1.webp'],
    recipes: [
      // Peach Iced Tea
      savedRecipes[31]._id,
      // Peach Lemon Fizz
      savedRecipes[32]._id
    ],
    beverages: [savedBeverages[15]._id, savedBeverages[16]._id],
    picture: ['https://www.1883.com/app/uploads/2021/05/1883-peach_syrup_sc.webp']
  },
  {
    name: 'Iced Tea Mango Syrup',
    description: 'Mango-flavored iced tea syrup With an intense fruity aroma of fresh ripe mangoes, Mango syrup has an intense.',
    price: 6,
    category: 'Syrup',
    photos: ['https://www.1883.com/app/uploads/2021/05/sirop_the-mangue-1883_ps.webp'],
    bg: ['https://www.1883.com/app/uploads/2021/05/sirop_the-mangue-1883_bg-1.webp'],
    recipes: [
      // Mango Iced Tea
      savedRecipes[33]._id,
      // Mango Lemonade
      savedRecipes[34]._id
    ],
    beverages: [savedBeverages[17]._id],
    picture: ['https://www.1883.com/app/uploads/2021/12/1883_mixers-ginger-ale-syrup_sc.webp']
  },
  {
    name: 'Iced Tea Raspberry Syrup',
    description: 'Raspberry-flavored iced tea syrup With its aromas of ripe and juicy raspberries, flowers and black tea, Raspberry .',
    price: 6,
    category: 'Syrup',
    photos: ['https://www.1883.com/app/uploads/2021/05/sirop_the-framboise-1883_ps.webp'],
    bg: ['https://www.1883.com/app/uploads/2021/05/sirop_the-framboise-1883_bg-1.webp'],
    recipes: [
      // Raspberry Iced Tea
      savedRecipes[35]._id,
      // Raspberry Lemon Sparkler
      savedRecipes[36]._id
    ],
    beverages: [savedBeverages[8]._id, savedBeverages[9]._id],
    picture: ['https://www.1883.com/app/uploads/2021/06/1883-hazelnut_syrup_sc.webp']
  }
];

  await Product.insertMany(products);

  // Sample Reviews for Recipes and Beverages
  const reviews = [
    { userId: user1._id, recipeId: savedRecipes[0]._id, baristaId: barista1._id, rating: 5},
    { userId: user2._id, recipeId: savedRecipes[1]._id, baristaId: barista2._id, rating: 4 },
    { userId: user1._id, recipeId: savedRecipes[2]._id, baristaId: barista1._id, rating: 5},
    { userId: user2._id, beverageId: savedBeverages[0]._id, baristaId: barista1._id, rating: 5 },
    { userId: user1._id, beverageId: savedBeverages[4]._id, baristaId: barista2._id, rating: 4 }
  ];

  await Review.insertMany(reviews);

  // Sample Orders
  const orders = [
    { userId: user1._id, baristaId: barista1._id, beverageId: savedBeverages[0]._id, quantity: 2, totalPrice: 10, deliveryAddress: '123 Coffee St.' },
    { userId: user2._id, baristaId: barista2._id, beverageId: savedBeverages[1]._id, quantity: 1, totalPrice: 6, deliveryAddress: '456 Tea Ave.' }
  ];

  await Order.insertMany(orders);

  console.log("Sample data created.");
};

const seedDatabase = async () => {
  await clearData();
  await createSampleData();
  mongoose.connection.close();
};

seedDatabase();