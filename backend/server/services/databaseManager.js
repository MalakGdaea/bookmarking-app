const { CONNECTION_LINK_BOOKMARK } = require("../config");
const mongoose = require("mongoose");

const connectToBookmarkDB = () => {
  mongoose.connect(CONNECTION_LINK_BOOKMARK);
};

const getIdObject = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = { connectToBookmarkDB, getIdObject };
