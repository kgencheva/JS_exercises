class Group{
	constructor(){
		this.members = [];
	}
	add( value ){
		if( this.members.indexOf(value) == -1){
			this.members.push(value);
		}
	}
	delete( value ){
		if( this.members.indexOf(value) != -1){
			this.members = this.members.filter( (member) => {return member !== value} );
		}
	}
	has( value ){
		if( this.members.indexOf(value) != -1){
			return true;
		}else{
			return false;
		}
	}
	static from(object){
		let group = new Group();
		
		if(Symbol.iterator in object){
			for( let value of object){
				group.add( value );
			}
		}
		return group;
		
	}
}

class GroupIterator{
	constructor(group){
		this.index = 0;
		this.group = group;
	}
	
	next() {
		if( this.index == this.group.members.length ){
			return{ done: true };
		}
		let value = this.group.members[this.index];
		this.index++;
		return{ value, done:false };
	}
}

Group.prototype[Symbol.iterator] = function(){
	return new GroupIterator(this);
};

let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));

for (let value of Group.from(["a", "b", "c"])) {
	  console.log(value);
	}