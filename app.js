const container = document.querySelector('.container');
const sizeButton = document.querySelector('.select-size');
const clearButton = document.querySelector('.clear');
const rainbowButton = document.querySelector('.rainbow');
const colorSelect = document.querySelector('.color');
const colorMode = document.querySelector('.color-mode');
const slider = document.querySelector('.size-select');
const sliderDisplay = document.querySelector('.slider-display');
let currentColor = colorSelect.value;
let isMouseDown = 0;
let isRainbow = 0;
let size = 40;

const generateRandColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createGrid = (size) => {
  let divs = [];
  const numCells = size * size;
  for (let i = 0; i < numCells; i++) {
    const element = document.createElement('div');
    element.classList.add('grid-cell');
    element.style.height = `${640 / size}px`;
    element.style.width = `${640 / size}px`;
    divs.push(element);
  }
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  divs.forEach((div) => {
    container.appendChild(div);
    div.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isMouseDown = 1;
    });
    div.addEventListener(
      'click',
      (e) =>
        (div.style.backgroundColor =
          isRainbow === 1 ? generateRandColor() : currentColor)
    );
    div.addEventListener('mouseup', (e) => (isMouseDown = 0));
    div.addEventListener('mouseenter', (e) => {
      if (isMouseDown === 1)
        div.style.backgroundColor =
          isRainbow === 1 ? generateRandColor() : currentColor;
    });
  });
};

const resetGrid = () => {
  container.innerHTML = '';
  createGrid(size);
};

document.addEventListener('mousemove', (e) => {
  if (!e.target.classList.contains('grid-cell')) {
    isMouseDown = 0;
  }
});

clearButton.addEventListener('click', resetGrid);

colorSelect.addEventListener('input', (e) => (currentColor = e.target.value));

rainbowButton.addEventListener('click', () => {
  isRainbow = 1;
  rainbowButton.disabled = true;
  colorMode.disabled = false;
});

colorMode.addEventListener('click', (e) => {
  rainbowButton.disabled = false;
  colorMode.disabled = true;
  isRainbow = 0;
});

slider.addEventListener(
  'input',
  (e) => (sliderDisplay.textContent = `${e.target.value} X ${e.target.value}`)
);

slider.addEventListener('change', (e) => {
  size = e.target.value;
  resetGrid();
});

createGrid(size, isRainbow);
