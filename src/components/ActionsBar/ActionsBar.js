import "./ActionsBar.css";
function ActionsBar({showForm}) {
  return (
    <div>
      <div className="adding-buttons">
        <div className="action" onClick={() => showForm("Add Category")}>Add Category</div>
        <div className="action" onClick={() => showForm("Add Tab")}>Add Tab</div>
        <div className="action" onClick={() => showForm("Delete Tab")}>delete tab</div>
      </div>
    </div>
  );
}

export default ActionsBar;
