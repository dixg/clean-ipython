import "./App.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import logo from "./logo.png";
import { styled } from "@mui/material/styles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
const StyledButton = styled(Button)`
  margin: 10px;
`;

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
  // const handleCopyToClipboard = (event) => {
  //   let sample_code = (
  //     <code>In [1]: for run in range(0,10):</code>
  //   );

  //   navigator.clipboard.writeText(sample_code.props.children);
  // };
  return (
    <div className="App">
      <div className="header">
        <img class="header-img" src={logo} alt="logo" />
      </div>
      <div className="wrapper">
        <div className="text-area-box">
          <Textarea
            handleChange={onChangeHandler}
            processed_text={result}
            placeholder={
              "Clean and format copied iPython code into executable python code. \n\nPaste your code here..."
            }
          />
        </div>
        <div className="submit-button">
          <StyledButton variant="contained" size="small" onClick={handleSubmit}>
            Clean
          </StyledButton>
          {/* <StyledButton
            startIcon={<ContentPasteIcon />}
            onClick={handleCopyToClipboard}
            variant="outlined"
            size="small"
          >
            Copy sample
          </StyledButton> */}
        </div>
      </div>
      <div className="footer">
        <p>
          Made with{" "}
          <span>
            {" "}
            <Emoji label="Heart" symbol="❤️" />
            &nbsp; by{" "}
          </span>
          <a href="https://twitter.com/dixika_grewal">@dixika</a>
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
