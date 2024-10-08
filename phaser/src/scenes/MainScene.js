import { SelectionManager } from './SelectionManager';
import { Jeep } from './Jeep';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.selectables = [];
    }

    preload() {
        // Load assets here
        // this.load.image('jeep', 'path/to/jeep.png'); // Replace with the correct path
    }

    create() {
        const populationCount = 20; // Specify the number of units to create
        this.createInitialUnits(populationCount);

        this.input.mouse.disableContextMenu();

        this.selectionManager = new SelectionManager(this);
    }

    createInitialUnits(count) {
        for (let i = 0; i < count; i++) {
            const x = Phaser.Math.Between(50, this.sys.canvas.width - 50);
            const y = Phaser.Math.Between(50, this.sys.canvas.height - 50);
            this.createJeep(x, y);
        }
    }

    createJeep(x, y) {
        const jeep = new Jeep(this, x, y);
        this.selectables.push(jeep);
    }

    update(time, delta) {
        this.selectables.forEach(unit => {
            unit.move(delta, this.selectables);
        });
    }

    destroy() {
        this.selectionManager.destroy();
    }
}