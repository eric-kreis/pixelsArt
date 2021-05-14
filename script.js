// Gera um número hexadecimal e adiciona à uma string.
function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}

// Cria elementos da paletta.
function createPaletteElement(ID, color) {
  const colorPalette = document.getElementById('color-palette');
  const createDiv = document.createElement('div');
  createDiv.className = 'color';
  createDiv.id = ID;
  createDiv.style.backgroundColor = color;
  colorPalette.appendChild(createDiv);
}

// Cria os pixels da board de pixels.
function createPixelBaordElement(numero) {
  const pixelBoard = document.getElementById('pixel-board');
  for (let index = 0; index < numero; index += 1) {
    const line = document.createElement('div');
    line.classList.add('pixels-line');
    for (let index = 0; index < numero; index += 1) {
      const column = document.createElement('div');
      column.classList.add('pixel');
      line.appendChild(column);
    }
    pixelBoard.appendChild(line);
  }
  
}

// Cria o elemento preto e branco, e os com cores aleatórias.
function makeColors() {
  createPaletteElement('color1', 'black');
  for (let index = 2; index <= 12; index += 1) {
    createPaletteElement(`color${index}`, generateRandomColor());
  }
}

// A classe selected é atribuida para um elemento.
function initialColor(ID) {
  const corInicial = document.getElementById(ID);
  corInicial.className += ' selected';
}

// Muda o elemento que recebe a classe selected
function changeSelected(elemento) {
  const selected = document.querySelector('.selected');
  selected.className = 'color';
  elemento.target.classList.add('selected');
}

// Adiciona a funcao 'changeSelected' ao evento click de Id's específicos
function changeSelectedClick() {
  const palleteColors = document.querySelectorAll('.color');
  for (const color of palleteColors) {
    color.addEventListener('click', changeSelected);
  }
}

// Muda a cor de um elemento específico.
function changeColor(elemento) {
  const selectedColor = document.querySelector('.selected');
  const compStyle = window.getComputedStyle(selectedColor).getPropertyValue('background-color');
  elemento.target.style.backgroundColor = compStyle;
}

// Muda a cor de um dos pixels da board.
function changeColorClick() {
  const pixels = document.querySelectorAll('.pixel');
  for (const pixel of pixels) {
    pixel.addEventListener('click', changeColor);
  }
}

function scrambleClick() {
  const colorPalette = document.getElementById('color-palette');
  colorPalette.innerHTML = '';
  makeColors();
  initialColor('color1');
  changeSelectedClick();
  changeColorClick();
  clearBoardClick();
  createScrambleButton();
  scramble();
}

function scramble() {
  const scrambleButton = document.getElementById('scramble');
  scrambleButton.addEventListener('click', scrambleClick);
}

// Cria botao que muda as cores.
function createScrambleButton() {
  const colorPalette = document.getElementById('color-palette');
  const scrambleButton = document.createElement('button');
  scrambleButton.classList.add('botao');
  scrambleButton.id = 'scramble';
  scrambleButton.innerHTML = '&#8634';
  colorPalette.appendChild(scrambleButton);
}

// Botão que deixa o background de todos os pixels da board como 'white'.
function clearBoard() {
  const pixels = document.querySelectorAll('.pixel');
  for (const pixel of pixels) {
    pixel.style.backgroundColor = 'white';
  }
}

// Adiciona a funcao 'clearBoard' ao clique do botão 'Limpar'.
function clearBoardClick() {
  const clearButton = document.getElementById('clear-board');
  clearButton.addEventListener('click', clearBoard);
}

// Muda o tamanho do board de acordo com o input do usuário, entre 5 e 50.
function userBoarder() {
  const userInput = document.getElementById('board-size');
  const numberInput = userInput.value;
  let numberOfInput = 0;
  if (numberInput < 5) {
    numberOfInput = 5;
  } else if (numberInput > 50) {
    numberOfInput = 50;
  } else {
    numberOfInput = numberInput;
  }
  const finalNumber = numberOfInput;
  if (userInput.value.length < 1) {
    return alert('Adicione um valor para mudar o tamanho!'), createPixelBaordElement(5);
  } return finalNumber;
}

// Chama funções de acordo com o evento clicar no botao de mudar o tamanho.
function finalBoarderElements() {
  const pixelBoard = document.getElementById('pixel-board');
  const vqvButton = document.getElementById('generate-board');
  const input = document.getElementById('board-size');
  createPixelBaordElement(5);

  vqvButton.addEventListener('click', () => {
    pixelBoard.innerHTML = '';
    createPixelBaordElement(userBoarder());
    changeSelectedClick();
    changeColorClick();
    clearBoardClick();
    input.value = '';
  });

  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      pixelBoard.innerHTML = '';
      createPixelBaordElement(userBoarder());
      changeSelectedClick();
      changeColorClick();
      clearBoardClick();
      input.value = '';
    }
  });
}

// No momento que a página é carregada chama todas as funções em ordem.
window.onload = function pixelsArt() {
  finalBoarderElements();
  makeColors();
  initialColor('color1');
  changeSelectedClick();
  changeColorClick();
  clearBoardClick();
  createScrambleButton();
  scramble();
};
