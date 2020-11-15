const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("activity", schema);
