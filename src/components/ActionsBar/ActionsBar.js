import "./ActionsBar.css";
function ActionsBar({showForm}) {
  return (
    <div>
      <div className="adding-buttons">
        <div className="add" onClick={() => showForm("Category")}>Add Category</div>
        <div className="add" onClick={() => showForm("Tab")}>Add Tab</div>
      </div>
    </div>
  );
}

export default ActionsBar;
