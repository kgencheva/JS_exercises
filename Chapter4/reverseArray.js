function reverseArray(array){
	let newArray = [];
	
	for(let index = array.length-1; index >= 0; index--){
		newArray.push(array[index]);
	}
	return newArray;
}

function reverseArrayInPlace(array){
	let tmp;
	
	for(let indexStart=0, indexEnd=array.length-1; indexStart < indexEnd; indexStart++, indexEnd--){
		tmp = array[indexStart];
		array[indexStart] = array[indexEnd];
		array[indexEnd] = tmp;
	}
}
console.log(reverseArray(["A","B","C"]));
let arrayValue = [1,2,3,4,5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);