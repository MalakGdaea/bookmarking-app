const express = require("express");
const { PORT } = require("./server/config");
const app = express();
const bookmarkAPI = require("./server/routes/bookmarkAPI");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// used only in development mode
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

app.use("/", bookmarkAPI);


app.listen(PORT, function () {
  console.log(`Running server on port ${PORT}`);
});
