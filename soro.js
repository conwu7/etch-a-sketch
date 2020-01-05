let buttons = document.querySelectorAll(".controlsContainer button");

//divs
let sketchGrid = document.getElementById('sketchGrid');

//inputs
let gridSizeInput = document.getElementById('gridRange');
let colorPickerInput = document.getElementById('colorPickerInput');

//buttons
let opacitybutton = document.getElementById('opacitybtn');
let rainbowbutton = document.getElementById('rainbowbtn');
let changeGridbutton = document.getElementById('changeGridbtn');
let saveRangebutton = document.getElementById('saveRangebtn');
let changeColorbutton = document.getElementById('changeColorbtn');
let randomColorbutton = document.getElementById('randombtn');
let blackbutton = document.getElementById('blackbtn');
let clearbutton = document.getElementById('clearbtn');
let eraserbutton = document.getElementById('erasebtn');



//other variables
let sketchColor = '#ff0000';
let gridSize = 35;
let rainbowMode = false;
let opacityMode = false;
let eraseMode = false;
let lastSketchColor = null;

let john = 'john';
console.log(`${john}`);

let isMouseDown = false;

//initializations
gridSizeInput.value = gridSize;
document.getElementById('spanTwo').textContent = gridSize;

sketchGrid.style.cssText = "display: grid; width: 900px; height: 900px;";
sketchGrid.style.gridGap = '2px';

colorPickerInput.style.textAlign = 'center';

makeSquareGrid();

//functions
function makeSquareGrid() {
    while (sketchGrid.firstChild) {
        sketchGrid.removeChild(sketchGrid.firstChild);
    }
    sketchGrid.style.gridTemplateColumns = `repeat(${gridSize},auto)`;
    sketchGrid.style.gridTemplateRows = `repeat(${gridSize},auto)`;


    for (let i=0; i<(gridSize*gridSize); i++) {
        let newDiv = document.createElement('DIV');
        sketchGrid.appendChild(newDiv);
        newDiv.addEventListener("click", setMouseDown);
        newDiv.addEventListener('mouseenter', sketch);
        newDiv.setAttribute('id', `btn${i}`);
        newDiv.style.backgroundColor = "ivory";
        newDiv.style.transition = "300ms ease";
    }

    document.getElementById("defaultSizeSpan").innerHTML = `${gridSize} by ${gridSize}`;
}

function changeGridSize(e) {
    gridSize = gridSizeInput.value;
    makeSquareGrid();
}

function changeColorShowOptions() {

}

function clearGrid() {
    let numberOfBoxes = gridSize * gridSize;
    for (let i=0; i< numberOfBoxes; i++) {
        document.getElementById(`btn${i}`).classList.add("clearDivsAnimation");
        document.getElementById(`btn${i}`).classList.remove("clearDivsAnimation");
    }
    for (let i=0; i< numberOfBoxes; i++) {
        document.getElementById(`btn${i}`).style.opacity ="";
        document.getElementById(`btn${i}`).style.backgroundColor = "ivory";
    }
    isMouseDown = false;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColor(e) {
    if (e.target.id == "colorPickerInput") {
        eraseMode = false;
        eraserbutton.classList.remove("modeActivated");
    }
    rainbowMode = false;
    rainbowbutton.classList.remove("modeActivated");
    let targetId = e.target.id;
    switch (targetId) {
        case 'colorPickerInput':
            sketchColor = colorPickerInput.value;
            break;

        case 'erasebtn':
            if (eraseMode) {
                sketchColor = 'ivory';
                break;
            }
    }
}

function setMouseDown() {
    switch (isMouseDown) {
        case false:
            isMouseDown = true;
            break;
        case true:
            isMouseDown = false;
    }
}

function setMouseUp() {
    isMouseDown = false;
}


function sketch(e) {
    e.preventDefault();
    let rgbalpha;
    if (rainbowMode) {
        sketchColor = getRandomColor();
    }

    if (!e.target.style.opacity) {
        rgbalpha = 0;
    } else {
        rgbalpha = Number(e.target.style.opacity)
    }

    if (opacityMode && rgbalpha < 1 && isMouseDown) {
        rgbalpha += 0.2;
        e.target.style.opacity = `${rgbalpha}`;
    }

    if (!opacityMode) {
        e.target.style.opacity = '1';
    }

    if (isMouseDown) {
        e.target.style.backgroundColor = sketchColor;
    }

}

function sizePicked() {
    document.getElementById('spanTwo').textContent = gridSizeInput.value;
}

function rainbowModeFunc(e) {
    if (eraseMode) {
        eraseMode = false;
        eraserbutton.classList.remove('modeActivated');
    }
    switch (rainbowMode) {
        case true:
            rainbowMode = false;
            e.target.classList.remove("modeActivated");
            colorPickerInput.value = sketchColor;
            break;
        case false:
            rainbowMode = true;
            e.target.classList.add("modeActivated");
            colorPickerInput.value = 'click here'
            colorPickerInput.style.backgroundColor = 'white';
            colorPickerInput.style.color = "coral";
            break;
    }
}

function opacityToggle(e) {
    if (eraseMode) {
        eraseMode = false;
        eraserbutton.classList.remove('modeActivated');
    }

    switch (opacityMode) {
        case true:
            opacityMode = false;
            e.target.classList.remove("modeActivated");
            break;
        case false:
            opacityMode = true;
            e.target.classList.add("modeActivated");
            break;
        default:
            console.log('mode found');
    }
}

function erase(e) {
    if (opacityMode) {
        opacityMode = false;
        opacitybutton.classList.remove("modeActivated");
    }
    if (rainbowMode) {
        rainbowMode = false;
        rainbowbutton.classList.remove("modeActivated");
    }

    switch (eraseMode) {
        case true:
            eraseMode = false;
            e.target.classList.remove("modeActivated");
            sketchColor = lastSketchColor;
            break;
        case false:
            eraseMode = true;
            e.target.classList.add("modeActivated");
            lastSketchColor = `${sketchColor}`;
            break;
    }
    changeColor(e);
}

//event listeners
clearbutton.addEventListener('click',clearGrid);
saveRangebutton.addEventListener('click', changeGridSize);
gridSizeInput.addEventListener('mousemove', sizePicked);
rainbowbutton.addEventListener('click', rainbowModeFunc);
opacitybutton.addEventListener('click',opacityToggle);
colorPickerInput.addEventListener('change', changeColor);
eraserbutton.addEventListener('click',erase);