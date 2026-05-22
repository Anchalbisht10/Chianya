const mongoose = require("mongoose");

const FutureLetterSchema = new mongoose.Schema({
  email:      { type: String, required: true },
  letter:     { type: String, required: true, maxlength: 2000 },
  deliverOn:  { type: Date, required: true },
  delivered:  { type: Boolean, default: false },
  createdAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model("FutureLetter", FutureLetterSchema);