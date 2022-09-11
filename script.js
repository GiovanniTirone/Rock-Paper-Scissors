 function  computerPlay() {
    let i = Math.floor((Math.random()*3));
    let nome = "rock"; 
    switch(i){
        case 0:
            nome = "rock";
            break;
        case 1:
            nome = "paper";
            break;
        case 2:
            nome = "scissors";
            break;
    }
    return nome; 
 }

 function playRound (playerSelection,computerSelection){
    playerSelection = playerSelection.toLowerCase() ;
    let winner = undefined;

        switch(playerSelection){
            case computerSelection:
                break;
            case "rock":
                if(computerSelection == "scissors"){
                    winner = true;
                } else{
                    winner = false;
                }
                break;
            case "paper":
                if(computerSelection == "scissors"){
                    winner = false;
                } else{
                    winner = true;
                }
                break;
            case "scissors":
                if(computerSelection == "rock"){
                    winner = false;
                } else{
                    winner = true;
                }
                break;
        }        
    return winner; 
};

let ris = [0,0];
let numeroGame=0; 
let numeroRound=0; 
let rowNumber = 0;
let tabToPass = [];

console.log(tabToPass.length);

function add_row (game, round, you, comp, pat ){
    tabToPass[5*rowNumber]=game; 
    tabToPass[5*rowNumber+1]=round;
    tabToPass[5*rowNumber+2]=you;
    tabToPass[5*rowNumber+3]=comp;
    tabToPass[5*rowNumber+4]=pat;
    rowNumber+=1;  
};

function StartGame (e) {
    let punto = e.target.getAttribute("id");
    if(punto=="btm"){
        document.getElementById("rockContainer").style.setProperty("pointer-events","initial"); 
        document.getElementById("paperContainer").style.setProperty("pointer-events","initial"); 
        document.getElementById("scissorsContainer").style.setProperty("pointer-events","initial"); 
        numeroGame+=1;
    };
};

function endGame (e){
    let punto = e.target.getAttribute("id");
    if(punto=="endBtm"){
        document.getElementById("rockContainer").style.setProperty("pointer-events","none"); 
        document.getElementById("paperContainer").style.setProperty("pointer-events","none"); 
        document.getElementById("scissorsContainer").style.setProperty("pointer-events","none"); 
        youPress.classList.remove("loser","playingWinner");
        computerPress.classList.remove("loser","playingWinner");
        var src = document.getElementById("youPress");
        let w = document.getElementById("winner");
        w.innerHTML = 'WINNER: ';
        src.innerHTML = '';
        computerPress.innerHTML='';
        document.getElementById("result").innerHTML="SCORE: ";
        
        add_row(numeroGame,numeroRound,ris[0],ris[1],numeroRound-(ris[0]+ris[1]));
        ris=[0,0];
        numeroRound=0;
        localStorage.setItem('tab',tabToPass);
    };
};

function yourChoice (e) {
    let choice = e.target.getAttribute("id");
    console.log(e);
    console.log(choice);
    if(choice=="rock"||choice=="paper"||choice=="scissors"){
        youPress.classList.remove("loser","playingWinner");
        computerPress.classList.remove("loser","playingWinner");
        document.getElementById(choice+"Container").classList.add("playing");
    } else {return};
     
    setTimeout(function(){
        document.getElementById(choice+"Container").classList.remove("playing");
    } , 220);
    
    youPress.innerHTML='';
    computerPress.innerHTML='';
    var img = document.createElement("img"); 
    img.src = "./images/"+choice+".jpg"; 
    var src = document.getElementById("youPress");
    src.appendChild(img); 
   
    let compPlay = computerPlay();
    
    if(computerPress.childElementCount == 0 ){
        var img = document.createElement("img"); 
        img.src = "./images/"+compPlay+".jpg"; 
        var src = document.getElementById("computerPress"); 
        src.appendChild(img); 
    } ;

    let win = playRound(choice,compPlay);

    let w = document.getElementById("winner");
    let r = document.getElementById("result");
    if ( win == true ) {
        w.innerHTML="ROUND WINNER: YOU";
        ris[0]+=1;
        r.innerHTML="SCORE: "+ris[0]+" - "+ris[1];
        setTimeout(function(){
            computerPress.classList.add("loser");
            youPress.classList.add("playingWinner");
        },200);
    } else if (win==false) {
        w.innerHTML="ROUND WINNER: COMPUTER";
        ris[1]+=1;
        r.innerHTML="SCORE: "+ris[0]+" - "+ris[1];
        setTimeout(function(){
            youPress.classList.add("loser");
            computerPress.classList.add("playingWinner");
        },200);
    } else {
        w.innerHTML="ROUND WINNER: PATTA";
        
    };
    
    numeroRound+=1;
    console.log("numeroRound="+numeroRound);
};



window.addEventListener("click", StartGame);

window.addEventListener("click",endGame);

window.addEventListener("click", yourChoice);


