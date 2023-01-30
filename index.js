import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import bulletController from "./BulletControleer.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const background = new Image();
background.src = "images/space.png"

const playerBulletController = new bulletController(canvas, 10, "red", true);
const enemyBulletController = new bulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(canvas,enemyBulletController,playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "Gagné" : "Perdu";
        let textOffset = didWin ? 2.8 : 2.8
        
        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }
    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver=true
    }
}
setInterval(game, 1000 / 60);