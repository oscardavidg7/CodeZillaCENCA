let getPosition=(level, toSearch) => {
    let pos = [];   // 0 = X, 1 = Y
    let foundIt = false;

    level.forEach((value,index) => {
        if (!foundIt){
            pos[0] =
             value.findIndex((v,i)=> 
                (foundIt = v === toSearch)); 
                pos[1]= pos[0] != -1 ? index : null; 
        }
    });
    return pos;
};

let getlevelPills = (level, toSearch) => {
    let pillCounter = 0;
    level.forEach((yElement) =>{
        pillCounter += yElement.filter((x) => toSearch.includes(x)).lenght
    })
    return pillCounter
};

let cloneArray = (ArraIn) => {
    return 
}

export {getPosition};