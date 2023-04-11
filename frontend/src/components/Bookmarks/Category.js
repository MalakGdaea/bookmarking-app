import "./Category.css";
import Bookmark from "./Bookmark";
import OptionsList from "./OptionsList";
import { useState } from "react";
function Category({ category, setEditedCategoryID, showBookmarkForm, deleteCategory }) {
  const [isOptionListShown, setIsOptionListShown] = useState(false);
  const toggleOptionsList = () => {
    setIsOptionListShown(!isOptionListShown);
  };

  return (
    <div className="category-container">
      <div className="categoryName">{category.categoryInfo.name}
        <i className="material-icons icon" onClick={toggleOptionsList}>settings</i>
      </div>
      {isOptionListShown && (
        <OptionsList category={category} setEditedCategoryID={setEditedCategoryID}
          showBookmarkForm={showBookmarkForm} deleteCategory={deleteCategory}
          setIsOptionListShown={setIsOptionListShown} />
      )}
      <div className="bookmarks">
        {category.bookmarks.map((bookmark) => {
          return <Bookmark key={bookmark._id} bookmark={bookmark} />;
        })}
      </div>
    </div>
  );
}

export default Category;
