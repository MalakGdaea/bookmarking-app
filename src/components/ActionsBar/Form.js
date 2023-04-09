import { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
function Form({ formName, hideForm, addTab, addCategory, deleteTab }) {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const add = (name) => {
    if (formName === "Add Tab") {
      addTab(name);
    } else {
      addCategory(name);
    }
  };

  const handelButtonClick = () => {
    if (formName.split(" ")[0] === "Add") {
      add(inputVal);
    } else {
      deleteTab(inputVal);
      navigate("/");
    }
    hideForm();
  };

  const updateInput = (event) => {
    setInputVal(event.target.value);
  };
  return (
    <div className="form-container">
      <div className="form">
        <h4>{formName}</h4>
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
              handelButtonClick();
            }}
          >
            {formName.split(" ")[0]}
          </button>
          <button onClick={() => hideForm()}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
