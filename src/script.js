const game = (() => {
  let comScore = 0;
  let playerScore = 0;
  let currentRound = 1;

  const getPlayerScore = () => playerScore;
  const getComScore = () => comScore;
  const printScore = () => "Player:" + playerScore + " " + "COM:" + comScore;

  const setScore = (num) => playerScore = num;

  const getCurrentRound = () => currentRound;

  const playRound = (playerMove, comMove) => {
    if (playerMove === "rock") {
      switch (comMove) {
        case "comRock":
          return "Draw!";
        case "comPaper":
          return "Loss!";
        case "comScissors":
          return "Victory!";
      }
    } else if (playerMove === "paper") {
      switch (comMove) {
        case "comRock":
          return "Victory!";
        case "comPaper":
          return "Draw!";
        case "comScissors":
          return "Loss!";
      }
    } else if (playerMove === "scissors") {
      switch (comMove) {
        case "comRock":
          return "Loss!";
        case "comPaper":
          return "Victory!";
        case "comScissors":
          return "Draw!";
      }
    }
  }

  const genComMove = () => {
    const comMovesArr = ["comRock", "comPaper", "comScissors"];
    const comMove = comMovesArr[Math.floor(Math.random() * Math.floor(3))];
    return comMove;
  }

  const getPlayerMove = () => {
    const playerMove = prompt("Rock, Paper, or Scissors?").toLowerCase();
    return playerMove;
  }

  const moveRounds = () => currentRound++;

  const trackRounds = () => {
    if (currentRound > 5) {
      return "Game Over";
    }
  }

  const keepScore = (result) => {
    if (result === "Victory!") {
      playerScore++;
    } else if (result === "Loss!") {
      comScore++;
    }
  }

  const tallyScore = (playerScore, comScore) => {
    if (playerScore > comScore) {
      return "You Win!";
    } else if (playerScore === comScore) {
      return "Draw!";
    } else {
      return "You Lose!"
    }
  }

  const gameReset = () => {
    playerScore = 0;
    comScore = 0;
    currentRound = 1;
  }

  const gameProcess = () => {
    do {
      keepScore(playRound(getPlayerMove(), genComMove()));
      moveRounds();
    }
    while (trackRounds() !== "Game Over");
    return tallyScore(playerScore, comScore);
  }

  return { getPlayerScore, getComScore, setScore, printScore, getCurrentRound, playRound, genComMove, moveRounds, keepScore, gameProcess, gameReset };
})();

export {game}