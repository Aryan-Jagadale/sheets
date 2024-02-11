let rows = 100;
let columns = 26;

let cellsCont = document.querySelector(".cells-cont");
let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let addressBar = document.querySelector(".address-bar")


//Number column
for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class","address-col")
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol)
}


//Alphabet row
for (let j = 0; j < columns; j++) {

    let addressRow = document.createElement("div");
    addressRow.setAttribute("class","address-row")
    addressRow.innerText = String.fromCharCode(65 + j);
    addressRowCont.appendChild(addressRow)
}

//Cell layout
for (let i = 0;i < rows;i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");

    for (let j = 0;j < columns;j++) {

        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");
        //For  cell & storage attribution
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j)
        addListenerForAddressBarDisplay(cell,i,j)
        rowCont.appendChild(cell);
    }
    cellsCont.appendChild(rowCont);
}

function addListenerForAddressBarDisplay(cell,i,j) {
    cell.addEventListener("click",(e)=>{
        let rowID = i+1;
        let colID = String.fromCharCode(65 + j);
        addressBar.value = `${colID}${rowID}`;
        //Styling to cell;

    });
}




