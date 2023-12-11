//links username from end html doc
const username = document.getElementById('username');
//links save socre button from html doc
const saveScoreBtn = document.getElementById('saveScoreBtn');
//links the final score
const finalScore = document.getElementById('finalScore');
//retrieves the end score from local storage
const mostRecentScore = localStorage.getItem('mostRecentScore');

//parsing high scores to turn array into string values. If no score, bring an empty array to get rid of null value
const newScores = JSON.parse(localStorage.getItem("newScores"));
console.log(newScores);


//pulls most recent score from game script and saves it to end screen
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    //disable if there is no username input so you can't click it.
    saveScoreBtn.disabled = !username.value;
    //turn array entry into a string
    localStorage.setItem('username', username);

});

//
function saveUsername() {
    JSON.parse(localStorage.getItem("username"));
}