import "./Bookmark.css";
import { getDomain } from "../../utils/extract-domain";
import { FAV_ICON_LINK, ICON_SIZE } from "../../config";
function Bookmark({ bookmark }) {
  return (
    <div className="bookmark-container">
      <a className="bookmark" href={bookmark.URL}>
        <img className="site-icon" style={{ width: ICON_SIZE, height: ICON_SIZE }}
          src={`${FAV_ICON_LINK}${getDomain(bookmark.URL)}`} />
        <div className="bookmark-name"> {bookmark.title}</div>
      </a>
    </div>
  );
}
export default Bookmark;
