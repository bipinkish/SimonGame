alert("This Game works better in Desktop/PC . Proceed ?");
var gameColors=["red","blue","yellow","green"];
var userPattern=[];
var gamePattern=[];
var state=false;
var level=0;

$(document).keydown(function(){
    if(!state){
        nextSequence();
        state=true;
    }
});

$(".btn").click(function(){
    var clickedButton=$(this).attr("id");
    userPattern.push(clickedButton);
    animateColor(clickedButton);
    playSound(clickedButton);
    checkSequence(userPattern.length-1);
});
function checkSequence(currentLevel){
    if(userPattern[currentLevel]===gamePattern[currentLevel]){
        if(userPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    }
    else{
        gameOver();
        startOver();
    }
}
function nextSequence(){
    userPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNum=Math.floor(Math.random()*4);
    var randomColor=gameColors[randomNum];
    gamePattern.push(randomColor);
    
    for(let i=0;i<level;i++){  
        setTimeout(function(){
            animateColor(gamePattern[i]);
            playSound(gamePattern[i]);
        },i*700);     

    }
}

function animateColor(colorName){
    $("#"+colorName).fadeIn(100).fadeOut(100).fadeIn(100);
}
function playSound(colorName){
    var audio=new Audio("./sounds/"+colorName+".mp3");
    audio.play();
}

function gameOver(){
    $("#level-title").text("Game Over ! Press any Key to Restart!");
    $("body").addClass("game-over");
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
}

function startOver(){
    gamePattern=[];
    state=false;
    level=0;
}
