//Hide sample questions
document.getElementById("question-div").style.visibility = "hidden"

//Question format is ["question", [answers]]
//[answers] format  is
const questions = [
  ["", []]
];

questionElements = [];

for(question in questions){
  newQuestion = document.getElementById("question-template").cloneNode(true);
  newQuestion.getElementsByClassName("question-text")[0].innerHtml = question[0];
  answer-template = newQuestion.getElementsByClassName
  for(answers in question[1]){

  }
}
