var inputDir = {x: 0 , y:0}
var backgroundMusic = new Audio("music/snaketheme.mp3")
var eatSound = new Audio("music/eatsound.mp3")
var gameOverSound = new Audio("music/gameoversound.mp3")
var turnSound = new Audio("music/turn.mp3")
var scorebox = document.querySelector("#scorebox")
var board = document.querySelector("#board")

var sneakArr = [
    {x: 10 , y:13}
]
var food = {x: 4 , y:5}
var score = 0;

var prevtime = 0;
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - prevtime)/1000 < 1/speed){
        return;
    }
    prevtime = ctime
    gameEngine()
}

function isCollide(snake){
    for (let i = 1; i < sneakArr.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
        return true;
    }
}

let highscore = document.querySelector("#highscore")
if(localStorage.getItem("snakescore")){
    highscore.innerHTML =  localStorage.getItem("snakescore")
}
else {
    highscore.innerText = 0;
}


function gameEngine() {

    if(isCollide(sneakArr)){
        gameOverSound.play()
        backgroundMusic.pause()
        inputDir = {x: 0 , y:0}
        alert("Game Over. Please Try Again")
        sneakArr = [{x:10 , y:13}]
    }


    var hiscoreval;
    if(sneakArr[0].x == food.x && sneakArr[0].y == food.y){
        eatSound.play()
        sneakArr.unshift({x: sneakArr[0].x + inputDir.x , y: sneakArr[0].y + inputDir.y})
        score += 1;
        if(score >= localStorage.getItem("snakescore")){
            localStorage.setItem("snakescore",score)
        }
        scorebox.innerHTML = `Score:` + score;
        var a = 2;
        var b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}
        
    }

    for (let i = sneakArr.length - 2; i >= 0; i--) {
        sneakArr[i+1] = {...sneakArr[i]}
    }
    sneakArr[0].x += inputDir.x
    sneakArr[0].y += inputDir.y

    board.innerHTML = ""
    sneakArr.forEach(function(e,index){
        sneakElement = document.createElement("div")
        sneakElement.style.gridRowStart = e.x;
        sneakElement.style.gridColumnStart = e.y;
        if(index == 0){
            sneakElement.classList.add("head")
        }
        else {
            sneakElement.classList.add("body")
        }
        board.appendChild(sneakElement)
    })

    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add("food")
    board.appendChild(foodElement)

}




window.requestAnimationFrame(main)
window.addEventListener("keydown",function(e){
    backgroundMusic.play()
    turnSound.play()
    inputDir = {x: 0 , y:1}
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            inputDir.x = 0;
            inputDir.y = -1;
            break;


        case "ArrowRight":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
    
        default:
            break;
    }

})


var arrowup = document.querySelector("#arrowup")
var arrowdown = document.querySelector("#arrowdown")
var arrowleft = document.querySelector("#arrowleft")
var arrowright = document.querySelector("#arrowright")
arrowup.addEventListener("click",function(){
    backgroundMusic.play()
    inputDir.x = -1;
    inputDir.y = 0;
})
arrowdown.addEventListener("click",function(){
    backgroundMusic.play()
    inputDir.x = 1;
    inputDir.y = 0;
})
arrowleft.addEventListener("click",function(){
    backgroundMusic.play()
    inputDir.x = 0;
    inputDir.y = -1;
})
arrowright.addEventListener("click",function(){
    backgroundMusic.play()
    inputDir.x = 0;
    inputDir.y = 1;
})




















// -----------------------Difficulty Levels---------------------
var speed = 5;
var easy = document.querySelector("#easy")
var medium = document.querySelector("#medium")
var hard = document.querySelector("#hard")
var insane = document.querySelector("#insane")
easy.addEventListener("click",function(){
    speed = 2
})
medium.addEventListener("click",function(){
    speed = 5
})
hard.addEventListener("click",function(){
    speed = 8
})
insane.addEventListener("click",function(){
    speed = 10
})
