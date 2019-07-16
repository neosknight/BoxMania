import EventBus from 'EventBus';
import INotifiable from './INotifiable';

export default class NotifiableComponent implements INotifiable {
    eventBus: EventBus;

    constructor() {
        this.eventBus = null;
    }

    setEventBus(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    onNotify(event: string, data: object) {}

    raiseEvent(event: string, data: object) {
        this.eventBus.notify(event, data);
    }
}