const body = document.querySelector("body")
const clearButton= document.querySelector("#clear")
const updateGridButton = document.querySelector('#update')
const gridSizeDom = document.querySelector("#grid-size")

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

createDivGrid(50)

