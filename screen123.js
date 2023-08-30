let canvas; 
let context;
let sObj = {};
let level =[];
let x = 0,
    y = 0;
let lastEaten = 0;
        // seccion set y get
let setScreenObj = (screenObj) => {
    sObj = screenObj;
};

let setGameLevel = (gameLevel) => {
    level = gameLevel;
};
let cleanLastEaten = ()=> {
    lastEaten = 0;
}

let clearSreen

let getLastEaten =() => {
    return lastEaten;
}
       // DIVUJAR PANTALLA
let drawScreen = () => {

    canvas = document.getElementById(sObj.canvasId);
    canvas.height = sObj.height;
    canvas.width = sObj.width;
    context = canvas.getContext("2d");
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(0, 0, sObj.width, sObj.height);
};

      //dibujar Nivel
let drawLevel = () => {
    for (const yElement of level){
        for (const xElement of yElement){
                
                 //     PARED
            if(xElement === 1){
                context.fillStyle = "blue";
                context.fillRect(x, y,sObj.dimension,sObj.dimension);
                   
                // PACMAN
            } else if(xElement === 5) {
                context.beginPath();
                context.fillStyle = "yellow"
                context.arc(
                    x + sObj.dimension /2,
                    y + sObj.dimension /2,
                    sObj.dimension / 2.5, //tamaño pacman
                    Math.PI * 1.75,
                    Math.PI * 0.25,
                    true
                    );
                    context.lineTo(
                        x + sObj.dimension / 2,
                        y + sObj.dimension / 2
                     );
                context.closePath();
                context.fill();
                
                  // COMIDA  -  PILL
            } else if(xElement===4) {
                context.beginPath();
                context.fillStyle = "yellow"
                context.arc(
                    x + sObj.dimension /2,
                    y + sObj.dimension /2,
                    sObj.dimension / 10, //tamaño comida
                    0,
                    Math.PI * 2,
                    true
                    );
                context.closePath();
                context.fill();
              
                //  SUPER COMIDA
            }else if(xElement===3) {
                context.beginPath();
                context.fillStyle = "green"
                context.arc(
                    x + sObj.dimension /2,
                    y + sObj.dimension /2,
                    sObj.dimension / 4, //tamaño supercomida
                    0,
                    Math.PI * 2,
                    true
                    );
                context.closePath();
                context.fill();
               
                //    FANTASMA
            }else if(xElement===2) {

                //    FANTASMA PARALIZADO
            }else if(xElement===6);{

            }
            x = x + sObj.dimension;
        }
        x = 0;
        y = y + sObj.dimension;
    }
    context.fillStyle = "yellow";
    context.font = "200px Arial";
    context.fillRect("Score:    0", (level[0].length + 1) * sObj.dimension, 30);
};
  
        //MOVER PACMAN CON TECLA
let movePacman = (dir,pos) => {
    let arroPosX = 0,
        arroPosY = 0;
    let nextPos = 0;
    
           // "ArrowLeft" FLECHA IZQUERDA
        if (dir === "ArrowLeft") {
        arroPosX = pos[0] - 1;     //restar para que vaya a la izquierda
        arroPosY = pos[1];
        nextPos = level[arroPosY][arroPosX];
    }    //     "ArrowRight"  FLECHA DERECHA
    else if (dir === "ArrowRight") {
        arroPosX = pos[0] + 1;   // Sumar para que baya a la derecha
        arroPosY = pos[1];
        nextPos = level[arroPosY][arroPosX];
    }       //      "ArrowUp"  FLECHA ARRIBA
    else if (dir === "ArrowUp") {
        arroPosX = pos[0] ;   // Sumar para que baya arriba
        arroPosY = pos[1] - 1;
        nextPos = level[arroPosY][arroPosX];
    }      //      "ArrowDown"  FLECHA ABAJO
    else if (dir === "ArrowDown") {
        arroPosX = pos[0] ;   // Sumar para que baya arriba
        arroPosY = pos[1]   + 1;
        nextPos = level[arroPosY][arroPosX];
    }
    
    //if (nexPos === 4 || nexPos ===3 || nexPos === 0 || nexPos === 6) { //   codigo largo
    if ([0, 3, 4, 6].includes(nextPos)) {
        lastEaten = nextPos;
        level[pos[1]][pos[0]] = 0 ; //level [y][x]
        level[arroPosY][arroPosX] = 5;
        pos = [arroPosX, arroPosY];
        drawPacman(dir, pos);
    }
    return pos;
};
    
       // DIBUJAR PACMAN
let drawPacman = (dir, pos) => {
    let x = pos[0] * sObj.dimension,
        y = pos[1] * sObj.dimension;

    clearSpace(dir, pos);
           //  "ArrowLeft" FLECHA IZQUERDA
        if (dir === "ArrowLeft") {
        context.beginPath();   //COMENZAR EL CAMINO
        context.fillStyle = "yellow"
        context.arc(
            x + sObj.dimension /2,
            y + sObj.dimension /2,
            sObj.dimension / 2.5, //tamaño
            Math.PI * 0.75,
            Math.PI * 1.25,
            true
        );
        context.lineTo(x + sObj.dimension / 2,
                       y + sObj.dimension / 2
                     );
        context.closePath();   //TERMINAR EL CAMINO
        context.fill();
    } 
         //     "ArrowRight"  FLECHA DERECHA
    else if (dir === "ArrowRight") {
        context.beginPath();   //COMENZAR EL CAMINO
        context.fillStyle = "yellow"
        context.arc(
            x + sObj.dimension /2,
            y + sObj.dimension /2,
            sObj.dimension / 2.5, //tamaño
            Math.PI * 1.75,
            Math.PI * 0.25,
            true
        );
        context.lineTo(x + sObj.dimension / 2,
                       y + sObj.dimension / 2
                     );
        context.closePath();   //TERMINAR EL CAMINO
        context.fill();
    }
 //     "ArrowUp"  FLECHA ARRIBA
 else if (dir === "ArrowUp") {
    context.beginPath();   //COMENZAR EL CAMINO
    context.fillStyle = "yellow"
    context.arc(
        x + sObj.dimension /2,
        y + sObj.dimension /2,
        sObj.dimension / 2.5, //tamaño
        Math.PI * 1.25,
        Math.PI * 1.75,
        true
    );
    context.lineTo(x + sObj.dimension / 2,
                   y + sObj.dimension / 2
                 );
    context.closePath();   //TERMINAR EL CAMINO
    context.fill();
}     //     "ArrowDown"  FLECHA ABAJO
else if (dir === "ArrowDown") {
    context.beginPath();   //COMENZAR EL CAMINO
    context.fillStyle = "yellow"
    context.arc(
        x + sObj.dimension /2,
        y + sObj.dimension /2,
        sObj.dimension / 2.5, //tamaño
        Math.PI * 0.25,
        Math.PI * 0.75,
        true
    );
    context.lineTo(x + sObj.dimension / 2,
                   y + sObj.dimension / 2
                 );
    context.closePath();   //TERMINAR EL CAMINO
    context.fill();
}
};
    //    espacio claro  //  direccion del pacman
let clearSpace = (dir, pos) => {
    // izquerda = [7, 11]
    // pos [0]= x
    //pos [0] = y
    let  cSX = pos[0],
         cSY = pos [1];
         context.fillStyle = sObj.backgroundColor;
    context.fillRect(
        cSX * sObj.dimension,
        cSY * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );
    if (dir === "ArrowLeft"){   
        cSX++;
    } else if (dir === "ArrowRight"){
        cSX--;
    }else if (dir === "ArrowUp"){
        cSY++;
    }else if (dir === "ArrowDown"){
        cSY--;
    }

    context.fillRect(
        cSX * sObj.dimension,
        cSY * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );
}
let draPoints =(points) => {
    context.fillStyle = sObj.backgroundColor;
    context.fillRect((level[0].length + 4) * sObj.dimension-1, 14, 30, 18);
    context.fillStyle = "yellow";
    context.font = "200px Arial";
    context.fillText(points, (level[0].length + 4) * sObj.dimension, 30);
}
let drawWin = () =>{}

let getLevelPills = (level, toSearch) => {
	let pillCounter = 0;
	level.forEach((yElement) => {
		pillCounter += yElement.filter((x) => toSearch.includes(x)).length;
	});
	return pillCounter;
};

export {setGameLevel,
        setScreenObj,
        getLastEaten,
        cleanLastEaten,
        drawScreen,
        drawLevel,
        movePacman,
        draPoints
    };