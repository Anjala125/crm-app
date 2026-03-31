const Customer = require("../models/customer.js");

// GET all customers
exports.getCustomers = async (req, res) => {
  try {
    const data = await Customer.find();
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Error fetching data" });
  }
};

// ADD customer
exports.addCustomer = async (req, res) => {
  try {
    const data = await Customer.create(req.body);
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Error adding data" });
  }
};

// UPDATE customer
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Error updating data" });
  }
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch {
    res.status(500).json({ msg: "Error deleting data" });
  }
};