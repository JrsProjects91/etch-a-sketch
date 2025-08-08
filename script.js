const body = document.querySelector("body")
const clearButton= document.querySelector("#clear")
const updateGridButton = document.querySelector('#update')
const gridSizeDom = document.querySelector("#grid-size")
const colorToggleButton = document.querySelector('#colorToggle');
const colorDisplayDom = document.querySelector('#colorDisplay')

const randomRgb = (num) => Math.floor(Math.random() * num);


clearButton.addEventListener("click", () => {
    const grids = document.querySelectorAll(".grid-element")
    grids.forEach((grid )=> {
        grid.classList.remove("coloredIn")
        console.log(grid)
    })
})


const createElement = (type,className,id) => {
    const element = document.createElement(`${type}`);
    element.className = className;
    element.id = id;
    if (className === "grid-element") {
            element.addEventListener("mouseover", () => {
        element.classList.add("coloredIn")
        if (colorDisplayDom.textContent === "CURRENT COLOR: BLACK") {
            element.style.backgroundColor === "rgb(0,0,0)"
        } else {
            element.style.backgroundColor = `rgb(${randomRgb(256)}, ${randomRgb(256)}, ${randomRgb(256)})`    //${randomRgb}, ${randomRgb}, ${randomRgb}
        }
    })
    }
    return element;
    
}


function createDivGrid(gridSize) {
    const gridContainer = createElement("div", "etch-container", 'contain')
    gridSizeDom.textContent = `${gridSize} x ${gridSize}`
    for (r=0; r < gridSize; r++) {
        const row = createElement("div", "gridRow", `r${r + 1}`);
        for (g = 0; g < gridSize; g++) {
            row.appendChild(createElement("div", "grid-element", `g${g + 1}`))
        }
        gridContainer.appendChild(row)
    }
    body.appendChild(gridContainer);

}

function updateDivGrid(gridSize) {
    const element = document.querySelector(".etch-container");
    element.remove();
    createDivGrid(gridSize);
}

updateGridButton.addEventListener("click", () => {
    updateDivGrid(prompt("New Grid Length? Smaller Than 100"))
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

createDivGrid(50)

console.log(randomRgb(256))