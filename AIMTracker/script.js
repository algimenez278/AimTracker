let points = 0;
let intervalId;

const startGame = document.querySelector("#start");
const endGame = document.querySelector("#end");
let message = document.querySelector('#message');
let gamming = false;

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const gameContainer = document.querySelector('.game');

    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;

    circle.style.left = `${Math.random() * (containerWidth - 20)}px`;
    circle.style.top = `${Math.random() * (containerHeight - 20)}px`;

    let clicked = false; 

    circle.addEventListener('click', () => {
        if (!clicked) { 
            clicked = true;
            circle.remove();
            points += 5;
            message.textContent = points;
        }
    });

    setTimeout(() => {
        if (gamming && !clicked) {
            circle.remove();
            points -= 2;
            message.textContent = points;
        }
    }, 5000);

    gameContainer.appendChild(circle);
}

startGame.addEventListener("click", () => {
    if (!gamming) {
        gamming = true;
        points = 0;
        message.textContent = points;
        startGame.disabled = true;
        endGame.disabled = false;

        if (!intervalId) {
            intervalId = setInterval(createCircle, 1200);
        }
    }
});

endGame.addEventListener("click", () => {
    gamming = false;
    clearInterval(intervalId);
    intervalId = null;

    const gameContainer = document.querySelector('.game');
    const circles = gameContainer.querySelectorAll('.circle');
    circles.forEach(circle => circle.remove());

    startGame.disabled = false;
    endGame.disabled = true;
});