import {
    setScreenObj,
    setGameLevel,  
    drawScreen, 
    drawLevel ,
    movePacman,
    getLastEaten,
    cleanLastEaten,
    draPoints
   } from "./js123/screen123.js";
import { gameLevels } from "./js123/level123.js";
import { getPosition } from "./js123/utility123.js";
import{sObj} from "./js123/config.js"


let currentLevel = 0;
let inGameLevel = {};
let pacPos = [];
let points = 0;
let pillsToWin = 0;
let totalLevelPills = 0;
gameTime = 0;

class Juego {
    constructor() {
        setScreenObj(sObj);
        drawScreen();
        setGameLevel([...gameLevels[currentLevel]]);
        drawLevel();
       
    }
   // new = ()
    play = () => {
        inGameLevel = [...gameLevels[currentLevel]];
        setGameLevel(inGameLevel);
        pacPos = getPosition(inGameLevel, 5);  //[8, 11]
        totalLevelPills = gameLevels(inGameLevel,[4, 3]);

        let moveHandler = (e) => {
            if (
                ["ArrowLeft","ArrowRight","ArrowUp", "ArrowDown"].includes(e.key))
            pacPos = movePacman(e.key, pacPos);
            this.scoreValidation(moveHandler)
        };
       // Captura tecla
        document.addEventListener("keydown", moveHandler);
            //  [7, 11]  despues de ejecutar mover pacman a la izquerda
        // verificacion y moveGhost
        gameTime = setInterval(() =>{}, 500 / sObj.speed);
    };

    scoreValidation = (moveHandler) => {
        if([4, 3].includes(getLastEaten())) pillsToWin++;

          if (getLastEaten() ===4) points += sObj.pointCat.pill;
          if (getLastEaten() ===3) points += sObj.pointCat.superPill;
          if (getLastEaten() ===6) points += sObj.pointCat.ghost;
          cleanLastEaten();
          draPoints(points);

          //win  - ganar
          if(pillsToWin === totalLevelPills){
            clearInterval(gameTime);
            document.removeEventListener("keydown", moveHandler, false);
            this.win();
          }
    };
    win = () => {
        currentLevel = 0;
        inGameLevel = {};
        pacPos = [];
        points = 0;
        pillsToWin = 0;
        totalLevelPills = 0;
        drawWin();
        let resetGame = setInterval (() =>{
            this.new();
            this.play();
            clearInterval(resetGame);
        },3000)
    };

}

let juegoPacman = new Juego();
juegoPacman.play();
