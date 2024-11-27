const Recipe = require("./../model/recipes");
const path = require("path");
const fs = require("fs");
const Product = require("../model/products");
const mongoose = require("mongoose");

exports.createRecipe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      name,
      cookingTime,
      categories,
      dietaryRestrictions,
      preparationSteps,
      ingredients,
      syrups,
    } = req.body;

    const imagePath =
      req.files && req.files["image"] ? req.files["image"][0].path : null;

    const background =
      req.files && req.files["background"]
        ? req.files["background"][0].path
        : null;

    const parsedPreparation = preparationSteps
      ? JSON.parse(preparationSteps)
      : [];
    const parsedIngredients = ingredients ? JSON.parse(ingredients) : [];
    const syrupIds = syrups ? JSON.parse(syrups) : [];

    const newRecipe = new Recipe({
      baristaId: req.user,
      name,
      cookingTime,
      categories,
      dietaryRestrictions,
      preparation: parsedPreparation,
      ingredients: parsedIngredients,
      photos: imagePath,
      bg: background,
      products: syrupIds,
    });

    const savedRecipe = await newRecipe.save();
    console.log("Saved Recipe:", savedRecipe);

    if (syrupIds.length > 0) {
      await Product.updateMany(
        { _id: { $in: syrupIds } },
        { $addToSet: { recipes: savedRecipe._id } }
      );
    }

    res.status(201).json({
      message: "Recipe created and associated with products successfully",
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error("Error creating Recipe:", error);
    res.status(500).json({ error: error.message });
  }
};
// -------------------------------------
exports.getAllRecipes = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const baristaId = req.user;

    const recipes = await Recipe.find({ baristaId: baristaId }).populate(
      "products"
    );

    const recipesWithProducts = await Promise.all(
      recipes.map(async (recipe) => {
        const products = await Product.find({ recipes: baristaId });
        return {
          ...recipe._doc, // نسخ معلومات الوصفة
          associatedProducts: products, // إضافة المنتجات المرتبطة
        };
      })
    );

    res.status(200).json(recipesWithProducts);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const oldRecipe = await Recipe.findById(id);
    if (!oldRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Handle file upload if a new image or background is provided
    if (req.files) {
      // Delete old image if a new image is provided
      if (req.files["image"]) {
        if (oldRecipe.photos) {
          const photoPaths = Array.isArray(oldRecipe.photos)
            ? oldRecipe.photos
            : [oldRecipe.photos];
          photoPaths.forEach((photo) => {
            fs.unlink(path.join(__dirname, "..", photo), (err) => {
              if (err) console.error("Error deleting old image:", err);
            });
          });
        }
        updateData.photos = req.files["image"][0].path;
      }

      // Delete old background if a new background is provided
      if (req.files["background"]) {
        if (oldRecipe.bg) {
          fs.unlink(path.join(__dirname, "..", oldRecipe.bg), (err) => {
            if (err) console.error("Error deleting old background:", err);
          });
        }
        updateData.bg = req.files["background"][0].path;
      }
    }

    if (typeof updateData.products === "string") {
      updateData.products = JSON.parse(updateData.products);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    await Product.updateMany({ recipes: id }, { $pull: { recipes: id } });

    if (updateData.products && updateData.products.length > 0) {
      await Product.updateMany(
        { _id: { $in: updateData.products } },
        { $addToSet: { recipes: id } }
      );
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating Recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Remove reference from products
    await Product.updateMany({ recipes: id }, { $pull: { recipes: id } });

    // Optionally delete the images associated with the recipe
    if (deletedRecipe.photos) {
      const photoPaths = Array.isArray(deletedRecipe.photos)
        ? deletedRecipe.photos
        : [deletedRecipe.photos];
      photoPaths.forEach((photo) => {
        fs.unlink(path.join(__dirname, "..", photo), (err) => {
          if (err) console.error("Error deleting image:", err);
        });
      });
    }

    if (deletedRecipe.bg) {
      fs.unlink(path.join(__dirname, "..", deletedRecipe.bg), (err) => {
        if (err) console.error("Error deleting background image:", err);
      });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting Recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
