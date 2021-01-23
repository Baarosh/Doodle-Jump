import { grid } from './app.js';

interface DoodlerInterface {
    visual: HTMLDivElement
    left: number
    bottom: number
    refresh: (leftChange: number) => void
}

export class Doodler implements DoodlerInterface {
    visual: HTMLDivElement
    left: number
    bottom: number

    constructor() {
        this.visual = document.createElement('div')
        this.left = 100
        this.bottom = 50

        this.visual.classList.add('doodler')
        this.visual.style.bottom = `${this.bottom}px`

        if(grid) {
            grid.appendChild(this.visual)
        }
    }

    refresh(leftChange: number): void{
        this.visual.style.left = `${leftChange}px`
    }
}