for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activecell, cellProp] = activeCell(address);

            let enteredData = activecell.innerText;

            if (enteredData === cellProp.value) {
                return;
            }
            cellProp.value = enteredData;
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);

        })

    }
}


let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown",async (e)=>{
    let inputValue = formulaBar.value;
    if (e.key === "Enter" && inputValue) {
        let address = addressBar.value;

        let [cell, cellProp] = activeCell(address);

        if (cellProp.formula !== inputValue) {
            removeChildFromParent(cellProp.formula);
        }


        addChildToGraphComponent(inputValue, address);
        let cycleResponse = isGraphCylic(graphComponentMatrix);
        if (cycleResponse) {
            // alert("Your formula is cyclic");
            let response = confirm("Your formula is cyclic. Do you want to trace your path?");
            while (response === true) {
                await isGraphCylicTracePath(graphComponentMatrix, cycleResponse);
                response = confirm("Your formula is cyclic. Do you want to trace your path?");
            }
            removeChildFromGraphComponent(inputValue, address);
            return;
        }

        let evalutaed = evaluateFormula(inputValue); //Data

     
        setCellUIAndCellProp(evalutaed,inputValue,address);
        addChildToParent(inputValue);

        updateChildrenCells(address);

    }
});

function removeChildFromGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDfromAddress(childAddress);
    let encodedFormula = formula.split(" ");

    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDfromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}


function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDfromAddress(childAddress);
    console.log("RID:>",crid," ",ccid);
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDfromAddress(encodedFormula[i]);

            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }

}

function updateChildrenCells(parentAddress) {

    let [parentCell, parentCellProp] = activeCell(parentAddress);
    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        
        let [child, childProp] = activeCell(children[i]);

        let childFormula = childProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue,childFormula,childAddress);
        updateChildrenCells(childAddress)
        
    }

}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);

        }
    }

}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);            
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;    
        }
    }
    let deocdedFormula = encodedFormula.join(" ");
    return eval(deocdedFormula)
}


function setCellUIAndCellProp(value, formula, address) {
    let [cell, cellProp] = activeCell(address);
  
    //UI changes
    cell.innerText = value;
    cellProp.value = value;
    cellProp.formula = formula;
}