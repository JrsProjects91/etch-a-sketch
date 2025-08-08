const body = document.querySelector("body")
const clearButton= document.querySelector("#clear")
const updateGridButton = document.querySelector('#update')
const gridSizeDom = document.querySelector("#grid-size")
const colorToggleButton = document.querySelector('#colorToggle');
const colorDisplayDom = document.querySelector('#colorDisplay')
const gridContainer = document.querySelector(".etch-container")
const pencilButton = document.createElement("button", "", "pencil")
const penButton = document.createElement("button", "", "pen")
let pencil = true;
let pen = false

const curOpacity = (e) => e.style.opacity;

const randomRgb = (num) => Math.floor(Math.random() * num);

function createBottomButtons() {
    const bottomButtonContainer = createElement("div", "bottomButtonContainer", "")
    penButton.textContent = "Pen"
    pencilButton.textContent = "Pencil"
    const toolDisplayDOM = createElement("div", "", "toolDisplay")
    if (pencil) {
        toolDisplayDOM.textContent = "Current Tool: Pencil"
    } else {
        toolDisplayDOM.textContent = "Current Tool: Pen"
    }
    bottomButtonContainer.appendChild(pencilButton)
    bottomButtonContainer.appendChild(penButton)
    bottomButtonContainer.appendChild(toolDisplayDOM)
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


const createElement = (type,className,id) => {
    const element = document.createElement(`${type}`);
    element.className = className;
    element.id = id;
    if (className === "grid-element") {
            element.addEventListener("mouseover", (e) => {
                if (e.target.style.filter === "") {
                    e.target.style.filter = 'brightness(100%)'
                }
                const curOpacity = e.target.style.filter
                const curBrightness = Number(curOpacity.match(/\d+/g));
                if(e.target.className === "grid-element") {
    
                 if (colorDisplayDom.textContent === "CURRENT COLOR: BLACK") {
                    e.target.classList.add("black")
                     element.style.backgroundColor === "rgb(0,0,0)"
                     if (pencil) {
                         e.target.style.filter = `brightness(${Number(e.target.style.filter.match(/\d+/g)) - 10}%)`;
                     } else {
                        element.style.filter = "brightness(0%)"
                     }
                 } else {
                    e.target.classList.add("color")
                     element.style.backgroundColor = `rgb(${randomRgb(256)}, ${randomRgb(256)}, ${randomRgb(256)})`    //${randomRgb}, ${randomRgb}, ${randomRgb}
                     if (pencil) {
                         e.target.style.filter = `brightness(${Number(e.target.style.filter.match(/\d+/g)) - 10}%)`;
                     } else {
                        element.style.filter = "brightness(100%)"
                     }
                 }
            } else {
                    
                    if (pencil && colorDisplayDom.textContent === "CURRENT COLOR: BLACK") {
                       e.target.style.filter = `brightness(${Number(e.target.style.filter.match(/\d+/g)) - 10}%)`;
                    } else if (pen && colorDisplayDom.textContent === "CURRENT COLOR: BLACK"){
                        e.target.style.filter = "brightness(0%)"
                    } else if (pencil) {
                        if (e.target.className !== "grid-element color") {
                            element.style.backgroundColor = `rgb(${randomRgb(256)}, ${randomRgb(256)}, ${randomRgb(256)})`
                            e.target.style.filter = 'brightness(100%)'
                            e.target.className = 'grid-element color'
                        } else {
                            e.target.style.filter = `brightness(${Number(e.target.style.filter.match(/\d+/g)) - 10}%)`;
                        }
                    } else if (pen) {
                        if (e.target.className !== 'grid-element color')
                        {
                        element.style.backgroundColor = `rgb(${randomRgb(256)}, ${randomRgb(256)}, ${randomRgb(256)})`
                        e.target.style.filter = "brightness(100%)"
                        e.target.className = "grid-element-color"
                        }

                    }
        }
    })
    }
    return element;
    
}


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
    body.appendChild(gridContainer);
    document.querySelectorAll(".grid-element").forEach((element) => {

        element.style.width = `${(700 / gridSize) - 2}px`;
    })

}

function updateDivGrid(gridSize) {
    gridContainer.innerHTML = ""
    createDivGrid(gridSize);
    createBottomButtons();
    
}

updateGridButton.addEventListener("click", () => {
    const num = Number(prompt("New Grid Length? Smaller Than 100"))

    if (num < 1 || num > 100 || !num){
        alert("Number is invalid, Please choose an interger between 1 and 100")
    } else {
            updateDivGrid(num)
    }

})

colorToggleButton.addEventListener("click", () => {
    if (colorToggleButton.textContent === "Change Color To Random") {
        colorDisplayDom.textContent = "CURRENT COLOR: Random"
        colorToggleButton.textContent = "Change Color To Black"
    } else {
        colorDisplayDom.textContent = "CURRENT COLOR: BLACK"
        colorToggleButton.textContent = "Change Color To Random"
    }
})

penButton.addEventListener("click", () => {
    pen = true;
    pencil = false
    document.querySelector("#toolDisplay").textContent = "Current Tool: Pen"
})

pencilButton.addEventListener("click", () => {
    pen = false;
    pencil = true
    document.querySelector("#toolDisplay").textContent = "Current Tool: Pencil"
})

createDivGrid(50)
createBottomButtons()


const gridElement = document.querySelector(`.grid-element`)


