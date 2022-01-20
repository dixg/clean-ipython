import "./App.css";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import logo from './logo.png';

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
        spacesAtStart = curr_ele.length - curr_ele.trimStart().length;
        numSpace_list.push(spacesAtStart);
        // console.log("No. of spaces from start   =", spacesAtStart, curr_ele);
      }
    }
    let minSpace = Math.min.apply(Math, numSpace_list);
    console.log("Min spaces =", numSpace_list, minSpace);

    if (minSpace > 0) {
      for (let i = 0; i < coList.length; i++) {
        curr_ele = coList[i];
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
       <img class="header-img" src={logo} alt="logo"/>
      </div>
      <div className="wrapper">
        <div className="text-area-box">
          <Textarea
            handleChange={onChangeHandler}
            processed_text={result}
            placeholder={"Remove leading whitespaces and special characters from any code in three simple steps: \n\n 1. Paste the code with leading whitespaces and ...: characters from ipython \n 2. Click the Submit button \n 3. Copy the generated clean code to desired destination \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n ***Don't forget to save this link into your bookmarks and share it with your friends."}
          />
        </div>
        <div className="submit-button">
        <Button variant="contained"  size="small" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <div className="footer">
        <p>
          Made with <span> <Emoji label="Heart" symbol="❤️"/>&nbsp; by </span><a href="https://twitter.com/dixika_grewal">@dixika</a>
          </p>
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
