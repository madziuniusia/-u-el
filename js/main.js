let canvas = document.getElementById("canvas-background");
let ctx = canvas.getContext("2d");
const BigCircle = new Path2D();
const SmallCircle = new Path2D();
const Start = new Path2D();
let div;
let ArrKey = [];
let ArrPlayers = [];
let numberOfPlayers = 0;
let numberOfDeadPlayers = 0;

let sand = new Image();
let water = new Image();

import { Background } from "/js/background.js";
import { Player } from "/js/player.js";
import { menu } from "/js/menu.js";
//import { Player } from "./player";

//console.log(Player);
//let Player = new Player();
Background(canvas, ctx, sand, water, BigCircle, SmallCircle, Start);
menu(
  div,
  ArrKey,
  ArrPlayers,
  numberOfPlayers,
  Player,
  BigCircle,
  SmallCircle,
  Start,
  numberOfDeadPlayers
);
