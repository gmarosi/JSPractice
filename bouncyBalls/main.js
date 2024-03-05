// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const counter = document.querySelector('p');
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
    canvas.className = "is-playing";
    btn.className = "is-playing";
    counter.className = "is-playing";
    game.start(() => {
        canvas.className = "";
        btn.className = "";
        counter.className = "";
    },
    25, 
    10);
});

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Game {
    #onGameOver;
    #balls;
    #evilCircleSize;
    #evilCircle;
    
    ballCount;
    
    start(onGameOver, ballCount) {
        this.#onGameOver = onGameOver;
        this.ballCount = ballCount;
        this.#evilCircleSize = 10;
        this.#balls = [];
        this.#evilCircle = new EvilCircle(
            random(0 + this.#evilCircleSize, width - this.#evilCircleSize),
            random(0 + this.#evilCircleSize, height - this.#evilCircleSize)
        );

        while (this.#balls.length < this.ballCount) {
            const size = random(10, 20);
            const ball = new Ball(
                // ball position always drawn at least one ball width
                // away from the edge of the canvas, to avoid drawing errors
                random(0 + size, width - size),
                random(0 + size, height - size),
                random(-7, 7),
                random(-7, 7),
                randomRGB(),
                size
            );
        
            this.#balls.push(ball);
        }
        loop();
    }

    update() {
        for (const ball of this.#balls) {
            if (ball.exists) {
                ball.draw();
                ball.update();
                this.ballCollisionDetect(ball);
            }
        }
    
        this.#evilCircle.draw();
        this.#evilCircle.checkBounds();
        this.evilCollisionDetect();

        if(this.ballCount == 0) {
            this.#onGameOver();
            return true;
        }
        return false;
    }

    ballCollisionDetect(checkedBall) {
        for (const ball of this.#balls) {
            if (!(checkedBall === ball) && ball.exists) {
                const dx = checkedBall.x - ball.x;
                const dy = checkedBall.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < checkedBall.size + ball.size) {
                    ball.color = checkedBall.color = randomRGB();
                }
            }
        }
    }

    evilCollisionDetect() {
        for (const ball of this.#balls) {
            if (ball.exists) {
                const dx = this.#evilCircle.x - ball.x;
                const dy = this.#evilCircle.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.#evilCircle.size + ball.size) {
                    ball.exists = false;
                    this.ballCount--;
                }
            }
        }
    }
}

class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

class Ball extends Shape {

    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exists = true;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(Math.abs(this.velX));
        }

        if ((this.x - this.size) <= 0) {
            this.velX = Math.abs(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY));
        }

        if ((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = 'white';
        this.size = 10;

        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    this.x -= this.velX;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.x += this.velX;
                    break;
                case "ArrowUp":
                case "KeyW":
                    this.y -= this.velY;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.y += this.velY;
                    break;
            }
        });
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x -= this.size;
        }

        if ((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if ((this.y + this.size) >= height) {
            this.y -= this.size;
        }

        if ((this.y - this.size) <= 0) {
            this.velY += this.size;
        }
    }
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    const isOver = game.update();
    counter.textContent = `Ball count: ${game.ballCount}`;
    if(isOver) {
        return;
    }

    requestAnimationFrame(loop);
}

const game = new Game();
game.start(() => {
                canvas.className = "";
                btn.className = "";
                counter.className = "";
            },
            25, 
            10);