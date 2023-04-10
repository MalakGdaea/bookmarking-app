import "./ActionsBar.css";
import { ADD_TAB, ADD_Category, DELETE_TAB } from "../../config";
function ActionsBar({ showForm }) {
  return (
    <div>
      <div className="adding-buttons">
        <div className="action" onClick={() => showForm(ADD_Category)}>
          Add Category
        </div>
        <div className="action" onClick={() => showForm(ADD_TAB)}>
          Add Tab
        </div>
        <div className="action" onClick={() => showForm(DELETE_TAB)}>
          delete tab
        </div>
      </div>
    </div>
  );
}

export default ActionsBar;
