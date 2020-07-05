//Question format is ["question", [answers]]
//[answers] format  is ["answer1", "answerr2", ...]
const questions = [
  ["What's your favorite color?", ["red", "blue", "green"]],
  ["Cookie or cream", ["cookie", "cream"]],
  ["The Trolley Problem.\nYou're in front of a railroad switch and you see the train coming.\nIf you do nothing, the train continues its course and kills 10 people,\nbut you have the option to swap the tracks to a different track that will instead kill 5 people.", ["Do nothing", "Switch the track"]],
  ["Mary's Room Problem.\nMary is someone who knows everything there is to know about the color red.\nHowever, Mary has lived her entire life in a blue room, only ever experiencing the color blue.\nIf Mary were to one day leave this blue room and see the color red,\nwould she learn anything about the color red by experiencing it?" , ["She learns something", "She doesn't learn anything"]],
  ["You've scheduled lunch with someone.\nYou arrive and start waiting, but even after twenty-five minutes,\nthe person hasn't shown up or communicated with you at all.\nWhat do you think?", ["Give them some more time, they're probably late", "They haven't responded to any calls, but I'll keep trying to call them", "They're not going to show up. Rude of them to not at least tell me", "They probably won't show, but that's okay, we'll reschedule"]],
  ["", ["Yes", "No"]],
  ["Where would you go if you\nwanted a pack of chewing gum?", ["Jewel Osco", "Target", "Home Depot", "7-11", "I don't chew gum"]],
  ["Which of the following would you rather go to?", ["Christmas Party", "Halloween Party", "4th of July Party", "Birthday Party"]],
  ["What's the better mortgage plan?", ["30-year for more yearly available income", "15-year for a lower total mortgage"]],
  ["Who would you rather hang\nout with on a friday night?", ["My family", "My friends", "Myself"]],
  ["Do you tend to befriend people\nsimiliar or different to you?", ["Similar", "Different"]],
  ["Do you believe in true love/soulmates?", ["Yes", "No"]],
  ["You're taking a test and there's a question\nyou don't know the answer for. What do you do?", ["Come back and answer it later", "Guess an answer and forget about it"]]
];

questionElements = [];
i = 0;

for(question of questions){
  //Create a new question element
  newQuestion = document.getElementById("question-template").cloneNode(true);
  //Set question text
  answerTemplate = newQuestion.getElementsByClassName("answer-body-template")[0];
  newQuestion.getElementsByClassName("question-text")[0].innerText = question[0];
  newQuestion.removeAttribute("id");
  for(answer of question[1]){
    //Create a new answer element
    newAnswer = answerTemplate.cloneNode(true);
    newAnswer.getElementsByTagName("input")[0].name = "answer" + i;
    newAnswer.getElementsByTagName("input")[0].value = answer
    newAnswer.getElementsByTagName("input")[0].className ="answer" + i;
    newAnswer.getElementsByTagName("label")[0].for = "answer" + i;
    newAnswer.getElementsByTagName("label")[0].innerText = answer;
    newQuestion.appendChild(newAnswer);
  }
  //Finalize newQuestion becoming a usable div
  newQuestion.removeChild(answerTemplate);
  //newQuestion.style.visibility = "visible";
  //Add the newQuestion element to questionElements
  questionElements.push(newQuestion);
  document.getElementById("question-holder").appendChild(newQuestion);
  i++;
}
delete document.getElementById("question-template");

function showQuestion(){
  questionStage = document.getElementById("question-stage");
  questionHolder = document.getElementById("question-holder");
  questionStage.innerHTML = "";
  questionStage.appendChild(questionElements[currentQuestion]);
  questionStage.children[0].style.visibility = "visible";
}

//currentQuestion = 0;
currentQuestion = questions.length - 1; //Goes to last question for testing

document.getElementById("next-question").onclick = function(){
  function checked(radios){
    for(radio of radios){
      if(radio.checked){
        return true;
      }
    }
    return false;
  }
  //Check to see if one of the current radios has been checked
  questionStage = document.getElementById("question-stage");
  if(checked(questionStage.getElementsByClassName("answer" + currentQuestion))){
    //Able to move on to next question
    if(currentQuestion < questions.length-1){ //More questions left to ask
      currentQuestion++;
      showQuestion();
    } else {
      document.getElementById("question-table").style.visibility = "hidden";
    }

  }
};

showQuestion();
