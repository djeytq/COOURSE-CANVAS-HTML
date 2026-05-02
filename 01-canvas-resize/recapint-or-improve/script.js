import Bola from "./bola.js";
import Animate from "./animate.js";

var canvas = document.querySelector("canvas");

var larguraDaTela = window.innerWidth - 40;
var alturaDaTela = window.innerHeight - 40;

canvas.width = larguraDaTela;
canvas.height = alturaDaTela;

var c = canvas.getContext('2d');
var animate = new Animate(c);

animate.generateManyObjs(100, Bola);




function ani(){
    animate.moveTheObjs()
    requestAnimationFrame(ani);
}
ani();