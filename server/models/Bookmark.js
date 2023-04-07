const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
  title: String,
  URL: String,
  category: { type: Schema.Types.ObjectId, ref: "category" },
  tags: [String],
  note: String,
});

const Bookmark = mongoose.model("bookmark", bookmarkSchema);

module.exports = Bookmark;
