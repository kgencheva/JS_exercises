//uses scripts.js file from book
var SCRIPTS = require('./scripts.js');

function dominantDirection(text) {
	let directions={
			ltr: 0,
			rtl: 0,
			ttb: 0
	};
	
	let currScript;
	let currDirection;
	let directionNames;
	let direction;
	let maxChars = 0;
	let dominantDirection;
	
  for(let char of text){
	  currScript = SCRIPTS.filter( (script) => {
		  return script.ranges.some(([from, to]) => {
			  return char.codePointAt(0) >= from && char.codePointAt(0) < to 
		  } )
	  } );
	  if( currScript.length != 0 ){
		  currDirection = currScript[0].direction;
		  if( currDirection in directions ){
			  directions[currDirection]++;
		  }
	  }
	  directionNames = Object.keys(directions);
	  for( let dir=0; dir < directionNames.length; dir++ ){
		  direction = directionNames[dir];
		  if( directions[direction] > maxChars){
			  maxChars = directions[direction];
			  dominantDirection = direction;
		  }
	  }
  }
  return dominantDirection;
}

console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hey, مساء الخير"));