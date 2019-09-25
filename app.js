let h1 = document.querySelector("h1");
let fields = document.querySelectorAll('.game div');
let availableFields = [];
//creat array of available fields and listen for click event on each field
fields.forEach(field => {
    availableFields.push(field);
    field.addEventListener('click', usersTurn)
});
let winner = false;

//user has chosen a field
function usersTurn() {
    reduceAvailableFields(this);
    this.innerHTML = `<img src='./images/x.png' width='175px'>`;
    this.classList.add("user");
    this.style.pointerEvents = "none";
    checkIfWon('user');
    //if there is no winner, it is comps turn 
    if(!winner) {
        compsTurn();
    }
}

//reduce available fields, so that comp cannot choose them as a field anymore
function reduceAvailableFields(chosenField) {
    availableFields.forEach((availableField, index) => {
        if(chosenField == availableField) {
            availableFields.splice(index, 1);
        }
    });
}

//compore three fields 
function returnClass(fieldNum1, fieldNum2, fieldNum3, player) {
    return fields[fieldNum1].classList.contains(player) && fields[fieldNum2].classList.contains(player) && fields[fieldNum3].classList.contains(player);
}

//check rows, columns and dialogonals for a winner(comp or user)
function checkIfWon(player) {
    //check rows
    if(returnClass(0, 1, 2, player) || returnClass(3, 4, 5, player) || returnClass(6, 7, 8, player)) {
        displayWinner(player);
    }
    //check columns
    if(returnClass(0, 3, 6, player) || returnClass(1, 4, 7, player) || returnClass(2, 5, 8, player)) {
        displayWinner(player);
    }
    //check dialogonals
    if(returnClass(0, 4, 8, player) || returnClass(2, 4, 6, player)) {
        displayWinner(player);
    }
}

//change heading and display the winner
function displayWinner(player) {
    h1.innerHTML = player.toUpperCase() + " has won";
    winner = true;
}

function compsTurn() {
    //random integer 
    let randomNum = Math.floor(Math.random() * availableFields.length) + 1;
    //wait half a sec before drawing circle
    setTimeout(() => {
        //get the field with the matching randomNum
        availableFields.forEach((field, index) => {
            if(index + 1 === randomNum) {
                field.innerHTML = `<img src='./images/circle.png' width='150px'>`;
                //to make field not clickable
                field.style.pointerEvents = "none";
                field.classList.add("comp");
                checkIfWon('comp');
                reduceAvailableFields(field);
            }
        });
    }, 500);
}
