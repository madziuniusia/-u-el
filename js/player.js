class Player {
  R = 1.5;
  lap = 0;
  dx = 1;
  dy = 1;
  pressed = false;

  constructor(name, key, number) {
    this.number = number;
    this.name = name;
    this.key = key;
    this.alive = true;
    this.x = 410;
    this.y = 300 + this.number * 20;
    this.alpha = (0.5 / 18) * Math.PI;
    this.numberOfDeadPlayers = 0;
    this.ctx = canvas.getContext("2d");
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
        thisIn.Img();
        thisIn.IamDead();
      },
      25,
      this
    );
  }

  End() {
    if (
      this.ctx.isPointInPath(SmallCircle, this.x, this.y) ||
      !this.ctx.isPointInPath(BigCircle, this.x, this.y)
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
    if (this.alive == false) {
      if (!ArrDeadPlayer.includes(this.name)) {
        numberOfDeadPlayers++;
        ArrDeadPlayer.push(this.name);
      }
    }
  }

  Lap() {
    if (this.ctx.isPointInPath(Start, this.x, this.y)) {
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
      if (numberOfDeadPlayers === numberOfPlayers - 1 && numberOfPlayers != 1) {
        this.StopGameEveryone();
        this.Won();
      }
    }
  }

  StopGameEveryone() {
    for (let i = 0; i < ArrPlayers.length; i++) {
      ArrPlayers[i].EndGame();
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
    if (this.alive == false && numberOfPlayers == 1) {
      document.getElementById("h1-center").innerHTML = "YOU ARE LOSER";
    }
  }

  Img() {
    this.turtle = new Image();
    this.turtle.scr = "/img/turtle.png";
    this.turtle.onload = function () {
      this.ctx.drawImage(this.turtle, this.x, this.y, 50, 50);
    };
    /*                     this.ElCanvas = document.createElement('canvas');
                                        this.ElCanvas.setAttribute("id", "canvasMotor");
                                        this.ElCanvas.setAttribute("width", "canvasMotor");
                                        this.ElCanvas.setAttribute("height", "canvasMotor");
                                        this.motor = document.getElementById("canvasMotor").getContext('2d') */
  }
}
