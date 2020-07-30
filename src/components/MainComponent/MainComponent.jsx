/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../../components/MainComponent/MainComponent.css";
import QuestionCard from "../QuestionCard/QuestionCard.jsx";
import TabButtons from "../TabButtons/TabButtons.jsx";

export default function MainComponent() {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);

  useEffect(() => {
    const requestURL =
      "https://raw.githubusercontent.com/etspring/pdd_russia/master/questions.json";

    fetch(requestURL)
      .then((response) => response.json())
      .then((result) => {
        var sectionsLength = result.length;
        var sectionQuestionsAmount = Array.apply(
          null,
          Array(sectionsLength)
        ).map((el) => 0);
        var questions = [...Array.apply(null, Array(20))].map((question) => {
          var sectionNumber = getRandomInt(sectionsLength);
          var sectionQuestions = getFilledSection(
            result,
            sectionNumber,
            sectionQuestionsAmount
          );
          var questionNumber = getRandomInt(sectionQuestions.tickets.length);
          question = sectionQuestions.tickets[questionNumber];
          result[sectionNumber].tickets.splice(questionNumber, 1)[0];
          question.answers.map((answer) => ({ text: answer, selected: false }));
          for (let i = 0; i < question.answers.length; i++) {
            question.answers[i] = {
              text: question.answers[i],
              selected: false,
            };
          }
          question.disabled = false;
          question.correctAnswer = undefined;
          return question;
        });
        setQuestions(questions);
      });
  }, []);

  function selectAnswer(i, correctAnswer, sel) {
    var newQuestions = questions;
    var question = newQuestions[questionNumber];
    question.answers[i].selected = true;
    question.disabled = true;
    if (i + 1 === correctAnswer) {
      question.correctAnswer = true;
      countCorrectAnswers();
    } else {
      question.correctAnswer = false;
      countIncorrectAnswers();
    }
    setQuestions(newQuestions);
  }

  const forceUpdate = useState()[1].bind(null, {});

  function countCorrectAnswers() {
    setCorrectAnswersAmount(correctAnswersAmount + 1);
  }

  function countIncorrectAnswers() {
    setIncorrectAnswersAmount(incorrectAnswersAmount + 1);
  }

  function updateQuestionNumber(number) {
    setQuestionNumber(number);
  }

  function getNextQuestion() {
    if (questionNumber !== 19) {
      setQuestionNumber(questionNumber + 1);
    }
  }

  function getPreviousQuestion() {
    if (questionNumber !== 0) {
      setQuestionNumber(questionNumber - 1);
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getFilledSection(list, sectionNumber, sectionQuestionsAmount) {
    if (sectionQuestionsAmount[sectionNumber] < 4) {
      sectionQuestionsAmount[sectionNumber] += 1;
      return list[sectionNumber];
    }
    return getFilledSection(
      list,
      getRandomInt(list.length),
      sectionQuestionsAmount
    );
  }

  return (
    <div className="main-component">
      <TabButtons
        updateQuestionNumber={updateQuestionNumber}
        questions={questions}
        forceUpdate={forceUpdate}
        correctAnswersAmount={correctAnswersAmount}
      />
      <QuestionCard
        correctAnswers={countCorrectAnswers}
        incorrectAnswers={countIncorrectAnswers}
        question={questions[questionNumber]}
        number={questionNumber}
        selectAnswer={selectAnswer}
        forceUpdate={forceUpdate}
      />
      <button onClick={getNextQuestion} className="next-question"></button>
      <button
        onClick={getPreviousQuestion}
        className="previous-question"
      ></button>
    </div>
  );
}
