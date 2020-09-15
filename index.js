import { game } from "./script.js"

const makeImg = () => document.createElement("img");
const makeH1 = () => document.createElement("h1");
const makeBtn = () => document.createElement("button");
const makeDiv = () => document.createElement("div");
const makeSpan = () => document.createElement("span");

const mainMenu = (() => {
    const menuArt = makeImg();
    menuArt.alt = "Rock Paper Scissors Logo: Three Cartoon Hands Representing Each Of The Titular Choices";
    menuArt.src = "https://deadpancakes.github.io/rps2/rps.png";
    menuArt.id = "menuArt";

    const title = makeH1();
    title.textContent = "Rock, Paper, Scissors";

    const startBtn = makeBtn();
    startBtn.id = "startButton";
    startBtn.textContent = "START";
    startBtn.addEventListener("click", () => userInterface.toGame());
    document.getElementById("startButton").addEventListener("click", () => { userInterface.toGame() });
    return { menuArt, title, startBtn }
})();

const gameMenu = (() => {
    const announcerH1 = makeH1();
    announcerH1.textContent = "First To Five Wins!";
    announcerH1.id = "announcer";

    const fieldDiv = makeDiv();
    fieldDiv.id = "field";
    const playerHand = makeImg();
    playerHand.src = "https://deadpancakes.github.io/rps2/pcrock.png";
    playerHand.id = "playerHand";
    const comHand = makeImg();
    comHand.src = "https://deadpancakes.github.io/rps2/comrock.png";
    comHand.id = "comHand";
    fieldDiv.appendChild(playerHand);
    fieldDiv.appendChild(comHand);

    const displayHand = (move) => {
        switch (move) {
            case "Paper":
                playerHand.src = "https://deadpancakes.github.io/rps2/pcpaper.png";
                break;
            case "Scissors":
                playerHand.src = "https://deadpancakes.github.io/rps2/pcscissors.png";
                break;
            case "comPaper":
                comHand.src = "https://deadpancakes.github.io/rps2/compaper.png";
                break;
            case "comScissors":
                comHand.src = "https://deadpancakes.github.io/rps2/comscissors.png";
                break;
        }
    }

    const scoreboardSpan = makeSpan();
    scoreboardSpan.id = "scoreboard";
    scoreboardSpan.textContent = game.printScore();

    const controlDiv = makeDiv();
    const rockBtn = makeBtn();
    rockBtn.textContent = "Rock";
    rockBtn.addEventListener("click", e => userInterface.submitMove(e))
    const paperBtn = makeBtn();
    paperBtn.textContent = "Paper";
    paperBtn.addEventListener("click", e => userInterface.submitMove(e));
    const scissorsBtn = makeBtn();
    scissorsBtn.textContent = "Scissors"
    scissorsBtn.addEventListener("click", e => userInterface.submitMove(e));
    controlDiv.appendChild(rockBtn);
    controlDiv.appendChild(paperBtn);
    controlDiv.appendChild(scissorsBtn);

    const optionsDiv = makeDiv();
    optionsDiv.id = "options";
    const resetBtn = makeBtn();
    resetBtn.textContent = "Reset Game";
    resetBtn.addEventListener("click", () => {
        if (userInterface.getAnimPlaying() === false) {
            game.gameReset();
            scoreboardSpan.textContent = game.printScore();
            announcerH1.textContent = "First To Five Wins!";
            gameMenu.playerHand.src = "https://deadpancakes.github.io/rps2/pcrock.png";
            gameMenu.comHand.src = "https://deadpancakes.github.io/rps2/comrock.png";
        }
    });
    const toMainMenuBtn = makeBtn();
    toMainMenuBtn.textContent = "Back To Menu";
    toMainMenuBtn.addEventListener("click", () => userInterface.toMainMenu());
    optionsDiv.appendChild(resetBtn);
    optionsDiv.appendChild(toMainMenuBtn);
    return { announcerH1, fieldDiv, playerHand, comHand, displayHand, scoreboardSpan, controlDiv, optionsDiv }
})();

const userInterface = (() => {
    const mainMenuArr = [mainMenu.menuArt, mainMenu.title, mainMenu.startBtn];
    const gameArr = [gameMenu.announcerH1, gameMenu.fieldDiv, gameMenu.scoreboardSpan, gameMenu.controlDiv, gameMenu.optionsDiv];
    const content = document.getElementById("content");

    let animPlaying = false;
    const getAnimPlaying = () => animPlaying;

    const init = () => {
        let children = content.childElementCount;;
        for (let i = 0; i < children; i++) {
            content.removeChild(content.lastElementChild)
        }
    };

    const toMainMenu = () => {
        if (animPlaying === false) {
            if (document.body.firstElementChild.firstElementChild) {
                init();
            }
            for (let i = 0; i < mainMenuArr.length; i++) {
                content.appendChild(mainMenuArr[i]);
            }
        }
    };

    const toGame = () => {
        init();
        for (let i = 0; i < gameArr.length; i++) {
            content.appendChild(gameArr[i]);
        }
        gameMenu.announcerH1.textContent = "First To Five Wins!";
        game.gameReset();
        gameMenu.scoreboardSpan.textContent = game.printScore();
    };

    const submitMove = (e) => {
        if (game.getPlayerScore() >= 5 || game.getComScore() >= 5) {
            if (game.getPlayerScore() > game.getComScore()) {
                gameMenu.announcerH1.textContent = "You Win! Reset To Play Again";
            } else {
                gameMenu.announcerH1.textContent = "You Lose! Reset To Play Again";
            }
        } else {
            if (animPlaying === false) {
                animPlaying = true;
                if (gameMenu.playerHand.src !== "https://deadpancakes.github.io/rps2/pcrock.png" || gameMenu.comHand.src !== "https://deadpancakes.github.io/rps2/comrock.png") {
                    gameMenu.playerHand.src = "https://deadpancakes.github.io/rps2/pcrock.png" ;
                    gameMenu.comHand.src = "https://deadpancakes.github.io/rps2/comrock.png";
                }
                let playerMove = e.target.textContent;
                let comMove = game.genComMove();
                let result = game.playRound((playerMove).toLowerCase(), comMove);
                gameMenu.playerHand.classList.add("pcAnim");
                gameMenu.comHand.classList.add("comAnim");
                setTimeout(() => {
                    gameMenu.announcerH1.textContent = result;
                    game.keepScore(result);
                    game.moveRounds();
                    gameMenu.scoreboardSpan.textContent = game.printScore();
                    playerHand.classList.remove("pcAnim");
                    comHand.classList.remove("comAnim");
                    gameMenu.displayHand(playerMove);
                    gameMenu.displayHand(comMove);
                    animPlaying = false
                }, 1750);
            }
        }
    };
    return { getAnimPlaying, init, toMainMenu, toGame, submitMove }
})();