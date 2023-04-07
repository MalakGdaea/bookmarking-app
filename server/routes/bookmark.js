const express = require("express");
const router = express.Router();
const { connect, getIdObject } = require("../services/databaseManager");
const Bookmark = require("../models/Bookmark");
const Tab = require("../models/Tab");
const Category = require("../models/Category");
connect();

router.get("/bookmarks", function (req, res) {
  try {
    Bookmark.find({}).then((bookmarks) => {
      res.send(bookmarks);
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/tabs", function (req, res) {
  try {
    Tab.find({}).then((tabs) => res.send(tabs));
  } catch (error) {
    res.send(error);
  }
});

router.get("/categories/:tabID", function (req, res) {
  let tabID = getIdObject(req.params.tabID);
  try {
    Category.find({ tab: tabID }).then((categories) => {
      let bookmarksByCategory = categories.map(async (category) => {
        let bookmarks = await Bookmark.find({ category: category._id });
        return {
          categoryInfo: category,
          bookmarks: bookmarks,
        };
      });
      Promise.all(bookmarksByCategory).then((bookmarks) => res.send(bookmarks));
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/tabs/:tabName", async function (req, res) {
  let tabName = req.params.tabName;
  try {
    let tab = await Tab.findOne({ name: tabName });
    if (tab) {
      res.status(409).send({ msg: `The tab ${tabName} is already exist.` });
    } else {
      let tab = new Tab({ name: tabName });
      tab.save();
      res.status(201).send({ msg: `The tab ${tabName} added successfully.` });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/categories/:tabID/:categoryName", async function (req, res) {
  let categoryName = req.params.categoryName;
  try {
    let tabID = getIdObject(req.params.tabID);
    let category = await Category.findOne({
      $and: [{ name: categoryName }, { tab: tabID }],
    });
    if (category) {
      res
        .status(409)
        .send({ msg: `The category ${categoryName} is already exist` });
    } else {
      category = new Category({ name: categoryName, tab: tabID });
      category.save();
      res.status(201).send({
        msg: `The category ${categoryName} added successfully.`,
      });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/bookmarks", async function (req, res) {
  let bookmark = req.body;
  let bookmarkInDB = await Bookmark.findOne({ URL: bookmark.URL });
  if (bookmarkInDB) {
    res.status(409).send({ msg: `This bookmark is already exist` });
  } else {
    try {
      let bookmarkDocument = new Bookmark({
        title: bookmark.title,
        URL: bookmark.URL,
        category: getIdObject(bookmark.category),
        tags: bookmark.tags || bookmark.tags.split(","),
        note: bookmark.note,
      });
      bookmarkDocument.save();
      res.status(201).send({ msg: `one bookmark added successfully` });
    } catch (error) {
      res.send(error);
    }
  }
});

router.delete("/bookmarks/:id", async function (req, res) {
  try {
    Bookmark.findByIdAndDelete(req.params.id).then(() => {
      res.status(202).send({ msg: `one bookmark deleted successfully.` });
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/categories/:categoryID", function (req, res) {
  let categoryID = getIdObject(req.params.categoryID);
  try {
    Category.findOneAndDelete({ _id: categoryID }).then((category) => {
      Bookmark.deleteMany({ category: categoryID }).then(() => {
        res
          .status(202)
          .send({ msg: `Category ${category.name} deleted successfully.` });
      });
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
