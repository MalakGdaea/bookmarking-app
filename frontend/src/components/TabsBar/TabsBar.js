import "./TabsBar.css"
import Tab from "./Tab";
function TabsBar({ tabs, chooseTab }) {
  return (
    <div id="tabsBar">
      {tabs.map((tab) => (
        <Tab key={tab._id} tab={tab} chooseTab={chooseTab} />
      ))}
    </div>
  );
}

export default TabsBar;
