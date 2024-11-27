// const Barista = require("../model/baristas");



// exports.getBaristas = async (req, res) => {
//   try {
//     const baristas = await Barista.find(); // استرجاع جميع الباريستا
//     res.json(baristas);
//   } catch (error) {
//     console.error("Error fetching baristas:", error); // تسجيل الخطأ
//     res.status(500).json({ message: "Error fetching baristas" });
//   }
// };
const Barista = require("../model/baristas");
const Recipe = require("../model/recipes");
const Beverage = require("../model/beverages");
const Order = require("../model/orders");
// exports.getBaristas = async (req, res) => {
//   try {
//     const baristas = await Barista.find({
//       isDeleted: false,
//       isApproved: true,
//     }).select("-password");
//     res.json(baristas);
//   } catch (error) {
//     console.error("Error fetching baristas:", error);
//     res.status(500).json({ message: "Error fetching baristas" });
//   }
// };

exports.getBaristas = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 5 } = req.query;
    const filter = { isDeleted: false, isApproved: true };

    if (status) {
      filter.isActive = status === 'active'; // status should be 'active' or 'inactive'
    }

    const regex = new RegExp(search, 'i'); // case-insensitive search
    const baristas = await Barista.find(filter)
      .where({ $or: [{ username: regex }, { email: regex }] })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-password');

    const total = await Barista.countDocuments(filter).where({ $or: [{ username: regex }, { email: regex }] });

    res.json({
      baristas,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error("Error fetching baristas:", error);
    res.status(500).json({ message: "Error fetching baristas" });
  }
};


exports.getBaristastats = async (req, res) => {
  try {
    const baristas = await Barista.aggregate([
      {
        $match: { isDeleted: false, isApproved: true }, // Optional: Filter active and approved baristas
      },
      {
        $lookup: {
          from: "recipes", // Correct collection name
          localField: "_id",
          foreignField: "baristaId",
          as: "recipes",
        },
      },
      {
        $lookup: {
          from: "beverages", // Correct collection name
          localField: "_id",
          foreignField: "baristaId",
          as: "beverages",
        },
      },
      {
        $lookup: {
          from: "orders", // Correct collection name
          localField: "_id",
          foreignField: "baristaId",
          as: "orders",
        },
      },
      {
        $project: {
          username: 1,
          email: 1,
          profilePic: 1,
          isApproved: 1,
          recipeCount: { $size: "$recipes" },
          beverageCount: { $size: "$beverages" },
          orderCount: { $size: "$orders" },
        },
      },
    ]);

    res.json(baristas);
  } catch (error) {
    console.error("Error fetching barista stats:", error);
    res.status(500).json({ message: "Error fetching barista stats" });
  }
};

exports.toggleBaristaStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const barista = await Barista.findById(id);
    if (!barista) {
      return res.status(404).json({ message: "User not found" });
    }
    barista.isActive = !barista.isActive;
    await barista.save();
    res.json(barista);
  } catch (error) {
    res.status(500).json({ message: "Error toggling barista status" });
  }
};

exports.deleteBarista = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBarista = await Barista.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedBarista) {
      return res.status(404).json({ message: "Barista not found" });
    }
    res.json({ message: "Barista soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting Barista" });
  }
};