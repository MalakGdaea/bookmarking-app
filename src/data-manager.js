import { SERVER_ROUTE } from "./config";
const DataManager = function () {

  const addTab = (tabName, setTabs) => {
    fetch(`${SERVER_ROUTE}tabs/${tabName}`, { method: "POST" }).then(() => {
      updateTabsData(setTabs);
    });
  };

  const addCategory = (name, tabID, setCategories) => {
    fetch(`${SERVER_ROUTE}categories/${tabID}/${name}`, {
      method: "POST",
    }).then(() => {
      updateCategories(tabID, setCategories);
    });
  };

  const addBookmark = (bookmark, tabID, setCategories) => {
    fetch(`${SERVER_ROUTE}bookmarks`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(bookmark),
    }).then(() => {
      updateCategories(tabID, setCategories);
    });
  };

  const deleteTab = (tabName, setTabs) => {
    fetch(`${SERVER_ROUTE}tabs/${tabName}`, {
      method: "DELETE",
    }).then(() => {
      updateTabsData(setTabs);
    });
  };

  const deleteCategory = (categoryID, tabID, setCategories) => {
    fetch(`${SERVER_ROUTE}categories/${categoryID}`, {
      method: "DELETE",
    }).then(() => {
      updateCategories(tabID, setCategories);
    });
  };

  const updateTabsData = (setTabs) => {
    fetch(`${SERVER_ROUTE}tabs`)
      .then((response) => {
        return response.json();
      })
      .then((tabs) => {
        setTabs(tabs);
      });
  };

  const updateCategories = (tabID, setCategories) => {
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
    addTab,
    updateTabsData,
    deleteTab
  };
};

export default DataManager;
