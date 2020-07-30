/* eslint-disable */
import React, { Fragment } from "react";

export default function QuestionCard(props) {
  function Image() {
    return React.createElement("img", {
      className: "question-card-image",
      src:
        "https://raw.githubusercontent.com/etspring/pdd_russia/master/" +
        props.question.image,
    });
  }

  function Header() {
    return React.createElement(
      "h1",
      { className: "question-card-title" },
      props.question.title
    );
  }

  function Answers() {
    return (
      <div className="question-card-answers">
        {props.question.answers.map((answer, i) => {
          return (
            <button
              onClick={() => {
                props.selectAnswer(
                  Number(i),
                  Number(props.question.correct),
                  answer.selected
                );
                props.forceUpdate();
              }}
              key={props.number + i + 20}
              className={
                "question-card-answer button" +
                (answer.selected
                  ? Number(props.question.correct) === i + 1
                    ? " button-green"
                    : " button-red"
                  : "") +
                (!answer.selected &&
                Number(props.question.correct) === i + 1 &&
                props.question.disabled !== false
                  ? " button-green-bordered"
                  : "")
              }
              disabled={props.question.disabled}
            >
              {answer.text}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div key={props.number} className="question-card">
      <span className="question-card-number">{"Вопрос №" + String(props.number + 1)}</span>
      {props.question !== undefined && (
        <Fragment>
          <Image />
          <Header />
          <Answers />
        </Fragment>
      )}
      {props.question !== undefined &&
        props.question.correctAnswer !== undefined && (
          <p className="question-card-hint">{props.question.hint}</p>
        )}
    </div>
  );
}
