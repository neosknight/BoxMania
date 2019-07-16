import INotifiable from 'INotifiable';

export default class EventBus {
    subscribers: Array<INotifiable>;

    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber: INotifiable) {
        this.subscribers.push(subscriber);
        subscriber.setEventBus(this);

        return true;
    }

    unsubscribe(subscriber) {
        for(var i = 0; i < this.subscribers.length; i++) {
            if(this.subscribers[i] === subscriber) {
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