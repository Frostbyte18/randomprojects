//Question format is ["question", [answers]]
//[answers] format  is ["answer1", "answerr2", ...]
const questions = [
  ["What's your favorite color?", ["red", "blue", "green"]]
];

questionElements = [];

for(question of questions){
  console.log(question);
  //Create a new question element
  newQuestion = document.getElementById("question-template").cloneNode(true);
  //Set question text
  answerTemplate = newQuestion.getElementsByClassName("answer-body-template")[0];
  newQuestion.getElementsByClassName("question-text")[0].innerText = question[0];
  newQuestion.removeAttribute("id");
  i = 0;
  for(answer of question[1]){
    //Create a new answer element
    newAnswer = answerTemplate.cloneNode(true);
    newAnswer.getElementsByTagName("input")[0].name = "a" + i;
    newAnswer.getElementsByTagName("input")[0].value = answer;
    newAnswer.getElementsByTagName("label")[0].for = "a" + i;
    newAnswer.getElementsByTagName("label")[0].innerText = answer;
    newQuestion.appendChild(newAnswer);
    i++;
  }
  //Finalize newQuestion becoming a usable div
  newQuestion.removeChild(answerTemplate);
  newQuestion.style.visibility = "visible";
  //Add the newQuestion element to questionElements
  questionElements.push(newQuestion);
  document.getElementById("question-holder").appendChild(newQuestion);
}
delete document.getElementById("question-template");

function nextQuestion(){
  questionStage = document.getElementById("question-stage");
  questionHolder = document.getElementById("question-holder");
  questionStage.innerHTML = "";
  questionStage.appendChild(questionHolder.children[0]);
  delete questionHolder.children[0];
}

//nextQuestion();
