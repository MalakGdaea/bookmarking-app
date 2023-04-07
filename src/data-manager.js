import { SERVER_ROUTE } from "./config";
const DataManager = function (tabID, setCategories) {
  const addCategory = (name) => {
    fetch(`${SERVER_ROUTE}categories/${tabID}/${name}`, {
      method: "POST",
    }).then(() => {
      updateCategories();
    });
  };

  const addBookmark = (bookmark) => {
    fetch(`${SERVER_ROUTE}bookmarks`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(bookmark),
    }).then(() => {
      updateCategories();
    });
  };

  const deleteCategory = (categoryID) => {
    fetch(`${SERVER_ROUTE}categories/${categoryID}`, {
      method: "DELETE",
    }).then(() => {
      updateCategories();
    });
  };

  const updateCategories = () => {
    fetch(`${SERVER_ROUTE}categories/${tabID}`)
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        setCategories(categories);
      });
  };

  return {
    addCategory,
    addBookmark,
    deleteCategory,
    updateCategories,
  };
};

export default DataManager;
