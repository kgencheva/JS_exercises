function arrayToList(array){
    let list ={};
   
    for( let index = array.length-1; index>=0; index--){
        if(Object.keys(list).length == 0){
            list = { value: array[index], rest: null};
        }else{
            list = { value: array[index], rest: list};
        }
    }
   
    return list;
}

function listToArray( list ){
    let array = [];
    let currentObj = list;
   
    if(Object.keys(currentObj).length!= 0){
        do{
            array.push(currentObj.value);
            currentObj = currentObj.rest;
        }while(currentObj)
    }
    return array;
}

function prepend(element, list){
    return { value: element, rest:list };
}
/*
function nth(list, index){
    let currentObj  = list;
   
    if(Object.keys(currentObj).length!=0 && index >= 0){
        for(let depth = 0;depth<index; depth++){
            if(!currentObj){
                break;
            }
            currentObj = currentObj.rest;
        }
    }
    return currentObj ? currentObj.value : undefined;
}
*/
function nth(list, index){
   
    if(list && Object.keys(list).length!=0 && index>=0){
        if(index>0){
            return nth(list.rest, --index);
        }else{
            return list.value;
        }
    }else{
        return undefined;
    }
}

console.log(JSON.stringify(arrayToList([10, 20])));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(JSON.stringify(prepend(10, prepend(20, null))));
console.log(nth(arrayToList([10, 20, 30]), 1));
