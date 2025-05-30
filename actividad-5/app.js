///////////////Front

//////////////Back
class Figure {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
  }

  rotate(value) {
    this.angle += value;
  }

  move(value) {
    const dx = Math.cos(this.angle) * value;
    const dy = Math.sin(this.angle) * value;
    this.x += dx;
    this.y += dy;
  }
}

class Rectangle extends Figure {
  constructor(x, y, w, h) {
    super(x, y);
    this.width = w;
    this.height = h;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "blue";
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}

class Circle extends Figure {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  }
}

class FigureController {
  constructor(figure) {
    this.keyboardState = {};
    this.figure = figure;
  }

  keyboardEvent() {
    document.addEventListener("keydown", (e) => this.manageKeyDown(e));
    document.addEventListener("keyup", (e) => this.manageKeyUp(e));
  }

  manageKeyDown(event) {
    this.keyboardState[event.key] = true;
  }

  manageKeyUp(event) {
    this.keyboardState[event.key] = false;
  }

  update() {
    const rotate_value = 0.05;
    const movement_value = 2;

    if (this.keyboardState["ArrowUp"]) this.figure.move(movement_value);
    if (this.keyboardState["ArrowDown"]) this.figure.move(-movement_value);
    if (this.keyboardState["ArrowLeft"]) this.figure.rotate(-rotate_value);
    if (this.keyboardState["ArrowRight"]) this.figure.rotate(rotate_value);
  }
}

class GameEngineRender {
  constructor(canvasInstance) {
    this.canvas = canvasInstance;
    this.ctx = this.canvas.getContext("2d");
    this.objects = new Map();
  }

  addObject(id, object) {
    this.objects.set(id, object);
  }

  getObject(id) {
    return this.objects.get(id);
  }

  render() {
    //limpieza
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //dibujado
    for (const item of this.objects.values()) {
      item.draw(this.ctx);
    }
  }
}

function main() {
  let canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 400;
  document.querySelector(".canvasBody").appendChild(canvas);

  let renderer = new GameEngineRender(canvas);

  renderer.addObject("rectangle", new Rectangle(400, 200, 110, 50));
  renderer.addObject("circle", new Circle(480, 200, 30));

  // Actualizamos las funciones de update y render después de crear el controlador
  let controlador = new FigureController(renderer.getObject("circle"));
  controlador.keyboardEvent();

  const update = controlador.update.bind(controlador);
  const render = renderer.render.bind(renderer);

  setInterval(function () {
    update();
    render();
  }, 16);
}

window.onload = main;
