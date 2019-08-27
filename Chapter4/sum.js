function range(start, end, step){
	let numbers = [];
	
	if(typeof step == 'undefined'){
		step = 1;
	}
	for(let num = start; num <= end; num+step){
		numbers.push(num);
	}
	return numbers;
}

function sum(numbers){
	let sum = 0;
	
	for(let num of numbers){
		sum += num;
	}
	return sum;
}
//console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));