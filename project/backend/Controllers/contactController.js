const Contact = require("../model/Contact");

exports.createContact = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Create a new contact
    const contact = new Contact({
      username,
      email,
      message,
    });

    // Save the contact to the database
    await contact.save();

    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact information saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving contact information",
      error: error.message,
    });
  }
};


exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contact messages",
      error: error.message,
    });
  }
};

