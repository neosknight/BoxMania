interface INotifiable {
    onNotify(event: string, data: object);
};

class EventBus {
    subscribers: Array<INotifiable>;

    constructor() {
        this.subscribers = [];
    }

    subscribe(object: Component & INotifiable) {
        this.subscribers.push(object)
        object.setEventBus(this);

        return true;
    }

    unsubscribe(object) {
        for(var i = 0; i < this.subscribers.length; i++) {
            if(this.subscribers[i] === object) {
                this.subscribers.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    notify(event, data = {}) {
        if(event == "") return false;

        this.subscribers.forEach((subscriber) => {
            subscriber.onNotify(event, data);
        });

        return true;
    }
}

class Component {
    eventBus: EventBus;

    constructor() {
        this.eventBus = null;
    }

    setEventBus(eventBus: EventBus) {
        this.eventBus = eventBus;
    }
}

class Player extends Component implements INotifiable {
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
        this.eventBus.notify("player-moved", { x: this.x, y: this.y });
        this.updatePlayerPosition();
    }
}

class Box extends Component implements INotifiable {
    constructor() {
        super()
    }

    onNotify(event: string, data: object) {
        if(event == "player-moved") {
            console.log("Player moved to: ", data);
        }
    }
}

let eventBus = new EventBus();
let player = new Player(2, 3);
let box = new Box();

eventBus.subscribe(box);
eventBus.subscribe(player);
player.move(1, 1);