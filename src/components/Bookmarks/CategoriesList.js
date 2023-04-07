import "./CategoriesList.css";
import Category from "./Category";
function CategoriesList({ categories, setEditedCategoryID, showBookmarkForm,deleteCategory }) {
  return (
    <div className="categories-list">
      {categories.map((category) => (
        <Category
          key={category.categoryInfo._id}
          category={category}
          setEditedCategoryID={setEditedCategoryID}
          showBookmarkForm={showBookmarkForm}
          deleteCategory={deleteCategory}
        />
      ))}
    </div>
  );
}
export default CategoriesList;
