import readline from "readline"
import Direction from "./direction.js"
import sleep from "./utils.js"

class SnakeGame {
    constructor() {
        this.width = 40
        this.height = 20
        this.snake = [/*{ x: 13, y: 10 }, { x: 14, y: 10 },*/ { x: 15, y: 10 }]
        this.food = { x: 20, y: 10 }
        this.direction = Direction.RIGHT
        this.score = 0
        this.gameOver = false
    }

    start() {
        this.drawBoard()
        this.listenInput()
        this.play()
    }

    drawBoard() {
        console.clear()
        console.log('┌' + '─'.repeat(this.width) + '┐')
        for (let y = 0; y < this.height; y++) {
            let row = ''
            for (let x = 0; x < this.width; x++) {
                if (this.snake.some(pos => pos.x === x && pos.y === y)) {
                    row += '@'
                } else if (this.food.x === x && this.food.y === y) {
                    row += '*'
                } else {
                    row += ' '
                }
            }
            console.log(`│${row}│`)
        }
        console.log('└' + '─'.repeat(this.width) + '┘')
        console.log(`\nScore: ${this.score}\n`)
    }

    listenInput() {
        // Listen user input and move snake
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (_, key) => {
            if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
                console.log("\nQuiting game...\n")
                process.exit(130)
            }

            switch (key.name) {
                case 'up':
                    this.direction = Direction.UP
                    break
                case 'down':
                    this.direction = Direction.DOWN
                    break
                case 'left':
                    this.direction = Direction.LEFT
                    break
                case 'right':
                    this.direction = Direction.RIGHT
                    break
            }
            // console.log(`Current direction: ${this.direction}`)
        })

    }

    moveSnake() {
        const head = { ...this.snake[0] }

        switch (this.direction) {
            case Direction.UP:
                head.y -= 1
                break
            case Direction.DOWN:
                head.y += 1
                break
            case Direction.LEFT:
                head.x -= 1
                break
            case Direction.RIGHT:
                head.x += 1
                break
        }

        this.snake.unshift(head)
        this.snake.pop()
    }

    didEatFood() {
        // check if the snake ate the food and update score accordingly
        if (this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
            this.generateFood()
            let tail = this.snake.at(-1)
            this.snake.push({ x: tail.x - 1, y: tail.y })
            this.score += 10
            return true
        }
        return false
    }

    generateFood() {
        // generate food on a random part of the grid
        let newX = Math.floor(Math.random() * this.width)
        let newY = Math.floor(Math.random() * this.height)
        console.log(`X: ${newX}, Y: ${newY}`)
        this.food.x = newX
        this.food.y = newY
    }

    isGameOver() {
        // check if game is over:
        // 1 - snake eating itself
        // 2 - snake going outside the game board (hitting a wall)
        // 3 - no more room left in the game board
    }


    async play() {
        // Play the game until it's not game over
        while (!this.gameOver) {
            this.moveSnake()
            this.drawBoard()
            this.didEatFood()
            await sleep(220)
        }
        process.exit()
    }

}

export default SnakeGame
