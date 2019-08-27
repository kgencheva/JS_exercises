//Code given in book
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = buildGraph(roads);
class VillageState {
	  constructor(place, parcels) {
	    this.place = place;
	    this.parcels = parcels;
	  }

	  move(destination) {
	    if (!roadGraph[this.place].includes(destination)) {
	      return this;
	    } else {
	      let parcels = this.parcels.map(p => {
	        if (p.place != this.place) return p;
	        return {place: destination, address: p.address};
	      }).filter(p => p.place != p.address);
	      return new VillageState(destination, parcels);
	    }
	  }
}

let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");
console.log(next.place);
console.log(next.parcels);
console.log(first.place);

function runRobot(state, robot, memory) {
	  for (let turn = 0;; turn++) {
	    if (state.parcels.length == 0) {
	      console.log(`Done in ${turn} turns`);
	      break;
	    }
	    let action = robot(state, memory);
	    state = state.move(action.direction);
	    memory = action.memory;
	    console.log(`Moved to ${action.direction}`);
	  }
	}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};
	
runRobot(VillageState.random(), randomRobot);

const mailRoute = [
	  "Alice's House", "Cabin", "Alice's House", "Bob's House",
	  "Town Hall", "Daria's House", "Ernie's House",
	  "Grete's House", "Shop", "Grete's House", "Farm",
	  "Marketplace", "Post Office"
	];

function routeRobot(state, memory) {
	  if (memory.length == 0) {
	    memory = mailRoute;
	  }
	  return {direction: memory[0], memory: memory.slice(1)};
	}

runRobot(VillageState.random(), routeRobot, mailRoute);

function findRoute(graph, from, to) {
	  let work = [{at: from, route: []}];
	  for (let i = 0; i < work.length; i++) {
	    let {at, route} = work[i];
	    for (let place of graph[at]) {
	      if (place == to) return route.concat(place);
	      if (!work.some(w => w.at == place)) {
	        work.push({at: place, route: route.concat(place)});
	      }
	    }
	  }
	}
function goalOrientedRobot({place, parcels}, route) {
	  if (route.length == 0) {
	    let parcel = parcels[0];
	    if (parcel.place != place) {
	      route = findRoute(roadGraph, place, parcel.place);
	    } else {
	      route = findRoute(roadGraph, place, parcel.address);
	    }
	  }
	  return {direction: route[0], memory: route.slice(1)};
	}
runRobot(VillageState.random(), goalOrientedRobot, []);

//My code
function compareRobots(robot1, memory1, robot2, memory2) {
	let stepsRobot1 = 0;
	let stepsRobot2 = 0;
	let task ;
	
	for( let taskNum = 0; taskNum < 100; taskNum ++){
		task = VillageState.random();
		stepsRobot1 += runTask(task, robot1, memory1 );
		stepsRobot2 += runTask(task, robot2, memory2 );
	}
	console.log(`Robot 1 took on average ${stepsRobot1/100} steps to complete a task`);
	console.log(`Robot 2 took on average ${stepsRobot2/100} steps to complete a task`);
	
	function runTask(state, robot, memory) {
		  for (let turn = 0;; turn++) {
		    if (state.parcels.length == 0) {
		      return turn;
		      break;
		    }
		    let action = robot(state, memory);
		    state = state.move(action.direction);
		    memory = action.memory;
		  }
		}
}
compareRobots(routeRobot, [], goalOrientedRobot, []);

function myRobot({place, parcels}, route) {
  let minSteps;
  let shortestPath;
	
  for (let parcel of parcels) {
	if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
      if( (minSteps == undefined) || (route.length <= minSteps) ){
    	  minSteps = route.length;
		  shortestPath = route;
      }
      parcel
    } else {
      route = findRoute(roadGraph, place, parcel.address);
      if( (minSteps == undefined) || (route.length < minSteps) ){
    	  minSteps = route.length;
		  shortestPath = route;
      }
    }
  }
  return {direction: shortestPath[0], memory: shortestPath.slice(1)};
}
runRobot(VillageState.random(), myRobot, []);
compareRobots(goalOrientedRobot, [], myRobot, []);

class PGroup{
	
	constructor( values ){
		this.members = values;
	}

	add( value ){
		let newGroup = new PGroup(this.members);
		
		if( newGroup.members.indexOf(value) == -1){
			newGroup.members = newGroup.members.concat(Object.getPrototypeOf(value)==Array.prototype ? value:[value]);
		}
		return newGroup;
	}
	delete( value ){
		let newGroup = new PGroup(this.members);
		
		if( newGroup.members.indexOf(value) != -1){
			newGroup.members = newGroup.members.filter( (member) => {return member !== value} );
		}
		return newGroup;
	}
	has( value ){
		if( this.members.indexOf(value) != -1){
			return true;
		}else{
			return false;
		}
	}
}
PGroup.empty = new PGroup([]);
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));

