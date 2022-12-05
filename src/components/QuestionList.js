import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuiz] = useState([])


  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((items) => setQuiz(items));
  }, []);

  const allQuestions = questions.map((question) => {
    return <QuestionItem question={question} key={question.id} 
    onDeleteItem={handleDeleteItem} onCorrectAnswerChange={handleCorrectAnswer}/>
  })


  function handleDeleteItem(deletedItem) {
    //console.log("In ShoppingCart:", deletedItem);
    const updatedItems = questions.filter((item) => item.id !== deletedItem.id);
    setQuiz(updatedItems);
  }

  function handleCorrectAnswer(questionId, correctIndex){
    //console.log(questionId + "++++" + correctIndex)
    fetch(`http://localhost:4000/questions/${questionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({correctIndex}),
  })
    .then((r) => r.json())
    .then((updatedItem) => {
      const updatedItems = questions.map((question) => {
        if (question.id === updatedItem.id) {
          return updatedItem;
        } else {
          return question;
        }
      });
      setQuiz(updatedItems);
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
}

export default QuestionList;
