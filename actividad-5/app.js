//CONTROLADOR DE FIGURAS

class FigureController {
  constructor() {
    this.keyboardState = {};
    this.activeFigure = null;
  }

  setActiveFigure(figure) {
    this.activeFigure = figure;
    typeof updateActiveFigureDisplay === "function"
      ? updateActiveFigureDisplay(figure)
      : console.warn("updateActiveFigureDisplay no está definido.");
  }

  keyboardEvents() {
    document.addEventListener(
      "keydown",
      (e) => (this.keyboardState[e.key] = true)
    );
    document.addEventListener(
      "keyup",
      (e) => (this.keyboardState[e.key] = false)
    );
  }

  update() {
    if (!this.activeFigure) return;

    const ROTATE = 0.05;
    const MOVE = 2;

    if (this.keyboardState["ArrowUp"]) this.activeFigure.move(MOVE);
    if (this.keyboardState["ArrowDown"]) this.activeFigure.move(-MOVE);
    if (this.keyboardState["ArrowLeft"]) this.activeFigure.rotate(-ROTATE);
    if (this.keyboardState["ArrowRight"]) this.activeFigure.rotate(ROTATE);
  }
} //Refactorizacion hecha con IA, se agrego el selector de figuras que me faltaba

//MOTOR DE RENDER

class GameEngineRender {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.objects = new Map();
  }

  addObject(figure) {
    if (figure?.id) this.objects.set(figure.id, figure);
  }

  getObject(id) {
    return this.objects.get(id);
  }

  getAllObjects() {
    return [...this.objects.values()];
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach((obj) => obj.draw(this.ctx));
  }
}

//BASE Y FORMAS

class Shape {
  constructor(id, x, y, color) {
    this.id = id;
    this.x = parseFloat(x) || 0;
    this.y = parseFloat(y) || 0;
    this.color = color;
    this.angle = 0;
  }

  rotate(value) {
    this.angle += value;
  }

  move(value) {
    this.x += Math.cos(this.angle) * value;
    this.y += Math.sin(this.angle) * value;
  }

  draw(ctx) {
    throw new Error("Draw method must be implemented."); //Manejo de errores agregado por IA, no lo creo necesario pero ahi quedo
  }

  getSummary() {
    return { type: this.constructor.name, id: this.id };
  }
}

class Rectangle extends Shape {
  constructor(id, x, y, width, height, color) {
    super(id, x, y, color);
    this.width = parseFloat(width) || 50;
    this.height = parseFloat(height) || 30;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}

class Circle extends Shape {
  constructor(id, x, y, radius, color) {
    super(id, x, y, color);
    this.radius = parseFloat(radius) || 25;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Triangle extends Shape {
  constructor(id, x, y, side, color) {
    super(id, x, y, color);
    this.side = parseFloat(side) || 50;
  }

  draw(ctx) {
    const h = (Math.sqrt(3) / 2) * this.side;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-this.side / 2, h / 2);
    ctx.lineTo(this.side / 2, h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

//ELEMENTOS Y FUNCIONES AUXILIARES

let figureTableBodyElem;
let activeFigureIdSpanElem;
let currentControllerInstance;

function updateActiveFigureDisplay(figure) {
  if (activeFigureIdSpanElem)
    activeFigureIdSpanElem.textContent = figure ? figure.id : "None";

  if (figureTableBodyElem) {
    figureTableBodyElem.querySelectorAll("tr").forEach((row) => {
      row.classList.toggle(
        "active-row",
        figure && row.dataset.figureId === figure.id
      );
    });
  }
}


////FUNCIONES AUXILIARES: UI

function initializeUI(renderer, controller) {
    const addButtons = {
    Rectangle: document.getElementById("addRectangleBtn"),
    Circle: document.getElementById("addCircleBtn"),
    Triangle: document.getElementById("addTriangleBtn"),
};

const shapeColorInput = document.getElementById("shapeColor");
figureTableBodyElem = document.querySelector("#figureTable tbody");
activeFigureIdSpanElem = document.getElementById("activeFigureId");

for (const [shapeType, button] of Object.entries(addButtons)) {
    button.addEventListener("click", () => {
        const figure = promptForFigureDetails(shapeType, shapeColorInput, renderer);
        if (figure) {
            renderer.addObject(figure);
            controller.setActiveFigure(figure);
            updateFigureTable(renderer, controller);
        }
    });
}
}

////FUNCIONES AUXILIARES: TABLA

function updateFigureTable(renderer, controller) {
    if (!figureTableBodyElem) return;
    
    figureTableBodyElem.innerHTML = "";
    renderer.getAllObjects().forEach((figure) => {
        const row = figureTableBodyElem.insertRow();
        row.insertCell().textContent = figure.constructor.name;
        row.insertCell().textContent = figure.id;
        row.dataset.figureId = figure.id;
        
        if (controller.activeFigure?.id === figure.id)
            row.classList.add("active-row");
        
        row.addEventListener("click", () => {
            controller.setActiveFigure(renderer.getObject(figure.id));
            updateFigureTable(renderer, controller);
        });
    });
    
    updateActiveFigureDisplay(controller.activeFigure);
}

////FUNCIONES AUXILIARES: CREACIÓN DE FIGURAS

function promptForFigureDetails(shapeType, shapeColorInput, renderer) {
    const id = prompt(`Enter ID for the new ${shapeType}:`);
    if (!id) return null;
    
    const xStr = prompt(`Enter X coordinate for ${id}:`);
    if (xStr === null) return null;
    const yStr = prompt(`Enter Y coordinate for ${id}:`);
    if (yStr === null) return null;
    
    const color = shapeColorInput.value;
    let figure = null;
    
    try {
        if (shapeType === "Rectangle") {
            const widthStr = prompt(`Enter width for ${id}:`);
            if (widthStr === null) return null;
            const heightStr = prompt(`Enter height for ${id}:`);
            if (heightStr === null) return null;
            
            if (isNaN(widthStr) || isNaN(heightStr) || isNaN(xStr) || isNaN(yStr)) {
                throw new Error("Invalid dimensions/coordinates for Rectangle.");
            }
            
            figure = new Rectangle(id, xStr, yStr, widthStr, heightStr, color);
        } else if (shapeType === "Circle") {
            const radiusStr = prompt(`Enter radius for ${id}:`);
            if (radiusStr === null) return null;
            
            if (isNaN(radiusStr) || isNaN(xStr) || isNaN(yStr)) {
                throw new Error("Invalid dimensions/coordinates for Circle.");
            }
            
            figure = new Circle(id, xStr, yStr, radiusStr, color);
        } else if (shapeType === "Triangle") {
            const sideStr = prompt(`Enter side length for equilateral ${id}:`);
            if (sideStr === null) return null;
            
            if (isNaN(sideStr) || isNaN(xStr) || isNaN(yStr)) {
                throw new Error("Invalid dimensions/coordinates for Triangle.");
            }
            
            figure = new Triangle(id, xStr, yStr, sideStr, color);
        } else {
      throw new Error(`Shape type "${shapeType}" is not recognized.`);
    }
    
    // Chequear existencia previa
    if (renderer.getObject(id)) {
        if (!confirm(`Figure with ID "${id}" already exists. Overwrite?`)) {
            return null;
        }
    }
} catch (e) {
    alert(
        `Error: ${e.message}. Please enter valid numbers or ensure ID is unique if not overwriting.`
    );
    return null;
}

return figure;
}

////MAIN

function main() {
  const canvas = document.getElementById("gameCanvas");
  canvas.width = 600;
  canvas.height = 400;

  const renderer = new GameEngineRender(canvas);
  const controller = new FigureController();
  currentControllerInstance = controller;
  controller.keyboardEvents();

  initializeUI(renderer, controller);

  updateFigureTable(renderer, controller);
  updateActiveFigureDisplay(null);

  function gameLoop() {
    controller.update();
    renderer.render();
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

window.onload = main;

//Previo modularizacion