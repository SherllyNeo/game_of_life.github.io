const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

const game = new GameOfLife();
game.gameSetUp();
window.onload = () => {
    document.querySelector("#start-random").addEventListener("click", () => {
        game.rand();
        game.fillArray();
    })

    document.querySelector("#stop").addEventListener("click", () => {
        window.location.reload();
        game.gameSetUp();
    })

    document.querySelector("#start").addEventListener("click", () => {
        game.fillArray();
        window.setInterval(() => {
            game.runGame();
        }, 300)
    })

    canvas.addEventListener('mousedown', (event) => { game.draw(event) });

}
