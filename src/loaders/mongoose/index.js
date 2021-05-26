const mongoose = require("mongoose");
const { databaseURL } = require("../../config");

module.exports = async () => {
  await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
