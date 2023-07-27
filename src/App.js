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
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    console.log("onSubmit");
    const coList = result.split("\n");
    const numSpace_list = [];
    let spacesAtStart = 0;

    for (let i = 0; i < coList.length; i++) {
      coList[i] = coList[i].replace(/   *...: |   *...:|In.*]: *| .*]: /gs, "");
      let curr_ele = coList[i];

      if (curr_ele.length > 0) {
        spacesAtStart = curr_ele.length - curr_ele.trimStart().length;
        numSpace_list.push(spacesAtStart);
      }
    }
    const minSpace = Math.min.apply(Math, numSpace_list);
    console.log("Min spaces =", numSpace_list, minSpace);

    if (minSpace > 0) {
      for (let i = 0; i < coList.length; i++) {
        coList[i] = coList[i].slice(8);
        console.log(coList[i]);
      }
    }
    console.log("coList", coList);
    const processed_text = coList.join("\n");
    event.preventDefault();
    setResult(processed_text);
  };

  const onChangeHandler = (event) => {
    event.target.style.border = "5px solid black";

    const input_text = event.target.value;
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

// Memoize the Textarea component to optimize rendering
const Textarea = React.memo(({ placeholder, handleChange, processed_text }) => {
  console.log("Render Textarea");
  return (
    <textarea
      id="textarea"
      placeholder={placeholder}
      onChange={handleChange}
      rows="50"
      cols="100"
      value={processed_text}
    ></textarea>
  );
});
export default App;