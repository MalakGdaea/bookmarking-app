import TabsBar from "../TabsBar/TabsBar";
import ActionsBar from "../ActionsBar/ActionsBar";
import DataManager from "../../utils/data-manager";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";

function Dashboard() {
  let { tabID } = useParams();
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

  if (tabs.length != 0 && !tabID) {
    tabID = tabs[0]._id;
  }

  const showForm = (name) => {
    setSectionName(name);
    setIsShown(true);
  };

  const hideForm = () => {
    setIsShown(false);
  };
  return (
    <div>
      <TabsBar tabs={tabs} chooseTab={chooseTab} />
      <ActionsBar showForm={showForm} />
      {tabID && (<Home tabID={tabID} isShown={isShown} sectionName={sectionName} hideForm={hideForm}
        addTab={(name) => dataManager.addTab(name, setTabs)}
        deleteTab={(name) => dataManager.deleteTab(name, setTabs)} />
      )}
    </div>
  );
}

export default Dashboard;
