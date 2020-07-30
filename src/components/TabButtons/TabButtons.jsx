/* eslint-disable */
import React from "react";

export default function TabButtons(props) {
  function tabButtons(props) {
    let tabNumbers = [...Array(20).keys()];
    return tabNumbers.map((element, index) => {
      return React.createElement(
        "button",
        {
          onClick: () => {
            props.updateQuestionNumber(element);
            props.forceUpdate();
          },
          key: index,
          className:
            "tab button" +
            (props.questions !== undefined &&
            props.questions[index] !== undefined &&
            props.questions[index].correctAnswer !== undefined
              ? props.questions[index].correctAnswer
                ? " button-green"
                : " button-red"
              : ""),
        },
        element + 1
      );
    });
  }

  return (
    <div className="tab-buttons">
      {tabButtons(props)}
      {/* <span>{String(props.correctAnswersAmount) + " / 20"}</span> */}
    </div>
  );
}
