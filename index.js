const grid = document.querySelector('.grid')
    const a = 'as'

class Doodler {
    constructor(name, left = 0, bottom = 0) {
        this.name = name
        this.div = document.createElement('div')
        this.div.classList.add('doodler')
        this.div.style.left = `${left}px`
        this.div.style.bottom = `${bottom}px`
    }
    createDoodler() {
        grid.appendChild(this.div)
    }
}

let gameRunning = false

const startGame = {
    if (!gameRunning) {
        const doodler = new Doodler('Luke', 0, 0)
        doodler.createDoodler()
        const doodlerDiv = doodler.div
    }}

startGame()