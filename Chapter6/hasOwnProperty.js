let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.getPrototypeOf(map).hasOwnProperty.call(map, "one"));
