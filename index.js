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
            if(doodler.bottom > 0) {
                platforms.forEach((platform) => {
                    platform.bottom -= 5
                    platform.visual.style.bottom = `${platform.bottom}px`
            })
            } else clearInterval(movePlatformsId)
        }, 80)
}

const moveDoodlerUp = () => {
        clearInterval(moveDoodlerDownId)

        moveDoodlerUpId = setInterval(() => {
            if(doodler.bottom < 500) {
                isJumping = true
                doodler.bottom += 20
                doodler.visual.style.bottom = `${doodler.bottom}px`
            } else {
                clearInterval(moveDoodlerUpId)
                moveDoodlerDown()
            }
        }, 60)
}

const moveDoodlerDown = () => {
        clearInterval(moveDoodlerUpId)

        moveDoodlerDownId = setInterval(() => {
            if (doodler.bottom > 0) {
                isJumping = false
                doodler.bottom -= 20
                doodler.visual.style.bottom = `${doodler.bottom}px`
            } else {
                clearInterval(moveDoodlerDownId)
                console.log('game over')
            }

            platforms.forEach(platform => {
                if ((doodler.bottom >= (platform.bottom))
                &&  (doodler.bottom <= platform.bottom + 20)
                &&  ((doodler.left + 40) >= platform.left)
                &&  (doodler.left <= (platform.left + 120))
                &&  !isJumping) {
                        console.log('landed')
                        moveDoodlerUp()
                    }
            })
    }, 60)
}

let gameRunning = false
let platformsAmount = 5
let platforms = []
let movePlatformsId
let moveDoodlerUpId
let moveDoodlerDownId
let isJumping

const doodler = new Doodler()

const startGame = () => {
    if(!gameRunning) {
        createPlatforms()
        movePlatforms()
        doodler.refresh(platforms[0].left)
        moveDoodlerUp()
    }
}

startGame()
