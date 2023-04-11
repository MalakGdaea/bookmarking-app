const Bookmark = require("../models/Bookmark");
const Tab = require("../models/Tab");
const Category = require("../models/Category");

function getTabs() {
  return Tab.find({});
}

function getBookmarks() {
  return Bookmark.find({});
}

function getCategoriesInTab(tabID) {
  return Category.find({ tab: tabID })
}

function getBookmarksInCategory(categoryID) {
  return Bookmark.find({ category: categoryID })
}

function getTabByName(tabName) {
  return Tab.findOne({ name: tabName });
}


function createTab(tabName) {
  return new Tab({ name: tabName });
}

function createCategory(tabID, categoryName) {
  return new Category({ name: categoryName, tab: tabID });
}

function createBookmark(title, URL, category, tags, note) {
  return new Bookmark({
    title: title,
    URL: URL,
    category: category,
    tags: tags || tags.split(","),
    note: note,
  })
}

async function categoryIsExisted(tabID, categoryName) {
  const category = await Category.findOne({ $and: [{ name: categoryName }, { tab: tabID }] });
  if (category) {
    return true;
  }
  return false;
}

async function IsExistedBookmark(URL) {
  let bookmark = await Bookmark.findOne({ URL: URL });
  if (bookmark) {
    return true;
  }
  return false
}

function deleteBookmark(bookmarkID) {
  return Bookmark.findByIdAndDelete(bookmarkID)
}

function deleteTab(tabName) {
  return Tab.findOneAndDelete({ name: tabName });
}

function deleteCategory(categoryID) {
  return Category.findOneAndDelete({ _id: categoryID });
}

function deleteTabCategories(tabID) {
  return Category.deleteMany({ tab: tabID });
}

async function deleteBookmarksWithDeletedCategory() {
  let bookmarks = await Bookmark.find({});
  bookmarks.forEach(async (bookmark) => {
    let category = await Category.findOne({ _id: bookmark.category });
    if (!category) {
      Bookmark.deleteOne({ _id: bookmark._id }).then(() => {
        return true;
      });
    }
  });
}


module.exports = {
  getTabs, getBookmarks, getCategoriesInTab, getBookmarksInCategory, getTabByName
  , createTab, categoryIsExisted, createCategory, IsExistedBookmark, createBookmark
  , deleteBookmark, deleteTab, deleteTabCategories, deleteBookmarksWithDeletedCategory, deleteCategory
};
