let display = document.getElementById("display");

function b1click() {
  display.value += "1";
}

function b2click() {
  display.value += "2";
}

function b3click() {
  display.value += "3";
}

function b4click() {
  display.value += "4";
}

function b5click() {
  display.value += "5";
}

function b6click() {
  display.value += "6";
}

function b7click() {
  display.value += "7";
}

function b8click() {
  display.value += "8";
}

function b9click() {
  display.value += "9";
}

function b0click() {
  display.value += "0";
}

function bplusclick() {
  display.value += "+";
}

function bminusclick() {
  display.value += "-";
}

function bdivideclick() {
  display.value += "/";
}

function bmultclick() {
  display.value += "*";
}

function bdotclick() {
  display.value += ".";
}

function erase() {
  display.value = "";
}

function calculate() {
  display.value = eval(display.value);
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
