import EventBus from 'EventBus';

export default interface INotifiable {
    eventBus: EventBus;
    onNotify(event: string, data: object);
    raiseEvent(event: string, data: object);
    setEventBus(eventBus: EventBus);
}