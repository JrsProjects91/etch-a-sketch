const etchContainer = document.querySelector(".etch-container")
const clearButton= document.querySelector("button")

clearButton.addEventListener("click", () => {
    const grids = document.querySelectorAll(".grid")
    grids.forEach((grid )=> {
        grid.classList.remove("coloredIn")
        console.log(grid)
    })
})


const createElement = (type,className,id) => {
    const element = document.createElement(`${type}`);
    element.className = className;
    element.id = id;
    element.addEventListener("mouseover", () => {
        element.classList.add("coloredIn")
    })
    return element;
    
}


function createDivGrid(gridSize) {
    const square = gridSize * gridSize
    for (i=0; i < square; i++) {
        etchContainer.appendChild(createElement("div", "grid", `n${i + 1}`));

    }
}

createDivGrid(16)

