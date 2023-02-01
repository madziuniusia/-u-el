export class Player {
  R = 1.5;
  lap = 0;
  dx = 1;
  dy = 1;
  pressed = false;

  constructor(
    name,
    key,
    number,
    SmallCircle,
    BigCircle,
    Start,
    ArrPlayers,
    numberOfPlayers
  ) {
    this.number = number;
    this.name = name;
    this.key = key;
    this.SmallCircle = SmallCircle;
    this.BigCircle = BigCircle;
    this.Start = Start;
    this.ArrDeadPlayer = [];
    this.ArrPlayers = ArrPlayers;
    this.numberOfPlayers = numberOfPlayers;
    this.numberOfDeadPlayers = 0;
    this.alive = true;
    this.x = 401;
    this.y = 300 + this.number * 20;
    this.alpha = (0.5 / 18) * Math.PI;
    this.ctx = document.getElementById("canvas-background").getContext("2d");
    this.canvasTurtle = document.getElementById("canvas-Player" + this.number);
    this.canvasTurtle.style.display = "block";
    this.ctxTurtle = this.canvasTurtle.getContext("2d");
    this.turtle = new Image();
    this.turtle.src = "img/turtle.png";
  }

  Play() {
    window.addEventListener("keydown", (e) => {
      if (this.key == e.key) {
        this.pressed = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.key == e.key) {
        this.pressed = false;
      }
    });

    this.alpha -= (0.5 / 18) * Math.PI;
    this.dx = this.R * Math.cos(this.alpha);
    this.dy = this.R * Math.sin(this.alpha);

    this.interval = setInterval(
      function (thisIn) {
        if (thisIn.pressed == true) {
          thisIn.alpha -= (0.5 / 18) * Math.PI;
          thisIn.dx = thisIn.R * Math.cos(thisIn.alpha);
          thisIn.dy = thisIn.R * Math.sin(thisIn.alpha);
        }
        thisIn.x += thisIn.dx;
        thisIn.y += thisIn.dy;
        thisIn.Color();
        thisIn.ctx.beginPath();
        thisIn.ctx.moveTo(thisIn.x, thisIn.y);
        thisIn.ctx.lineTo(thisIn.x + thisIn.dx, thisIn.y + thisIn.dy);
        thisIn.ctx.stroke();
        thisIn.ctx.closePath();
        thisIn.Lap();
        thisIn.End();
        thisIn.DeadWon();
        thisIn.EveryoneLose();
        thisIn.DrawTurtle();
        thisIn.IamDead();
      },
      25,
      this
    );
  }

  End() {
    if (
      this.ctx.isPointInPath(this.SmallCircle, this.x, this.y) ||
      !this.ctx.isPointInPath(this.BigCircle, this.x, this.y)
    ) {
      this.alive = false;
      this.EndGame();
    }
  }
  Color() {
    switch (this.number) {
      case 1:
        return (this.ctx.strokeStyle = "red");
      case 2:
        return (this.ctx.strokeStyle = "blue");
      case 3:
        return (this.ctx.strokeStyle = "green");
      case 4:
        return (this.ctx.strokeStyle = "pink");
    }
  }

  IamDead() {
    if (this.alive == true) {
      for (let i = 0; i < this.numberOfPlayers; i++) {
        if (this.ArrPlayers[i].alive == false) {
          if (!this.ArrDeadPlayer.includes(this.ArrPlayers[i].name)) {
            this.numberOfDeadPlayers++;
            this.ArrDeadPlayer.push(this.ArrPlayers[i].name);
          }
        }
      }
    }
  }

  Lap() {
    if (this.ctx.isPointInPath(this.Start, this.x, this.y)) {
      this.lap++;
      document.getElementById("h2-center-player" + this.number).innerHTML =
        this.name + ": Lap" + this.lap + "/5";

      if (this.lap === 5) {
        this.StopGameEveryone();
        this.Won();
      }
    }
  }

  DeadWon() {
    if (this.alive) {
      if (
        this.numberOfDeadPlayers === this.numberOfPlayers - 1 &&
        this.numberOfPlayers != 1
      ) {
        this.StopGameEveryone();
        this.Won();
      }
    }
  }

  StopGameEveryone() {
    for (let i = 0; i < this.ArrPlayers.length; i++) {
      this.ArrPlayers[i].EndGame();
    }
  }

  Won() {
    document.getElementById("h1-center").innerHTML = "WON " + this.name;
  }

  EndGame() {
    clearInterval(this.interval);
    this.alive = false;
  }

  EveryoneLose() {
    if (this.alive == false && this.numberOfPlayers == 1) {
      document.getElementById("h1-center").innerHTML = "YOU ARE LOSER";
    }
  }

  DrawTurtle() {
    this.ctxTurtle.clearRect(
      0,
      0,
      this.canvasTurtle.width,
      this.canvasTurtle.height
    );
    this.ctxTurtle.beginPath();
    this.ctxTurtle.translate(this.x, this.y);
    this.ctxTurtle.rotate(this.alpha);
    this.ctxTurtle.drawImage(this.turtle, -15, -15, 30, 30);
    //this.ctxTurtle.rect(-10, -10, 20, 20);
    this.ctxTurtle.setTransform(1, 0, 0, 1, 0, 0);
    this.ctxTurtle.stroke();
    this.ctxTurtle.closePath();
  }
}
