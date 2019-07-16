import NotifiableComponent from 'NotifiableComponent'

export default class Box extends NotifiableComponent {
    constructor() {
        super()
    }

    onNotify(event: string, data: object) {
        if(event == "player-moved") {
            console.log("Player moved to: ", data);
        }
    }
}