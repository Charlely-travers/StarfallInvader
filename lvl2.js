import EnemyController from "./EnemyController2.js";
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
        let text = didWin ? "Niveau gagné ! Cliquez ici pour aller au prochain niveau." : "Partie perdue. Cliquez ici pour retourner au menu";
        
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";

        const textWidth = ctx.measureText(text).width;
        const textX = (canvas.width - textWidth) / 2;
        const textY = canvas.height / 2;
        
        ctx.fillText(text, textX, textY);

        if (!didWin) {
            canvas.style.cursor = "pointer"; // Change le curseur pour indiquer qu'il est cliquable
            canvas.addEventListener("click", returnToMenu);
        }

        if (didWin) {
            canvas.style.cursor = "pointer"; // Change le curseur pour indiquer qu'il est cliquable
            canvas.addEventListener("click", prochainniveau);
        }
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

function returnToMenu() {
    canvas.removeEventListener("click", returnToMenu); // Supprimer l'écouteur pour éviter les problèmes futurs
    
  
    window.location.href = "index.html";
}

function prochainniveau() {
    canvas.removeEventListener("click", prochainniveau); // Supprimer l'écouteur pour éviter les problèmes futurs
    
  
    window.location.href = "lvl3.html";
}

setInterval(game, 1000 / 60);
