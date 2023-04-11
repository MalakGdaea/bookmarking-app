const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TabSchema = new Schema({
  name: String,
});

const Tab = mongoose.model("tab", TabSchema);

module.exports = Tab;
