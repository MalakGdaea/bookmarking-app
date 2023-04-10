import "./Home.css";
import Form from "../ActionsBar/Form";
import { useEffect, useState } from "react";
import CategoriesList from "../Bookmarks/CategoriesList";
import BookmarkForm from "../Bookmarks/BookmarkForm";
import DataManager from "../../data-manager";

function Home({ tabID, isShown, sectionName, hideForm, addTab, deleteTab }) {
  const [categories, setCategories] = useState([]);
  const [editedCategoryID, setEditedCategoryID] = useState("");
  const [displayBookmarkForm, setDisplayBookmarkForm] = useState(false);
  const [searchedCategory, setSearchedCategory] = useState("");
  const dataManager = DataManager();

  const showBookmarkForm = () => {
    setDisplayBookmarkForm(true);
  };

  const hideBookmarkForm = () => {
    setDisplayBookmarkForm(false);
  };

  const updateSearchedCategory = (event) => {
    setSearchedCategory(event.target.value);
  };

  let wantedCategories = categories.filter((category) =>
    category.categoryInfo.name.toLowerCase().includes(searchedCategory.toLowerCase())
  );

  useEffect(() => {
    dataManager.updateCategories(tabID, setCategories);
  }, [tabID]);

  return (
    <div>
      <input
        className="category-input search-input"
        type="text"
        value={searchedCategory}
        placeholder="Find Category"
        onChange={updateSearchedCategory}
      />
      {isShown && (
        <Form
          formName={sectionName}
          hideForm={hideForm}
          addTab={addTab}
          addCategory={(name) =>
            dataManager.addCategory(name, tabID, setCategories)
          }
          deleteTab={deleteTab}
        />
      )}
      <CategoriesList
        categories={wantedCategories}
        setEditedCategoryID={setEditedCategoryID}
        showBookmarkForm={showBookmarkForm}
        deleteCategory={(categoryID) =>
          dataManager.deleteCategory(categoryID, tabID, setCategories)
        }
      />
      {displayBookmarkForm && (
        <BookmarkForm
          categoryID={editedCategoryID}
          addBookmark={(bookmark) =>
            dataManager.addBookmark(bookmark, tabID, setCategories)
          }
          hideBookmarkForm={hideBookmarkForm}
        />
      )}
    </div>
  );
}

export default Home;
