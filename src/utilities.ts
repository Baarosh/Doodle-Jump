import { Platform } from "./Platform.js"
import { doodler, grid } from './app.js'

const gameRunning = false
const platformsAmount = 5
const platforms: Platform[] = []
let movePlatformsId: number
let moveDoodlerUpId: number
let moveDoodlerDownId: number
let isJumping: boolean
let moveLeftId: number
let moveRightId: number
let isLeftJumping = false
let isRightJumping = false
let score = 0

const createPlatforms = (): void => {
    for (let i = 0 ; i < platformsAmount; i++) {
        const gap: number = 700/platformsAmount
        const bottom: number = 50 + gap*i
        const left: number = Math.random() * 420

        const platform: Platform = new Platform(left, bottom)
        platforms.push(platform)
    }
}

const movePlatforms = (): void => {
    movePlatformsId = setInterval(() => {
        if(doodler.bottom > 10) {
            platforms.forEach((platform) => {
                platform.bottom -= 1
                platform.visual.style.bottom = `${platform.bottom}px`
                if (platform.bottom < 10) {
                    platforms.shift()
                    platform.visual.classList.remove('platform')

                    score++
                    console.log(score)

                    const newPlatform: Platform = new Platform(Math.random() * 420, 750)
                    platforms.push(newPlatform)
                }
        })
        } else clearInterval(movePlatformsId)
    }, 10)
}

const moveDoodlerUp = (jumpHeight = 400): void => {
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

const moveDoodlerDown = (): void => {
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

            if(grid) {
                while(grid.firstChild) {
                    grid.removeChild(grid.firstChild)
                }
            }

            const scoreEl: HTMLHeadingElement | null = document.createElement('h2')
            scoreEl.classList.add('score')
            scoreEl.innerText = `Score: ${score}`
            if (grid) {
                grid.appendChild(scoreEl)
            }
        }

        platforms.forEach(platform => {
            if ((doodler.bottom >= (platform.bottom + 10))
            &&  (doodler.bottom <= platform.bottom + 20)
            &&  ((doodler.left + 40) >= platform.left)
            &&  (doodler.left <= (platform.left + 120))
            &&  !isJumping) {
                    moveDoodlerUp(platform.bottom + 300)
                }
        })
}, 10)
}

const moveLeft = (): void => {
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

const moveRight = (): void => {
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

const control = (e: KeyboardEvent): void => {
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

export const startGame = (): void => {
    if(!gameRunning) {
        createPlatforms()
        movePlatforms()
        doodler.refresh(platforms[0].left)
        moveDoodlerUp()
        document.addEventListener('keydown', control)
    }
}