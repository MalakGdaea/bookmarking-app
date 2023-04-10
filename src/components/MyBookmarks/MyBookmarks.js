import { useState, useEffect } from "react";
import DataManager from "../../data-manager";
import MyBookmark from "./MyBookmark";
function MyBookmarks() {
  const [myBookmarks, setMyBookmarks] = useState([]);
  const [searchedBookmark, setSearchBookmark] = useState("");
  const wantedBookmarks = myBookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchedBookmark.toLowerCase())
  );

  const dataManager = DataManager();
  useEffect(() => {
    dataManager.getBookmarks(setMyBookmarks);
  }, []);

  const updateSearchBookmark = (event) => {
    setSearchBookmark(event.target.value);
  };

  return (
    <div className="all-bookmarks-container">
      <div className="search">
        <div id="bookmarks-number">{myBookmarks.length} bookmarks</div>{" "}
        <input id="search-input"
          type="text"
          value={searchedBookmark}
          onChange={updateSearchBookmark}
          placeholder="Search"
        ></input>
      </div>
      {wantedBookmarks.map((bookmark) => {
        return (
          <MyBookmark
            key={bookmark._id}
            bookmark={bookmark}
            deleteBookmark={(bookmarkID) => {
              dataManager.deleteBookmark(bookmarkID, setMyBookmarks);
            }}
          />
        );
      })}
    </div>
  );
}

export default MyBookmarks;
