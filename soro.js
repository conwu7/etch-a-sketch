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


//other variables
let sketchColor = '#ff0000';
let gridSize = 35;
let rainbowMode = false;
let opacityMode = false;

let isMouseDown = false;

//initializations
gridSizeInput.value = gridSize;
document.getElementById('spanTwo').textContent = gridSize;

sketchGrid.style.cssText = "display: grid; width: 550px; height: 400px;";
sketchGrid.style.gridGap = '1px';

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
        newDiv.style.backgroundColor = "antiquewhite";
        newDiv.addEventListener("dblclick", setMouseDown);
        newDiv.addEventListener('mouseenter', sketch);
        newDiv.setAttribute('id', `btn${i}`);
        newDiv.style.transition = "600ms ease";
    }

    clearGrid();
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
        document.getElementById(`btn${i}`).style.cssText = "opacity: ; background-color: lightgray;"
    }
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
    rainbowMode = false;
    rainbowbutton.classList.remove("modeActivated");
    let targetId = e.target.id;
    switch (targetId) {
        case 'colorPickerInput':
            sketchColor = colorPickerInput.value;
            break;
        case 'randombtn':
            sketchColor = getRandomColor();
            break;
        default:
            console.log('default');
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

    if (opacityMode && rgbalpha < 1) {
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

//event listeners
clearbutton.addEventListener('click',clearGrid);
saveRangebutton.addEventListener('click', changeGridSize);
gridSizeInput.addEventListener('mousemove', sizePicked);
rainbowbutton.addEventListener('click', rainbowModeFunc);
opacitybutton.addEventListener('click',opacityToggle);
colorPickerInput.addEventListener('change', changeColor);