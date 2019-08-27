let size = 8;
let symFull = "#";
let symBlank = " ";
let lineToPrint;
for( let row = 0; row < size; row++ ){
    lineToPrint = "";
    for( let col = 0; col < size; col++ ){
        if( (row+col)%2 == 0 ){
            lineToPrint += symBlank;
        }else{
            lineToPrint += symFull;
        }
    }
    console.log(lineToPrint);
}
