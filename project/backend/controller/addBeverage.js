const Beverage = require("../model/beverages");
const syrups = require("../model/products");
const Product = require("../model/products");
const path = require("path");
const fs = require("fs");

exports.createBeverage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, description, price, category, quantityAvailable, syrups } =
      req.body;

    const imagePath =
      req.files && req.files["image"] ? req.files["image"][0].path : null;

    const syrupIds = syrups ? JSON.parse(syrups) : [];

     const newBeverage = new Beverage({
      baristaId: req.user,
      name,
      description,
      price,
      category,
      photos: imagePath,
      quantityAvailable,
      products: syrupIds,
    });

    const savedBeverage = await newBeverage.save();
    console.log("Saved Beverage:", savedBeverage);

    if (syrupIds.length > 0) {
      await Product.updateMany(
        { _id: { $in: syrupIds } }, 
        { $addToSet: { beverages: savedBeverage._id } } 
      );
    }

    res.status(201).json({
      message: "Beverage created and associated with products successfully",
      beverage: savedBeverage,
    });
  } catch (error) {
    console.error("Error creating Beverage:", error);
    res.status(500).json({ error: error.message });
  }
};

// -------------------
exports.AllSyrups = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const syrup = await syrups.find();
    res.status(200).json(syrup);
  } catch (error) {
    console.error("Error fetching syrups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// -----------------------------------
exports.getAllBeverages = async (req, res) => {
  try {
    // تحقق من وجود المستخدم
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const baristaId = req.user;

    // جلب جميع المشروبات التي تخص baristaId الحالي مع المنتجات المرتبطة (مثل syrups)
    const beverages = await Beverage.find({ baristaId: baristaId }).populate('products');

    // معالجة المشروبات لإضافة المنتجات المرتبطة بها (مثل syrups)
    const beveragesWithProducts = await Promise.all(
      beverages.map(async (beverage) => {
        const products = await Product.find({ beverages: baristaId });
        return {
          ...beverage._doc, // نسخ معلومات المشروب
          associatedProducts: products // إضافة المنتجات المرتبطة (مثل syrups)
        };
      })
    );
    
    // إرجاع المشروبات في استجابة JSON
    res.status(200).json(beveragesWithProducts);
  } catch (error) {
    console.error("Error fetching beverages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//------------------------------------------------- Update a beverage
exports.updateBeverage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      const oldBeverage = await Beverage.findById(id);
      if (oldBeverage.photos) {
        const photoPaths = Array.isArray(oldBeverage.photos) ? oldBeverage.photos : [oldBeverage.photos];
        photoPaths.forEach(photo => {
          fs.unlink(path.join(__dirname, "..", photo), (err) => {
            if (err) console.error("Error deleting old image:", err);
          });
        });
      }
      updateData.photos = req.file.path;
    }

    if (typeof updateData.products === 'string') {
      updateData.products = JSON.parse(updateData.products);
    }

    const updatedBeverage = await Beverage.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBeverage) {
      return res.status(404).json({ error: "Beverage not found" });
    }

    await Product.updateMany(
      { beverages: id },
      { $pull: { beverages: id } }
    );

    if (updateData.products && updateData.products.length > 0) {
      await Product.updateMany(
        { _id: { $in: updateData.products } },
        { $addToSet: { beverages: id } }
      );
    }

    res.status(200).json(updatedBeverage);
  } catch (error) {
    console.error("Error updating Beverage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// ------------------------------------------------------Delete a beverage
exports.deleteBeverage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBeverage = await Beverage.findByIdAndDelete(id);

    if (!deletedBeverage) {
      return res.status(404).json({ error: "Beverage not found" });
    }

    // Remove reference from syrups
    await Product.updateMany(
      { beverages: id },
      { $pull: { beverages: id } }
    );

    // Optionally delete the image associated with the beverage
    if (deletedBeverage.photos) {
      fs.unlink(path.join(__dirname, "..", deletedBeverage.photos), (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      });
    }

    res.status(200).json({ message: "Beverage deleted successfully" });
  } catch (error) {
    console.error("Error deleting Beverage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ----------------------------------Fetch all syrups (already implemented)
exports.AllSyrups = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const syrup = await Product.find();
    res.status(200).json(syrup);
  } catch (error) {
    console.error("Error fetching syrups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
