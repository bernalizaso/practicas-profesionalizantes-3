function b1click() {
  let display = document.getElementById("display");
  display.value += "1";
}

function b2click() {
  let display = document.getElementById("display");
  display.value += "2";
}

function b3click() {
  let display = document.getElementById("display");
  display.value += "3";
}

function b4click() {
  let display = document.getElementById("display");
  display.value += "4";
}

function b5click() {
  let display = document.getElementById("display");
  display.value += "5";
}

function b6click() {
  let display = document.getElementById("display");
  display.value += "6";
}

function b7click() {
  let display = document.getElementById("display");
  display.value += "7";
}

function b8click() {
  let display = document.getElementById("display");
  display.value += "8";
}

function b9click() {
  let display = document.getElementById("display");
  display.value += "9";
}

function b0click() {
  let display = document.getElementById("display");
  display.value += "0";
}

function bdotclick() {
  let display = document.getElementById("display");
  display.value += ".";
}

function bplusclick() {
  let display = document.getElementById("display");
  display.value += "+";
}

function bminusclick() {
  let display = document.getElementById("display");
  display.value += "-";
}

function bmultclick() {
  let display = document.getElementById("display");
  display.value += "*";
}

function bdivideclick() {
  let display = document.getElementById("display");
  display.value += "/";
}

function calculate() {
  let display = document.getElementById("display");

  display.value = eval(display.value);
}

function erase() {
  let display = document.getElementById("display");
  display.value = "";
}

document.getElementById("b0").onclick = b0click;
document.getElementById("b1").onclick = b1click;
document.getElementById("b2").onclick = b2click;
document.getElementById("b3").onclick = b3click;
document.getElementById("b4").onclick = b4click;
document.getElementById("b5").onclick = b5click;
document.getElementById("b6").onclick = b6click;
document.getElementById("b7").onclick = b7click;
document.getElementById("b8").onclick = b8click;
document.getElementById("b9").onclick = b9click;
document.getElementById("b0").onclick = b0click;
document.getElementById("bdot").onclick = bdotclick;
document.getElementById("bplus").onclick = bplusclick;
document.getElementById("bminus").onclick = bminusclick;
document.getElementById("bmult").onclick = bmultclick;
document.getElementById("bdivide").onclick = bdivideclick;
document.getElementById("bequal").onclick = calculate;
document.getElementById("berase").onclick = erase;
