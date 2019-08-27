function deepEqual(firstValue,secValue){
    if( typeof firstValue == "object" && typeof secValue ==  "object"){
        if( firstValue && secValue ){
            let firstObjKeys = Object.keys(firstValue);
            let secObjKeys = Object.keys(secValue);
            if(firstObjKeys.length == secObjKeys.length ){
                let equal = 0;
                for( let index = 0; index < firstObjKeys.length; index++){
            		if(secObjKeys.includes(firstObjKeys[index])){
                        if(typeof firstValue[firstObjKeys[index]] == "object" && typeof secValue[firstObjKeys[index]] == "object"){
                        if( deepEqual(firstValue[firstObjKeys[index]],secValue[firstObjKeys[index]])){
                            equal++;
                        }
                           
                        }else{
                            if(firstValue[firstObjKeys[index]] === secValue[firstObjKeys[index]]){
                                equal++;
                            }
                        }
                       
                    }
                }
                return equal == firstObjKeys.length;
            }else{
                return false;
            }
        }else{
            return false;
        }
    } else{
        return firstValue === secValue;
    }
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
