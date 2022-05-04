const container = document.querySelector('.container');
const sizeButton = document.querySelector('.select-size');
const clearButton = document.querySelector('.clear');

const createGrid = (cells) => {
  let divs = [];
  const numCells = cells * cells;
  for (let i = 0; i < numCells; i++) {
    const element = document.createElement('div');
    element.classList.add('grid-cell');
    element.style.height = `${640 / cells}px`;
    element.style.width = `${640 / cells}px`;
    divs.push(element);
  }
  container.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
  divs.forEach((div) => container.appendChild(div));
  divs.forEach((div) =>
    div.addEventListener(
      'mouseenter',
      (e) => (div.style.backgroundColor = 'black')
    )
  );
};

const clearGrid = () => (container.innerHTML = '');

sizeButton.addEventListener('click', (e) => {
  clearGrid();
  let input = prompt('Please enter desired grid size up to 99x99, e.g. 40x40');
  input = input.match(/[0-9][0-9]/g)[0];
  createGrid(Number(input));
});

clearButton.addEventListener('click', clearGrid);

createGrid(16);
