import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TabsBar from "./components/TabsBar/TabsBar";
import ActionsBar from "./components/ActionsBar/ActionsBar";
import Home from "./components/Home";
import { useEffect, useState } from "react";

function App() {
  const [isShown, setIsShown] = useState(false);
  const [sectionName, setSectionName] = useState("Category");
  const [tabs, setTabs] = useState([]);

  const updateTabsData = () => {
    fetch("http://localhost:3012/tabs")
      .then((response) => {
        return response.json();
      })
      .then((tabs) => {
        setTabs(tabs);
      });
  };

  useEffect(() => {
    updateTabsData();
  }, []);

  const addTab = (tabName) => {
    fetch(`http://localhost:3012/tabs/${tabName}`, { method: "POST" }).then(
      () => {
        updateTabsData();
      }
    );
  };

  const chooseTab = (tabID) => {
    let tabsCopy = [...tabs];
    let tabIndex = tabsCopy.findIndex((tab) => tab._id == tabID);
    tabsCopy.map((tab) => (tab.chosen = false));
    tabsCopy[tabIndex].chosen = true;
    setTabs(tabsCopy);
  };

  const showForm = (name) => {
    setSectionName(name);
    setIsShown(true);
  };

  const hideForm = () => {
    setIsShown(false);
  };

  return (
    <Router>
      <div className="">
        <TabsBar tabs={tabs} chooseTab={chooseTab} />
        <ActionsBar showForm={showForm} />
      </div>
      <Routes>
        <Route
          path="/:tabID"
          element={
            <Home
              isShown={isShown}
              sectionName={sectionName}
              hideForm={hideForm}
              addTab= {addTab}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
