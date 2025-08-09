const body = document.querySelector("body")
const clearButton= document.querySelector("#clear")
const updateGridButton = document.querySelector('#update')
const gridSizeDom = document.querySelector("#grid-size")
const colorButton = document.querySelector('#color-button');
const blackButton = document.querySelector('#black-button');
const gridContainer = document.querySelector(".etch-container")
let pencil = true;
let pen = false
let erase = false;

const curOpacity = (e) => e.style.opacity;
const randomRgb = (num) => Math.floor(Math.random() * num);
const randomColor = () =>  `rgb(${randomRgb(256)}, ${randomRgb(256)}, ${randomRgb(256)})`;
const lowerBrightnessByTen = (e) => `brightness(${Number(e.target.style.filter.match(/\d+/g)) - 10}%)`;

function createBottomButtons() {
    const bottomButtonContainer = createElement("div", "bottomButtonContainer", "")
    penButton.textContent = "Pen"
    pencilButton.textContent = "Pencil"
    eraseButton.textContent = 'Eraser'
    bottomButtonContainer.style.fontSize = 'larger'
    checkDrawTool(pen, erase)
    bottomButtonContainer.appendChild(pencilButton)
    bottomButtonContainer.appendChild(penButton)
    bottomButtonContainer.appendChild(eraseButton)
    body.appendChild(bottomButtonContainer)
}

clearButton.addEventListener("click", () => {
    const grids = document.querySelectorAll(".grid-element")
    grids.forEach((grid )=> {
        grid.style.backgroundColor = "gray"
        grid.style.filter = ''
        grid.classList.remove("color")
    })
})

const toggleButtonColors = (word) => {
    if (word === 'black') {
        document.querySelector('#black-button').style.backgroundColor = 'lightgreen';
        document.querySelector('#color-button').style.backgroundColor = 'white';
    } else {
        document.querySelector('#color-button').style.backgroundColor = 'lightgreen';
        document.querySelector('#black-button').style.backgroundColor = 'white';
    }
}

const handleColorChanges = (element, className) => {
    const isCurColorBlack = () => document.querySelector('#black-button').style.backgroundColor === "lightgreen"
        if (className === "grid-element") {
            element.addEventListener("mouseover", (e) => {
                const target = e.target;
                if (erase) {
                    target.className = 'grid-element'
                    target.style.filter = ""
                    target.style.backgroundColor = 'gray'
                } else {
                                 if (target.style.filter === "") {
                    target.style.filter = 'brightness(100%)'
                }
                const curOpacity = target.style.filter
                const curBrightness = Number(curOpacity.match(/\d+/g));
                if(target.className === "grid-element") {
                 if (isCurColorBlack()) {
                    target.classList.add("black")
                    toggleButtonColors("black")
                     element.style.backgroundColor === "rgb(0,0,0)";
                     (pencil) ? target.style.filter = lowerBrightnessByTen(e) : element.style.filter = "brightness(0%)";
                 } else {
                    console.log('should only be on empty random color')
                    target.classList.add("color")
                    toggleButtonColors("color")
                     element.style.backgroundColor = randomColor();
                     (pencil) ? target.style.filter = lowerBrightnessByTen(e) : element.style.filter = "brightness(100%)"
                 }
            } else {
                    if (pencil && isCurColorBlack()) {
                       target.style.filter = lowerBrightnessByTen(e)
                    } else if (pen && isCurColorBlack()){
                       target.style.filter = "brightness(0%)"
                    } else if (pencil && !isCurColorBlack()) {
                        if (target.className !== "grid-element color") {
                            element.style.backgroundColor = randomColor();
                           target.style.filter = 'brightness(100%)'
                           target.className = 'grid-element color'
                        } else {
                            target.style.filter = lowerBrightnessByTen(e);
                        }
                    } else if (pen && !isCurColorBlack()) {
                        if (target.className !== 'grid-element color')
                        {
                        element.style.backgroundColor = randomColor();
                        target.style.filter = 'brightness(100%)'
                        target.className = "grid-element color"
                        }
                    }
        }
                }
    })
    }
}

const createElement = (type,className,id) => {
    const element = document.createElement(`${type}`);
    element.className = className;
    element.id = id;
    handleColorChanges(element, className)
    return element;
}

const pencilButton = createElement("button", "", "pencil")
const penButton = createElement("button", "", "pen")
const eraseButton = createElement("button", "", 'erase')

function createDivGrid(gridSize) {
    gridSizeDom.textContent = `${gridSize} x ${gridSize}`
    for (r=0; r < gridSize; r++) {
        const row = createElement("div", "gridRow", `r${r + 1}`);
        for (g = 0; g < gridSize; g++) {
            const newGrid = createElement("div", "grid-element", `g${g + 1}`)
            row.appendChild(newGrid)
        }
        gridContainer.appendChild(row)
    }
    const lastChild = document.querySelector('.bottomButtonContainer')
    body.insertBefore(gridContainer,lastChild );
    document.querySelectorAll(".grid-element").forEach((element) => {
        element.style.width = `${(700 / gridSize) - 2}px`;
    })
}

function updateDivGrid(gridSize) {
    gridContainer.innerHTML = ""
    createDivGrid(gridSize);
}

updateGridButton.addEventListener("click", () => {
    const num = Number(prompt("New Grid Length? Smaller Than 100"));
    (num < 1 || num > 100 || !num) ? alert("Number is invalid, Please choose an interger between 1 and 100") : updateDivGrid(num);
})

blackButton.addEventListener("click", () => {
    toggleButtonColors('black')
})
colorButton.addEventListener("click", () => {
    toggleButtonColors('color')
})
penButton.addEventListener("click", (e) => {
    setDrawTool('pen')
    e.target.style.backgroundColor = 'lightgreen'
    document.querySelector('#pencil').style.backgroundColor = 'white'
    document.querySelector('#erase').style.backgroundColor = 'white'
})
pencilButton.addEventListener('click', (e) => {
    setDrawTool('pencil')
    e.target.style.backgroundColor = 'lightgreen'
    document.querySelector('#pen').style.backgroundColor = 'white'
     document.querySelector('#erase').style.backgroundColor = 'white'
})

eraseButton.addEventListener('click', (e) => {
    setDrawTool('eraser')
    e.target.style.backgroundColor = 'lightGreen'
    document.querySelector('#pen').style.backgroundColor = 'white'
    document.querySelector('#pencil').style.backgroundColor = 'white'

})

const setDrawTool = (toolBool) => {
    if (toolBool === 'pen' || toolBool === 'pencil') {
        (toolBool === 'pen') ? (pen = true, pencil = false, erase = false) : (pencil = true, pen = false, erase = false)
    } else {
        pen = false;
        pencil = false;
        erase = true;
    }
}

const checkDrawTool = (penBool, eraseBool) => {
    let penColor = penButton.style.backgroundColor;
    let pencilColor = pencilButton.style.backgroundColor;
    let eraseColor = eraseButton.style.backgroundColor;

    if (!eraseBool) {
        (penBool === 'true') ? (penColor = 'lightgreen', pencilColor = 'white', eraseColor = 'white') 
    : (pencilColor = 'lightgreen', penColor = 'white', eraseColor = 'white');
    } else {
        eraseColor = 'lightgreen'; pencilColor = 'white'; penColor = 'white';
    }
}

blackButton.style.backgroundColor = 'lightgreen'
createBottomButtons()
createDivGrid(50)
const gridElement = document.querySelector(`.grid-element`)



