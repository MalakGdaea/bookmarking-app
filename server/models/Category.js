const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  tab: { type: Schema.Types.ObjectId, ref: "tab" },
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
