const express = require("express");
const router = express.Router();
const { connectToBookmarkDB, getIdObject} = require("../services/databaseManager");
connectToBookmarkDB();
const databaseQueries = require("../services/databaseQueries");

router.get("/tabs", async function (req, res) {
  try {
    const tabs = await databaseQueries.getTabs();
    res.send(tabs);
  } catch (error) {
    res.send(error);
  }
});

router.get("/bookmarks", async function (req, res) {
  try {
    const bookmarks = await databaseQueries.getBookmarks()
    res.send(bookmarks);
  } catch (error) {
    res.send(error);
  }
});

router.get("/categories/:tabID", async function (req, res) {
  let tabID = getIdObject(req.params.tabID);
  try {
    const categoriesInTab = await databaseQueries.getCategoriesInTab(tabID);
    let categoriesAndTabs = categoriesInTab.map(async (category) => {
      let bookmarks = await databaseQueries.getBookmarksInCategory(category._id);
      return {
        categoryInfo: category,
        bookmarks: bookmarks,
      };
    })
    Promise.all(categoriesAndTabs).then((bookmarks) => res.send(bookmarks));
  } catch (error) {
    res.send(error);
  }
});

router.post("/tabs/:tabName", async function (req, res) {
  let tabName = req.params.tabName;
  try {
    let tab = await databaseQueries.getTabByName(tabName);
    if (tab) {
      res.status(409).send({ msg: `The tab ${tabName} already exist.` });
    } else {
      let tab = databaseQueries.createTab(tabName);
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
    let tabID = databaseQueries.getIdObject(req.params.tabID);
    let categoryExisted = await databaseQueries.categoryIsExisted();
    if (categoryExisted) {
      res.status(409).send({ msg: `The category ${categoryName} is already exist` });
    } else {
      let category = databaseQueries.createCategory(tabID, categoryName);
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
  let isExistedBookmark = await databaseQueries.IsExistedBookmark(bookmark.URL);
  if (isExistedBookmark) {
    res.status(409).send({ msg: `This bookmark is already exist` });
  } else {
    try {
      let [title, URL, category, tags, note] = [bookmark.title, bookmark.URL, getIdObject(bookmark.category), bookmark.tags]
      let bookmarkDocument = databaseQueries.createBookmark(title, URL, category, tags, note);
      bookmarkDocument.save();
      res.status(201).send({ msg: `one bookmark added successfully` });
    } catch (error) {
      res.send(error);
    }
  }
});

router.delete("/tabs/:tabName", async function (req, res) {
  let tabName = req.params.tabName;
  try {
    let deletedTab = await databaseQueries.deleteTab(tabName);
    if (deletedTab) {
      await databaseQueries.deleteTabCategories(deletedTab._id);
      await databaseQueries.deleteBookmarksWithDeletedCategory();
      res.status(202).send({ msg: `The tab ${tabName} deleted successfully.` });
    } else {
      res.send({ msg: `There are no tab with the name ${tabName}.` });
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/bookmarks/:id", async function (req, res) {
  try {
    let bookmarkID = getIdObject(req.params.id);
    await databaseQueries.deleteBookmark(bookmarkID);
    res.status(202).send({ msg: `one bookmark deleted successfully.` });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/categories/:categoryID", async function (req, res) {
  let categoryID = getIdObject(req.params.categoryID);
  try {
    let deletedCategory = await databaseQueries.deleteCategory(categoryID);
    res.status(202).send({ msg: `Category ${deletedCategory.name} deleted successfully.` });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
