import { Link } from "react-router-dom";
import "./Tab.css"
function Tab({ tab, chooseTab }) {
  return (
    <div className="tab">
      <Link to={`/${tab._id}`} onClick={() => chooseTab(tab._id)} className={tab.chosen ? "active" : ""}>
        {tab.name}
      </Link>
    </div>
  );
}

export default Tab;
