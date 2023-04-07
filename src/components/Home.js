import { useParams } from "react-router-dom";
import Form from "./ActionsBar/Form";
import { useEffect, useState } from "react";
import CategoriesList from "./Bookmarks/CategoriesList";
import BookmarkForm from "./Bookmarks/BookmarkForm";
import DataManager from "../data-manager";

function Home({ isShown, sectionName, hideForm, addTab }) {
  const { tabID } = useParams();
  const [categories, setCategories] = useState([]);
  const [editedCategoryID, setEditedCategoryID] = useState("");
  const [displayBookmarkForm, setDisplayBookmarkForm] = useState(false);
  const dataManager = DataManager(tabID, setCategories);

  const showBookmarkForm = () => {
    setDisplayBookmarkForm(true);
  };

  const hideBookmarkForm = () => {
    setDisplayBookmarkForm(false);
  };

  useEffect(() => {
    dataManager.updateCategories();
  }, [tabID]);

  return (
    <div>
      {isShown && (
        <Form
          formName={sectionName}
          hideForm={hideForm}
          addTab={addTab}
          addCategory={dataManager.addCategory}
        />
      )}
      <CategoriesList
        categories={categories}
        setEditedCategoryID={setEditedCategoryID}
        showBookmarkForm={showBookmarkForm}
        deleteCategory={dataManager.deleteCategory}
      />
      {displayBookmarkForm && (
        <BookmarkForm
          categoryID={editedCategoryID}
          addBookmark={dataManager.addBookmark}
          hideBookmarkForm={hideBookmarkForm}
        />
      )}
    </div>
  );
}

export default Home;
