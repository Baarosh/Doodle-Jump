import { grid } from './app.js';
export class Doodler {
    constructor() {
        this.visual = document.createElement('div');
        this.left = 100;
        this.bottom = 50;
        this.visual.classList.add('doodler');
        this.visual.style.bottom = `${this.bottom}px`;
        if (grid) {
            grid.appendChild(this.visual);
        }
    }
    refresh(leftChange) {
        this.visual.style.left = `${leftChange}px`;
    }
}
