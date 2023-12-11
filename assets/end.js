

//links save socre button from html doc 
const submitBtn = document.getElementById('submit');
//links the final score
const finalScore = document.getElementById('finalScore');
//retrieves the end score from local storage
const mostRecentScore = localStorage.getItem('mostRecentScore');

//Links the form to the end page
const form = document.querySelector('form');

//parsing high scores to turn array into string values. If no score, bring an empty array to get rid of null value


//pulls most recent score from game script and saves it to end screen
finalScore.innerText = mostRecentScore;


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = new FormData(form);
    const obj = Object.fromEntries(username);
    
    const json = JSON.stringify(obj);
    localStorage.setItem('form', json);

    
    
})





