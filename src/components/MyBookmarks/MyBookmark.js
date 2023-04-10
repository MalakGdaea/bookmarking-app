import "./MyBookmark.css";
function MyBookmark({ bookmark, deleteBookmark }) {
  return (
    <div className="my-bookmark">
      <h4>
        <a className="my-bookmark-link" href={bookmark.URL}>
          {bookmark.title}
        </a>
      </h4>
      <a className="my-bookmark-link" href={bookmark.URL}>
        <div> {bookmark.URL}</div>
      </a>
      <div>{bookmark.tags}</div>
      <p>{bookmark.note}</p>
      <i
        class="material-icons delete-icon"
        onClick={() => deleteBookmark(bookmark._id)}
      >
        delete
      </i>
    </div>
  );
}
export default MyBookmark;
