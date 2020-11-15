const mongoose = require("mongoose");
module.exports = {
  init() {
    try {
      mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.log("MongoDB init  : ", error);
    }
  },
};
