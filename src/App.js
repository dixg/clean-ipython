import "./App.css";
import React, { useState } from "react";
import Button from '@mui/material/Button';

function App() {
  let [result, setResult] = useState("");

  const handleSubmit = (event) => {
    console.log("onSubmit");
    var coList = result.split("\n");
    var spacesAtStart = 0;

    const numSpace_list = [];

    for (let i = 0; i < coList.length; i++) {
      coList[i] = coList[i].replace(/   *...: |   *...:|In.*]: *| .*]: /gs, "");

      var curr_ele = coList[i];

      if (curr_ele.length > 0) {
        var spacesAtStart = curr_ele.length - curr_ele.trimStart().length;
        numSpace_list.push(spacesAtStart);
        // console.log("No. of spaces from start   =", spacesAtStart, curr_ele);
      }
    }
    let minSpace = Math.min.apply(Math, numSpace_list);
    console.log("Min spaces =", numSpace_list, minSpace);

    if (minSpace > 0) {
      for (let i = 0; i < coList.length; i++) {
        var curr_ele = coList[i];
        coList[i] = coList[i].slice(8);
        console.log(coList[i]);
      }
    }
    console.log("coList", coList);
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
      <div className="header">
        <h3>Clean-ipython</h3>
      </div>
      <div className="wrapper">
        <div className="text-area-box">
          <Textarea
            handleChange={onChangeHandler}
            processed_text={result}
            placeholder={"Paste your string here.."}
          />
        </div>
        <div className="submit-button">
        <Button variant="contained"  size="large" onClick={handleSubmit}>Submit</Button>
        </div>
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
