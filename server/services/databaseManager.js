const { CONNECTION_LINK } = require("../config");
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(CONNECTION_LINK);
};

const getIdObject = (id) => {
  return new mongoose.Types.ObjectId(id);
}

module.exports = {connect, getIdObject};
