let canvas = document.getElementById("canvas-background");
let ctx = canvas.getContext("2d");
const BigCircle = new Path2D();
const SmallCircle = new Path2D();
const Start = new Path2D();
let div;
let ArrKey = [];
let ArrPlayers = [];
let ArrDeadPlayer = [];
let numberOfPlayers = 0;
let numberOfDeadPlayers = 0;

let sand = new Image();
let water = new Image();

sand.src = "/img/sand.jpg";
water.src = "/img/ocean.jpg";
