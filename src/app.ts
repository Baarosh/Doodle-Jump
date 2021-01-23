import { Doodler } from './Doodler.js';
import * as uts from './utilities';

export const grid: HTMLDivElement | null = document.querySelector('.grid');
export const doodler = new Doodler();
uts.startGame();
