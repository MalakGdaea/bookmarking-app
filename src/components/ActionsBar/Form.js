import { useState } from "react";
import "./Form.css";
function Form({ formName, hideForm, addTab, addCategory }) {
  const [inputVal, setInputVal] = useState("");
  const add = (name) => {
    if (formName === "Tab") {
      addTab(name);
    } else {
      addCategory(name);
    }
  };
  const updateInput = (event) => {
    setInputVal(event.target.value);
  };
  return (
    <div className="form-container">
      <div className="form">
        <h4>Add {formName}</h4>
        <hr />
        <div className="input">
          <span id="input-label">Name:</span>
          <input
            value={inputVal}
            type="text"
            className="add-input"
            onChange={updateInput}
          ></input>
        </div>
        <div className="options-button">
          <button
            onClick={() => {
              add(inputVal);
              hideForm();
            }}
          >
            Add
          </button>
          <button onClick={() => hideForm()}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
