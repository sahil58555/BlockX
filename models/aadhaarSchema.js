const mongoose = require("mongoose");

const aadhaarSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  account: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Aadhaar = mongoose.model("Aadhaar", aadhaarSchema);

module.exports = Aadhaar;
