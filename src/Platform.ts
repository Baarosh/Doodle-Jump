import { grid } from "./app.js"

interface PlatformInterface {
    visual: HTMLDivElement
    left: number
    bottom: number
}

export class Platform implements PlatformInterface {
    visual: HTMLDivElement
    left: number
    bottom: number

    constructor(left = 0, bottom = 0) {
        this.visual = document.createElement('div')
        this.left = left
        this.bottom = bottom

        this.visual.classList.add('platform')
        this.visual.style.left = `${this.left}px`
        this.visual.style.bottom = `${this.bottom}px`

        if(grid) {
            grid.appendChild(this.visual)
        }
    }
}