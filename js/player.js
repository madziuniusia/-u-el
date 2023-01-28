class Player {
  R = 5;
  lap = -1;
  dx = 1;
  dy = 1;
  pressed = false;

  constructor(name, key, number) {
    this.number = number;
    this.name = name;
    this.key = key;
    this.alive = true;
    this.x = 400;
    this.y = 300 + this.number * 20;
    this.alfa = (1 / 18) * Math.PI;
    this.dead = 0;
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

    this.alfa -= (1 / 18) * Math.PI;
    this.dx = this.R * Math.cos(this.alfa);
    this.dy = this.R * Math.sin(this.alfa);

    this.interval = setInterval(
      function (thisIn) {
        if (thisIn.pressed == true) {
          thisIn.alfa -= (1 / 18) * Math.PI;
          thisIn.dx = thisIn.R * Math.cos(thisIn.alfa);
          thisIn.dy = thisIn.R * Math.sin(thisIn.alfa);
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
        thisIn.MotorbikeImg();
      },
      100,
      this
    );
  }

  End() {
    if (
      this.ctx.isPointInPath(SmallCircle, this.x, this.y) ||
      !this.ctx.isPointInPath(BigCircle, this.x, this.y)
    ) {
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

  EndGame() {
    clearInterval(this.interval);
    this.alive = false;
  }

  Lap() {
    if (this.ctx.isPointInPath(Start, this.x, this.y)) {
      this.lap++;
      document.getElementById("h2-center-player" + this.number).innerHTML =
        this.name + ": Lap" + this.lap + "/5";

      if (this.lap === 5) {
        for (let i = 0; i < ArrPlayers.length; i++) {
          ArrPlayers[i].EndGame();
        }
        this.Won();
      }
    }
  }

  DeadWon() {
    for (let i = 0; i < ArrPlayers.length; i++) {
      if (ArrPlayers[i].alive == false && this.alive == true) {
        this.dead++;
      }
    }
    if (this.dead === numberOfPlayers - 1 && numberOfPlayers != 1) {
      for (let i = 0; i < ArrPlayers.length; i++) {
        ArrPlayers[i].EndGame();
      }
      this.Won();
    }
  }

  EveryoneLose() {
    if (this.alive === false && numberOfPlayers === 1) {
      document.getElementById("h1-center").innerHTML = "YOU ARE LOSER";
    }
  }
  Won() {
    document.getElementById("h1-center").innerHTML = "WON " + this.name;
  }

  MotorbikeImg() {
    /*                     this.ElCanvas = document.createElement('canvas');
                                        this.ElCanvas.setAttribute("id", "canvasMotor");
                                        this.ElCanvas.setAttribute("width", "canvasMotor");
                                        this.ElCanvas.setAttribute("height", "canvasMotor");
                                        this.motor = document.getElementById("canvasMotor").getContext('2d') */
  }
}
