function every(array, test) {
    return !(array.some(n => !(test(n))));
}

/*function every(array, test) {

    for( let element of array ){
        if(!test(element)){
            return false;
        }
    }
    return true;
}
*/
console.log(every([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));