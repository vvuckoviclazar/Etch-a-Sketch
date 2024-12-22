"use strict";

const gridDiv = document.querySelector(".right");
const colorMode = document.querySelector(".colorMode");
const randomMode = document.querySelector(".randomMode");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const colorInput = document.querySelector(".colorInput");
const sizeSpan1 = document.querySelector(".sizeSpan1");
const sizeSpan2 = document.querySelector(".sizeSpan2");
const rangeInput = document.querySelector(".rangeInput");

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function gameCreator() {
  let currentColor;
  let randomModeActive = false;

  const setCurrentColor = (value) => {
    currentColor = value;
  };

  const getCurrentColor = () => {
    return currentColor;
  };

  const enableRandomMode = () => {
    randomModeActive = true;
  };

  const switchRandomMode = () => {
    randomModeActive = !randomModeActive;
  };

  const setRandomModeActive = () => randomModeActive;

  return {
    setCurrentColor,
    getCurrentColor,
    enableRandomMode,
    switchRandomMode,
    setRandomModeActive,
  };
}

function updateUI() {
  const setElementBackgroundColor = (element, background) => {
    element.style.backgroundColor = background;
  };

  const setElementTextColor = (element, color) => {
    element.style.color = color;
  };

  const setCellBackground = (cell) => {
    cell.style.backgroundColor = "white";
  };

  return {
    setElementBackgroundColor,
    setElementTextColor,
    setCellBackground,
  };
}

function sizeCreator() {
  let sizeValue = 0;
  let currentSize = 0;

  const setSize = (value) => {
    sizeValue = value;
  };

  const setCurrentSize = () => {
    currentSize = sizeValue;
  };

  const getCurrentSize = () => currentSize;

  return {
    setSize,
    setCurrentSize,
    getCurrentSize,
  };
}

const sketch = gameCreator();
const ui = updateUI();
const size = sizeCreator();

for (let i = 0; i < 16 * 16; i++) {
  const cell = document.createElement("div");
  cell.className = "grid-item";
  gridDiv.appendChild(cell);
}

function updateGrid(size) {
  gridDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function updateGridColumnsRows(size) {
  gridDiv.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "grid-item";
    gridDiv.appendChild(cell);
  }

  const cells = document.querySelectorAll(".grid-item");

  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      if (sketch.setRandomModeActive()) {
        cell.style.backgroundColor = getRandomColor();
      } else {
        cell.style.backgroundColor = sketch.getCurrentColor();
      }
    });
  });
}

rangeInput.addEventListener("input", () => {
  size.setSize(Number(rangeInput.value));
  size.setCurrentSize();
  sizeSpan1.textContent = size.getCurrentSize();
  sizeSpan2.textContent = size.getCurrentSize();
  updateGrid(size.getCurrentSize());
  updateGridColumnsRows(size.getCurrentSize());
});

colorInput.addEventListener("input", () => {
  sketch.setCurrentColor(colorInput.value);
});

colorMode.addEventListener("click", () => {
  ui.setElementBackgroundColor(colorMode, "white");
  ui.setElementTextColor(colorMode, "black");
  ui.setElementBackgroundColor(randomMode, "black");
  ui.setElementTextColor(randomMode, "white");
  ui.setElementBackgroundColor(eraser, "black");
  ui.setElementTextColor(eraser, "white");
  sketch.setCurrentColor(colorInput.value);
  if (sketch.setRandomModeActive()) {
    sketch.switchRandomMode();
  }
});

randomMode.addEventListener("click", () => {
  ui.setElementBackgroundColor(randomMode, "white");
  ui.setElementTextColor(randomMode, "black");
  ui.setElementBackgroundColor(colorMode, "black");
  ui.setElementTextColor(colorMode, "white");
  ui.setElementBackgroundColor(eraser, "black");
  ui.setElementTextColor(eraser, "white");
  sketch.switchRandomMode();
});

eraser.addEventListener("click", () => {
  ui.setElementBackgroundColor(eraser, "white");
  ui.setElementTextColor(eraser, "black");
  ui.setElementBackgroundColor(colorMode, "black");
  ui.setElementTextColor(colorMode, "white");
  ui.setElementBackgroundColor(randomMode, "black");
  ui.setElementTextColor(randomMode, "white");
  sketch.setCurrentColor("white");
  if (sketch.setRandomModeActive()) {
    sketch.switchRandomMode();
  }
});

clear.addEventListener("click", () => {
  ui.setElementBackgroundColor(colorMode, "black");
  ui.setElementTextColor(colorMode, "white");
  ui.setElementBackgroundColor(randomMode, "black");
  ui.setElementTextColor(randomMode, "white");
  ui.setElementBackgroundColor(eraser, "black");
  ui.setElementTextColor(eraser, "white");
  const cells = document.querySelectorAll(".grid-item");

  cells.forEach((cell) => {
    ui.setCellBackground(cell);
  });
});

const cells = document.querySelectorAll(".grid-item");

cells.forEach((cell) => {
  cell.addEventListener("mouseover", () => {
    if (sketch.setRandomModeActive()) {
      cell.style.backgroundColor = getRandomColor();
    } else {
      cell.style.backgroundColor = sketch.getCurrentColor();
    }
  });
});
