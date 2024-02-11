// Storage
let collectedSheetDB = []; //Contains all SheetDB
let sheetDB = [];

{
  let addSheetBtn = document.querySelector(".add-sheet-btn");
  addSheetBtn.click();
}
// for (let i = 0; i < rows; i++) {
//   let sheetRow = [];
//   for (let j = 0; j < columns; j++) {
//     let cellProps = {
//       bold: false,
//       italic: false,
//       underLine: false,
//       alignment: "left",
//       fontFamily: "monospace",
//       fontSize: 14,
//       fontColor: "#000000",
//       bgColor: "#000000",
//       value:"",
//       formula:"",
//       children:[]
//     };
//     sheetRow.push(cellProps);
//   }
//   sheetDB.push(sheetRow);
// }

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");

let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d3e3fd";
let inactiveColorProp = "#ecf0f1";

//Two way binding---> Change in data as well as in UI

bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification
  cellProp.bold = !cellProp.bold; //Data
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change 1;
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp; // UI change (2)
  bold.style.borderRadius = cellProp.bold
  ? "3px"
  : "";

});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification
  cellProp.italic = !cellProp.italic; //Data
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI change (1)
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp; // UI change (2)
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification
  cellProp.underline = !cellProp.underline; //Data
  cell.style.textDecoration = cellProp.underline ? "underline" : ""; // UI change (1)
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp; // UI change (2)
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification
  cellProp.fontSize = fontSize.value; // Data change
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification
  cellProp.fontColor = fontColor.value; // Data change
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

BGcolor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.BGcolor = BGcolor.value; // Data change
  cell.style.backgroundColor = cellProp.BGcolor;
  BGcolor.value = cellProp.BGcolor;
});

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cellProp.fontFamily = fontFamily.value; // Data change
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

alignment.forEach((item) => {
  item.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    let alignValue = e.target.classList[0];
    console.log(alignValue);
    cellProp.alignment = alignValue;
    cell.style.textAlign = cellProp.alignment;

    switch(alignValue) { // UI change (2)
        case "left":
            leftAlign.style.backgroundColor = activeColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break;
        case "center":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = activeColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break;
        case "right":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = activeColorProp;
            break;
    }
  });
});

function activeCell(address) {
  let [rid, cid] = decodeRIDCIDfromAddress(address);
  
  //Access cell and storage
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRIDCIDfromAddress(address) {
  let rowID = Number(address.slice(1) - 1);
  let colID = Number(address.charCodeAt(0)) - 65;
  return [rowID, colID];
}


// Default cell properties;
function addListenertoAttachCellProps(cell) {
    cell.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [rid,cid] = decodeRIDCIDfromAddress(address);

        let cellProp = sheetDB[rid][cid];

        //Data Change
        cell.style.fontWeight = cellProp.bold ? "bold"  :"normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.textAlign = cellProp.alignment;

        //UI change
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;

        switch(cellProp.alignment) { // UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;

    })
}


let allCellS = document.querySelectorAll(".cell");
for (let i = 0; i < allCellS.length; i++) {
    addListenertoAttachCellProps(allCellS[i])
    
}

