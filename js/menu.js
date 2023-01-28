function btClick() {
  document.getElementById("onePlayer").addEventListener("click", function () {
    document.getElementById("Menu").style.display = "none";
    numberOfPlayers = 1;
    createKeyPlayer(1, numberOfPlayers);
  });
  document.getElementById("twoPlayers").addEventListener("click", function () {
    document.getElementById("Menu").style.display = "none";
    numberOfPlayers = 2;
    createKeyPlayer(1, numberOfPlayers);
  });
  document
    .getElementById("threePlayers")
    .addEventListener("click", function () {
      document.getElementById("Menu").style.display = "none";
      numberOfPlayers = 3;
      createKeyPlayer(1, numberOfPlayers);
    });
  document.getElementById("fourPlayers").addEventListener("click", function () {
    document.getElementById("Menu").style.display = "none";
    numberOfPlayers = 4;
    createKeyPlayer(1, numberOfPlayers);
  });
}

function nameOfPlayer(player) {
  switch (player) {
    case 1:
      return "Player1";
    case 2:
      return "Player2";
    case 3:
      return "Player3";
    case 4:
      return "Player4";
  }
}

function createKeyPlayer(player, numberOfPlayers) {
  const OnKeyDown = (e) => {
    div.remove();
    document.removeEventListener("keydown", OnKeyDown);
    if (player > numberOfPlayers) {
      for (let i = 0; i < numberOfPlayers; i++) {
        ArrPlayers[i].Play();
      }
    } else {
      if (!ArrKey.includes(e.key)) {
        ArrKey.push(e.key);
        ArrPlayers.push(new Player(nameOfPlayer(player), e.key, player));
        player++;
      }
      createKeyPlayer(player, numberOfPlayers);
    }
  };

  if (player <= numberOfPlayers) {
    div = document.createElement("div");
    div.innerHTML = "Choose key for player number " + player;
    document.getElementById("start").appendChild(div);
  } else {
    document.getElementById("start").style.display = "none";
    document.getElementById("h1-center").innerHTML = "CLICK STH TO START";
    setTimeout(() => {
      document.getElementById("h1-center").innerHTML = "";
    }, "2000");
  }
  document.addEventListener("keydown", OnKeyDown);
}

btClick();
