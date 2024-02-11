let addSheetButtton = document.querySelector(".add-sheet-btn");
let sheetFolderCont = document.querySelector(".sheets-folder-cont");
let activeSheetColor = "#ced6e0";

addSheetButtton.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetsFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetsFolders.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet ${
    allSheetsFolders.length + 1
  }</div>`;
  sheetFolderCont.appendChild(sheet);

  //DB
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener("mousedown", (e) => {
    // Right click
    if (e.button !== 2) return;

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
      alert("You need to have atleast one sheet!!");
      return;
    }

    let response = confirm("Your sheet will be removed permanently, Are you sure?");
    if (response === false) return;
    let sheetIdx = Number(sheet.getAttribute("id"));

    // DB
    collectedSheetDB.splice(sheetIdx, 1);
    collectedGraphComponent.splice(sheetIdx, 1);

    // UI
    handleSheetUIRemoval(sheet);

    // By default DB to sheet 1 (active)
    sheetDB = collectedSheetDB[0];
    graphComponentMatrix = collectedGraphComponent[0];
    
    handleSheetProperties();




  });
}

function handleSheetUIRemoval(sheet) {
  sheet.remove();
  let allSheetFolders = document.querySelectorAll(".sheet-folder");

  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].setAttribute("id", i);
    let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i+1}`;
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  allSheetFolders[0].style.backgroundColor = activeSheetColor;
  
}


function handleSheetDB(sheetIdx) {
  sheetDB = collectedSheetDB[sheetIdx];
  graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }
  let firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIdx = Number(sheet.getAttribute("id"));
    handleSheetDB(sheetIdx);
    handleSheetProperties();
    handleSheetUI(sheet);
    // console.log(sheetDB);
  });
}

function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = activeSheetColor;
  sheet.style.padding = "6px 8px";
  sheet.style.fontSize="14px";
  sheet.style.borderRadius="4px";
  
  
}

function createSheetDB() {
  let sheetDB = [];
  for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < columns; j++) {
      let cellProps = {
        bold: false,
        italic: false,
        underLine: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: 14,
        fontColor: "#000000",
        bgColor: "#000000",
        value: "",
        formula: "",
        children: [],
        active:false
      };
      sheetRow.push(cellProps);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponent.push(graphComponentMatrix);
}
