const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName:    { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  joinedDate:   { type: Date, default: Date.now },
  resetToken:   { type: String, default: null },
  resetExpires: { type: Date,   default: null },
}, { timestamps: true });

UserSchema.pre("save", async function() {
  if (!this.isModified("passwordHash")) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});
UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

// Never return passwordHash in responses
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.resetToken;
  delete obj.resetExpires;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);