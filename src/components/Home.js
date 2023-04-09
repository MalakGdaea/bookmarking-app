import { useParams } from "react-router-dom";
import Form from "./ActionsBar/Form";
import { useEffect, useState } from "react";
import CategoriesList from "./Bookmarks/CategoriesList";
import BookmarkForm from "./Bookmarks/BookmarkForm";
import DataManager from "../data-manager";

function Home({ isShown, sectionName, hideForm, addTab, deleteTab }) {
  const { tabID } = useParams();
  const [categories, setCategories] = useState([]);
  const [editedCategoryID, setEditedCategoryID] = useState("");
  const [displayBookmarkForm, setDisplayBookmarkForm] = useState(false);
  const dataManager = DataManager();

  const showBookmarkForm = () => {
    setDisplayBookmarkForm(true);
  };

  const hideBookmarkForm = () => {
    setDisplayBookmarkForm(false);
  };

  useEffect(() => {
    dataManager.updateCategories(tabID, setCategories);
  }, [tabID]);

  return (
    <div>
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
        categories={categories}
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
