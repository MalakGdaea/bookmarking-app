import { useState } from "react";
import { ADD_TAB, ADD_Category, DELETE_TAB } from "../../config";
import "./Form.css";
import { useNavigate } from "react-router-dom";
function Form({ formName, hideForm, addTab, addCategory, deleteTab }) {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();

  const handelButtonClick = () => {
    if (formName === ADD_TAB) {
      addTab(inputVal);
    } else if (formName === ADD_Category) {
      addCategory(inputVal);
    } else if (formName === DELETE_TAB) {
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
          <input value={inputVal} type="text" className="add-input" onChange={updateInput}></input>
        </div>
        <div className="options-button">
          <button onClick={() => { handelButtonClick() }}>{formName.split(" ")[0]}</button>
          <button onClick={() => hideForm()}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
