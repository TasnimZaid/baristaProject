const BaristaRequest = require("../model/baristasAuth");

exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequest = await BaristaRequest.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json({ message: "Request soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting request" });
  }
};
exports.getRequests = async (req, res) => {
  try {
    const { status, page = 1 } = req.query;
    const limit = 7; // عدد العناصر في كل صفحة
    const skip = (page - 1) * limit;

    // بناء الاستعلام بناءً على الحالة والصفحة
    const query = {};
    if (status) {
      query.applicationStatus = status;
    }

    const profile = await BaristaRequest.find(query)
      .populate("baristaId", "username email")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalItems = await BaristaRequest.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ profile, totalPages });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.toggleRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationStatus } = req.body;

    const request = await BaristaRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // تحديث حالة الطلب بناءً على الحالة الجديدة
    request.applicationStatus = applicationStatus;

    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Error toggling request status" });
  }
};
