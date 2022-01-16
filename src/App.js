import "./App.css";
import React, { useState } from "react";

function App() {
  let [result, setResult] = useState("");

  const handleSubmit = (event) => {
    console.log("onSubmit");
    var coList = result.split("\n");

    for (let i = 0; i < coList.length; i++) {
      coList[i] = coList[i].replace(/   *...: |   *...:|In.*]: | .*]: /gi, "");
    }

    let processed_text = coList.join("\n");
    event.preventDefault();
    setResult(processed_text);
  };

  const onChangeHandler = (event) => {
    event.target.style.border = "5px solid black";

    var input_text = event.target.value;
    setResult(input_text);
  };

  const Emoji = (props) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );
  return (
    <div className="App">
      <div className="header-fixed-top cbp-af-header">
        <h3>Clean-ipython</h3>
      </div>

      <div className="box">
        <Textarea
          handleChange={onChangeHandler}
          processed_text={result}
          placeholder={"Paste your string here.."}
        />
      </div>

      <div className="submit_button">
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="footer">
        <h3>
          Made with <Emoji label="Heart" symbol="❤️" /> by Dixika Grewal
        </h3>
      </div>
    </div>
  );
}
export function Textarea(props) {
  console.log(props);
  return (
    <textarea
      id="textarea"
      placeholder={props.placeholder}
      onChange={props.handleChange}
      rows="50"
      cols="100"
      value={props.processed_text}
    ></textarea>
  );
}
export default App;
