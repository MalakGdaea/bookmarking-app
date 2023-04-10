import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import MyBookmarks from "./components/MyBookmarks/MyBookmarks";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/:tabID" element={<Dashboard />}></Route>
        <Route path="/mybookmarks" element={<MyBookmarks />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
