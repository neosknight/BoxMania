import NotifiableComponent from './NotifiableComponent';

export default class Player extends NotifiableComponent {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    onNotify(event: string, data: object) {

    }

    updatePlayerPosition() {

    }

    move(offsetX: number, offsetY: number) {
        this.x += offsetX;
        this.y += offsetY;
        this.raiseEvent("player-moved", { x: this.x, y: this.y });
        this.updatePlayerPosition();
    }
}