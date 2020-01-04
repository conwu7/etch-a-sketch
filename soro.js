let buttons = document.querySelectorAll("button");
let gridSizeInput = document.getElementById('gridRange');

for (let i=0; i<buttons.length; i++) {
    let btn = buttons[i].id;
    if (btn != 'clearbtn' && btn != 'changeGridbtn' && btn!='changeColorbtn') {
        buttons[i].style.visibility = 'hidden';
        gridSizeInput.style.visibility='hidden';
        document.getElementById('spanOne').style.visibility = 'hidden';
        document.getElementById('spanTwo').style.visibility = 'hidden';

    }
}

let sketchColor = 'red';
let gridSize = 50;
let colorMode = 'default';

let sketchGrid = document.getElementById('sketchGrid');
sketchGrid.style.cssText = "display: grid; width: 500px; height: 500px";


makeSquareGrid();


function makeSquareGrid() {
    let squareLength = parseInt(sketchGrid.style.width)/gridSize;
    sketchGrid.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
    sketchGrid.style.gridTemplateRows = `repeat(${gridSize},1fr)`;

    for (let i=0; i<(gridSize*gridSize); i++) {
        let newDiv = document.createElement('DIV');
        sketchGrid.appendChild(newDiv);
        newDiv.style.backgroundColor = "antiquewhite";
        newDiv.addEventListener('mouseenter', sketch);
        newDiv.setAttribute('id', `btn${i}`);
    }

    clearGrid();

}

function changeGridShowRange() {
    document.getElementsByTagName('input')[0].style.visibility = 'visible';
    document.getElementById('spanOne').style.visibility = 'visible';
    document.getElementById('spanTwo').style.visibility = 'visible';
    document.getElementById('saveRange').style.visibility = 'visible';
}

function changeColorShowOptions() {
    for (let i=0; i<buttons.length; i++) {
        let btn = buttons[i].id;
        if (btn != 'clearbtn' && btn != 'changeGridbtn' && btn != 'changeColorbtn' &&  btn!='saveRange') {
            buttons[i].style.visibility = 'visible';
        }
    }
    buttons[2].style.display = 'none';
}

function clearGrid() {
    let numberOfBoxes = gridSize * gridSize;
    for (let i=0; i< numberOfBoxes; i++) {
        document.getElementById(`btn${i}`).style.backgroundColor = "lightgray";
    }
}

function changeGridSize(e) {
    gridSize = gridSizeInput.value;
    makeSquareGrid();
    document.getElementById('spanOne').style.visibility = 'hidden';
    document.getElementById('spanTwo').style.visibility = 'hidden';
    gridSizeInput.style.visibility = 'hidden';
    document.getElementById('saveRange').style.visibility = 'hidden';
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
    let targetId = e.target.id;
    switch (targetId) {
        case 'blackbtn':
            sketchColor='black';
            break;
        case 'randombtn':
            sketchColor=getRandomColor();
            break;
        default:
            sketchColor='green';
    }
    buttons[2].style.display = 'inline';
    for (let i=0; i<buttons.length; i++) {
        let btn = buttons[i].id;
        if (btn != 'clearbtn' && btn != 'changeGridbtn' && btn != 'changeColorbtn') {
            buttons[i].style.visibility = 'hidden';
        }
    }
}

function sketch(e) {
    e.preventDefault();
    if (colorMode == 'rainbow') {
        sketchColor = getRandomColor();
    }
    e.target.style.backgroundColor = sketchColor;
}

function sizePicked() {
    document.getElementById('spanTwo').textContent = gridSizeInput.value;
    document.getElementById('spanTwo').textContent += 'px';
}

function rainbowMode() {
    colorMode='rainbow';
    buttons[2].style.display = 'inline';
    for (let i=0; i<buttons.length; i++) {
        let btn = buttons[i].id;
        if (btn != 'clearbtn' && btn != 'changeGridbtn' && btn != 'changeColorbtn') {
            buttons[i].style.visibility = 'hidden';
        }
    }
    document.getElementById('rainbowbtn').style.visibility = 'hidden';
}

buttons[0].addEventListener('click', changeGridShowRange);
buttons[2].addEventListener('click', changeColorShowOptions);
buttons[3].addEventListener('click', changeColor);
buttons[4].addEventListener('click', changeColor);
buttons[6].addEventListener('click',clearGrid);
buttons[1].addEventListener('click', changeGridSize);
gridSizeInput.addEventListener('mousemove', sizePicked);
buttons[5].addEventListener('click', rainbowMode);