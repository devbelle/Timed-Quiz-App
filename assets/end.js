//links save socre button from html doc 
const submitBtn = document.getElementById('submit');
//links the final score with mostRecentScore in form
const finalScore = document.getElementById('finalScore');
//retrieves the end score from local storage
const mostRecentScore = localStorage.getItem('mostRecentScore');

//Links the form to the end page
const form = document.querySelector('form');

//pulls most recent score from game script and saves it to end screen
finalScore.innerText = mostRecentScore;

//create an add even listener to save the initials at the end
form.addEventListener('submit', (e) => {
    //keeps initials from being put inot the URL (default action)
    e.preventDefault();
    //created a variable to gather all input in the form into a data object.
    const initials = new FormData(form);
    //created a variable for the object 
    const obj = Object.fromEntries(initials);
    
    //used JSON stringify to save the object as a string into local storage
    const json = JSON.stringify(obj);
    localStorage.setItem('form', json);

    
    
})





