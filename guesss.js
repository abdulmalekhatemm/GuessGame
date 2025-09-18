//setting Game Name 
let gameName = "Guess The Word";
document.title = gameName;
 
document.querySelector("h1").innerHTML = gameName;

document.querySelector("footer").innerHTML = `${gameName} Game Name Created By Elzero Web School`;
//Setting Game Options 
let numberOfTries = 8 ;
let numberOfLetters = 6 ;
let currentTry = 1 ;
let numberOfHints = 2 ;

//Manage Words 
let wordToGuess = "";
const Words = ["Create","Updata","Delete","Master","Bransh","Mainly","Al-hatem","School"];
wordToGuess = Words[Math.floor(Math.random() * Words.length )].toLowerCase();
let messageArea = document.querySelector(".message");
//Manage Hints 
document.querySelector(`.hint span`).innerHTML = numberOfHints ;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);
//console.log(wordToGuess);

function generateInput()
{
    const inputsContainer = document.querySelector(".inputs");
        //Create Main Try Div
    for(let i = 1 ; i <= numberOfTries;i++) { 
   const tryDiv = document.createElement("div");
   tryDiv.classList.add(`try-${i}`);
   tryDiv.innerHTML = `<span>Try ${i} </span>`;
   
    if( i !== 1 )tryDiv.classList.add("disabled-inputs");
     //Create Inputs
    for(let j = 1 ; j <= numberOfLetters ; j++ )
    {
     const input = document.createElement("input");
     input.type = "text";
     input.id = `guess-${i}-letter-${j}`;
     input.setAttribute("maxlength","1");
     tryDiv.appendChild(input);
    //  input.setAttribute("data-try",i);
    //  input.setAttribute("data-letter", j);
    //  input.setAttribute("autocomplete","off");
     }
    inputsContainer.appendChild(tryDiv);
  }
 inputsContainer.children[0].children[1].focus();
 //Disable All Inputs  Except First One 
 const inputsDisableDiv = document.querySelectorAll(".disabled-inputs input");//this traid me 

 inputsDisableDiv.forEach((input) => (input.disabled = true));

 //Add Event Listener To Inputs 
const inputs = document.querySelectorAll("input");

inputs.forEach((input , index) => {

    //Convert Input To Uppercase 
    input.addEventListener("input", function (){
        this.value = this.value.toUpperCase();
        //console.log(index);
        const nextInput = inputs[index + 1];
        if(nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event){
        //this.value = this.value.toUpperCase();remove 

       // console.log(event);
       const currentIndex = Array.from(inputs).indexOf(event.target);//target after event Or this

       //console.log(currentIndex);
       if(event.key == "ArrowRight")
       {
        const nextInput = currentIndex + 1; 

        if(nextInput < inputs.length)inputs[nextInput].focus();
       }
       if(event.key == "ArrowLeft")
        {
         const PrevInput = currentIndex - 1; 
         if(PrevInput   >= 0)inputs[PrevInput].focus();
        }
    });
    
}); 
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);
function handleGuesses() {
    let successGuess = true ;

    // console.log(wordToGuess);

    for(let i = 1 ;i <= numberOfLetters ;i++)
    {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualletter = wordToGuess[i - 1];
    
        //Game Logic
        if(letter === actualletter){
            //Letter Is Correct And In Place 
            inputField.classList.add("yes-in-place");
         } 
         else if (wordToGuess.includes(letter) && letter !== "") {
            //letter Is Correct And Not-In Place 
            inputField.classList.add("not-in-place");

            successGuess = false ;
         }
         else
         {
        inputField.classList.add("no");

        successGuess = false ; 
         }

        //console.log();
    }
    // Check If User Win or Lose 
    if(successGuess)
    {
        messageArea.innerHTML = `You Win The Word Is <span> ${wordToGuess}</span>`;
        if(numberOfHints === 2 ){
        messageArea.innerHTML = `<p>Congratz You Didnot Use Hint</p>`;
        }
        //Add Disabled Class On All Try Divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        //Disabled Guess Button 
        guessButton.disabled = true ;
        getHintButton.disabled = true ;
        //console.log("You Win");
    }  else
        {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) =>  (input.disabled = true ));
        currentTry++;

        //document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input)=> (input.disabled = false));  
        let el = document.querySelector(`.try-${currentTry}`);
        if(el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        }
        else{
            //Disabled Guess Button
            guessButton.disabled = true ;
            f=getHintButton.disabled = true;
            messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
        }
        //console.log(currentTry);
    }
}
function getHint()
{
    if(numberOfHints > 0)
    {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints ;
    }
    if( numberOfHints === 0)
    {
        getHintButton.disabled = true ;
    }
    //
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(enabledInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input)=> input.value === "");
    if (emptyEnabledInputs.length > 0) 
        {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
       
        // console.log(randomIndex);
        // console.log(randomInput);
        // console.log(indexToFill);
        if (indexToFill !== -1) {
         randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
        }

}

function handleBackSpace(event)
{
    if(event.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        console.log(currentIndex);
        if(currentIndex > 0 )
        {
            const currentInput = inputs[currentIndex];
            const PrevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            PrevInput.value = "";
            PrevInput.focus();
        }
        // 

    }
}
document.addEventListener("keydown",handleBackSpace);
// const currentIndex = Array.from(inputs).indexOf(event.target);//Or This
window.onload = function () {
    generateInput();

}