import readline from "readline"
import Direction from "./direction.js"
import sleep from "./utils.js"

class SnakeGame {
    constructor() {
        this.width = 30
        this.height = 20
        this.snake = [{ x: 10, y: 10 }]
        this.food = [{ x: 12, y: 10 }]
        this.direction = Direction.RIGHT
        this.score = 0
        this.gameOver = false
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
    }

    start() {
        this.drawBoard()
        this.listenInput()
        this.play()
    }

    drawBoard() {
        console.clear()
        for (let y = 0; y < this.height; y++) {
            let row = ''
            for (let x = 0; x < this.width; x++) {
                if (this.snake.some(pos => pos.x === x && pos.y === y)) {
                    row += '■'
                } else if (this.food.some(pos => pos.x === x && pos.y === y)) {
                    row += '*'
                } else {
                    row += '.'
                }
            }
            console.log(row)
        }
        console.log(`\nScore: ${this.score}\n`)
    }

    listenInput() {
        // Listen user input and move snake

    }

    async play() {
        // Play the game until it's not game over
        while (!this.gameOver) {
            this.drawBoard()
            await sleep(550)
        }
    }

}

export default SnakeGame
