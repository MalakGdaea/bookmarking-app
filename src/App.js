import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TabsBar from "./components/TabsBar/TabsBar";
import ActionsBar from "./components/ActionsBar/ActionsBar";
import Home from "./components/Home";
import DataManager from "./data-manager";
import { useEffect, useState } from "react";

function App() {
  const [isShown, setIsShown] = useState(false);
  const [sectionName, setSectionName] = useState("Category");
  const [tabs, setTabs] = useState([]);
  const dataManager = DataManager();

  useEffect(() => {
    dataManager.updateTabsData(setTabs);
  }, []);

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
        <Route path={`/`} element={<div></div>}></Route>
        <Route
          path="/:tabID"
          element={
            <Home
              isShown={isShown}
              sectionName={sectionName}
              hideForm={hideForm}
              addTab={(name) => dataManager.addTab(name, setTabs)}
              deleteTab={(name) => dataManager.deleteTab(name, setTabs)}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
