function countBs( toSearch ){
	return countChar(toSearch, "B");
}
function countChar( toSearch, searched ){
	let count = 0;
	for(let charPos = 0; charPos < toSearch.length; charPos++ ){
		if( toSearch[charPos] == searched ){
			count++;
		}
	}
	return count;
}

console.log(countBs("BBC"));
console.log(countChar("kakkerlak", "k"));