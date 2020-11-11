const grid = document.querySelector('.grid')

class Doodler {
    constructor() {
        this.visual = document.createElement('div')
        this.left = 100
        this.bottom = 50

        this.visual.classList.add('doodler')
        this.visual.style.bottom = `${this.bottom}px`
        grid.appendChild(this.visual)
    }
    refresh(left) {
        this.visual.style.left = `${this.left}px`
    }
}


class Platform {
    constructor(left = 0, bottom = 0) {
        this.visual = document.createElement('div')
        this.left = left
        this.bottom = bottom

        this.visual.classList.add('platform')
        this.visual.style.left = `${this.left}px`
        this.visual.style.bottom = `${this.bottom}px`

        grid.appendChild(this.visual)
    }
}

const createPlatforms = () => {
    for (let i = 0 ; i < platformsAmount; i++) {
        const gap = 700/platformsAmount
        const bottom = 50 + gap*i
        const left = Math.random() * 420

        const platform = new Platform(left, bottom)
        platforms.push(platform)
    }
}

const movePlatforms = () => {
        movePlatformsId = setInterval(() => {
            if(doodler.bottom > 10) {
                platforms.forEach((platform) => {
                    platform.bottom -= 1
                    platform.visual.style.bottom = `${platform.bottom}px`
            })
            } else clearInterval(movePlatformsId)
        }, 10)
}

const moveDoodlerUp = (jumpHeight = 400) => {
        clearInterval(moveDoodlerDownId)

        moveDoodlerUpId = setInterval(() => {
            if(doodler.bottom < jumpHeight) {
                isJumping = true
                doodler.bottom += 5
                doodler.visual.style.bottom = `${doodler.bottom}px`
            } else {
                clearInterval(moveDoodlerUpId)
                moveDoodlerDown()
            }
        }, 10)
}

const moveDoodlerDown = () => {
        clearInterval(moveDoodlerUpId)

        moveDoodlerDownId = setInterval(() => {
            if (doodler.bottom > 0) {
                isJumping = false
                doodler.bottom -= 5
                doodler.visual.style.bottom = `${doodler.bottom}px`
            } else {
                clearInterval(moveDoodlerDownId)
                clearInterval(moveLeftId)
                clearInterval(moveRightId)
                console.log('game over')
            }

            platforms.forEach(platform => {
                if ((doodler.bottom >= (platform.bottom + 10))
                &&  (doodler.bottom <= platform.bottom + 20)
                &&  ((doodler.left + 40) >= platform.left)
                &&  (doodler.left <= (platform.left + 120))
                &&  !isJumping) {
                        console.log('landed')
                        moveDoodlerUp(platform.bottom + 300)
                    }
            })
    }, 10)
}

    const moveLeft = () => {
    if(isRightJumping) {
        clearInterval(moveRightId)
        isRightJumping = false
        }
    if(!isLeftJumping){
        moveLeftId = setInterval(() => {
            if (doodler.left > 0 && doodler.bottom > 0) {
                isLeftJumping = true
                doodler.left -= 5
                doodler.visual.style.left = `${doodler.left}px`
            } else if (doodler.bottom > 0) {
                moveRight()

            } else clearInterval(moveLeftId)
            }, 10)
    }
    }
const moveRight = () => {
    if(isLeftJumping) {
        clearInterval(moveLeftId)
        isLeftJumping = false
    }
    if(!isRightJumping) {
        moveRightId = setInterval(() => {
            if (doodler.left < 460 && doodler.bottom > 0) {
                isRightJumping = true
                doodler.left += 5
                doodler.visual.style.left = `${doodler.left}px`
            } else if (doodler.bottom > 0) {
                moveLeft()

            } else clearInterval(moveRightId)

        }, 10)
    }
}

const control = (e) => {
    if (e.key === 'ArrowLeft' && doodler.bottom > 0) {
         moveLeft()
    }
    else if (e.key === 'ArrowRight' && doodler.bottom > 0) {
        moveRight()

}
    else if (e.key === 'ArrowUp' && doodler.bottom > 0) {
        isLeftJumping = false
        isRightJumping = false
        clearInterval(moveLeftId)
        clearInterval(moveRightId)
}
}

let gameRunning = false
let platformsAmount = 5
let platforms = []
let movePlatformsId
let moveDoodlerUpId
let moveDoodlerDownId
let isJumping
let moveLeftId
let moveRightId
let isLeftJumping = false
let isRightJumping = false

const doodler = new Doodler()

const startGame = () => {
    if(!gameRunning) {
        createPlatforms()
        movePlatforms()
        doodler.refresh(platforms[0].left)
        moveDoodlerUp()
        document.addEventListener('keyup', control)
    }
}

startGame()
