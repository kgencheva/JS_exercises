function loop(value, testFunc, updateFunc, bodyFunc){
	if(!testFunc(value)){
		return;
	}
	bodyFunc(value);
	loop(updateFunc(value), testFunc, updateFunc, bodyFunc);
}
loop(3, n=>n>0, n=>n-1, console.log);