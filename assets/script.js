//links questions to html ID of questions
const question = document.getElementById("question");
//converted choices to an array to use for functions, array for the choices to the quiz
const choices = Array.from(document.getElementsByClassName("choice-text"));
//links the question number to the html doc
const questionCounterText = document.getElementById("questionCounter");
//links the score text to the html doc
const scoreText = document.getElementById("score");

const timerCounterText = document.getElementById("timerCounter");

//made as an object
let currentQuestion = {};
//delay for answering questions
let acceptingAnswers = true;
//score
let score = 0;
//question counter, what question user is on
let questionCounter = 0;

var timerCounter;

var timer;
//empty array of available questions. copy of full question set, wil take questions out of this array to get new question for user.
let availableQuestions = [];
//array of questions, source for the availbe questions
let questions = [
    {
        
        question: "What coding language is typically used for user interactivity?",
            choice1: "HTML",
            choice2: "CSS",
            choice3: "Spanish",
            choice4: "Javascript",
            answer: 4
    },
    {
        
        question: "Which type of variable below is not a primitive type?",
            choice1: "Boolean",
            choice2: "String",
            choice3: "Undefined",
            choice4: "Error",
            answer: 4
    },
    {
        question: "Let's say that var a = 10 and var b = '10'. Which logical comparison operators outputs true when put into a console.log?",
            choice1: "console.log(a===b)",
            choice2: "console.log(a!=b)",
            choice3: "console.log(a == b)",
            choice4: "console.log(a ! b)",
            answer: 1
    },
    {
        question: "If you call a variable inside of a function, what scope is the variable in?",
            choice1: "Local scope",
            choice2: "Global scope",
            choice3: "Inner Scope",
            choice4: "Outer Scope",
            answer: 1
    },
    {
        question: "For any object a web developer creates in javascript, what below can be used to represent an object in a function?", 
            choice1: "Object",
            choice2: "This",
            choice3: "That",
            choice4: "Thing1",
            answer: 2
    },
]

//constants
//how much an answer is worth
const CORRECT_BONUS = 10;
//how many questions until quiz is done
const MAX_QUESTIONS = 5;

startGame = () => {
    //reset start at 0
    questionCounter = 0;
    score = 0;
    timerCounter= 60;
    //copies from questions array. uses spread operator ... spreads out each item into a new array. makes it easier with spread so that const in functions will not change once we give them new values.
    availableQuestions = [...questions];
    //need to create this function below
    getNewQuestion();
};

  
//arrow helps write out functions
getNewQuestion = () => {
    //if available questions hit zero or question counter
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //saves score at the end of the quiz
        localStorage.setItem('mostRecentScore', score);
        //returns to end.html page
        return window.location.assign("end.html");
    }
    //will increment by 1
    questionCounter++;
    //Puts the numbered question we are on in the html doc. 
    questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS;
    //gets random question. math random then use math floor to get closest interger. then multiple by the available questions which needs the .length for pool of left over questions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        //choses the available questions left 
        currentQuestion = availableQuestions[questionIndex];
        //puts the next question into the innertext of the html doc
        question.innerText = currentQuestion.question;

        //iterate through each choice
        choices.forEach( choice => {
            //references number in question array
            const number = choice.dataset["number"];
            //looks through the array to choices and pulls the number associated to each choice
            choice.innerText = currentQuestion["choice" + number];
        });
        //taking out the questions we just answered
        availableQuestions.splice(questionIndex, 1);
        //allows users to answer questions
        acceptingAnswers = true;
        
        
};

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCounter--;
      timerCounterText.innerHTML = timerCounter;
      // Tests if time has run out
      if (timerCounter === 0) {
        // Clears interval
        clearInterval(timer);
        return window.location.assign("end.html");
      }
    
    }, 1000);
  }
  


//grabs each choice
choices.forEach(choice => {
    //adds event and makes an argument
    choice.addEventListener('click', e => {
        //keeps user from rapid clicking answers until everyhting on screen is loaded.
        if(!acceptingAnswers) return;

        //adds delay to slow down user momentum
        acceptingAnswers = false;
        //to put the new choice into the e.target. choices change with each question
        const selectedChoice = e.target;
        //variable equals the numbers in question array
        const selectedAnswer = selectedChoice.dataset["number"];
        //to label the true or false as correct or incorrect when choosing from answers
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        //when the answer choice is correct, the CORRECT_BONUS value is applied to teh increment score function
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        

        //applies correct or incorrect to the choices in our quiz questions
        selectedChoice.parentElement.classList.add(classToApply);
        //function to give a delayed input when selecting. Shows the color I've applied to corect and incorrect answers
        setTimeout(() => {
            //removes the color after option has been selected
            selectedChoice.parentElement.classList.remove(classToApply);

            //then goes back to the top function, no more questions left
            getNewQuestion();
        }, 1000);//delays the Timeout by 1 second
       


    });
});

//increment score function
incrementScore = num => {
    //adds score by 1
    score += num;
    //writes score text into the score html id
    scoreText.innerText = score;
}


startGame();
startTimer();