import "./Category.css";
import Bookmark from "./Bookmark";
import OptionsList from "./OptionsList";
import { useState } from "react";
function Category({ category, setEditedCategoryID, showBookmarkForm, deleteCategory }) {
  const [isOptionListShown, setIsOptionListShown] = useState(false);
  const [isBookmarksDisplayed, serIsBookmarksDisplayed] = useState(true);
  const toggleOptionsList = () => {
    setIsOptionListShown(!isOptionListShown);
  };

  const toggleBookmarks = () => {
    serIsBookmarksDisplayed(!isBookmarksDisplayed);
  }

  return (
    <div className="category-container">
      <div className="categoryName">{category.categoryInfo.name}
        <i className="material-icons settings" onClick={toggleOptionsList}>settings</i>
        <i className="material-icons arrow" onClick={toggleBookmarks}>{isBookmarksDisplayed ? "keyboard_arrow_down" : "keyboard_arrow_up"} </i>
      </div>
      {isOptionListShown && (
        <OptionsList category={category} setEditedCategoryID={setEditedCategoryID}
          showBookmarkForm={showBookmarkForm} deleteCategory={deleteCategory}
          setIsOptionListShown={setIsOptionListShown} />
      )}
      {isBookmarksDisplayed &&
        <div className="bookmarks">
          {category.bookmarks.map((bookmark) => {
            return <Bookmark key={bookmark._id} bookmark={bookmark} />;
          })}
        </div>}
    </div>
  );
}

export default Category;
