import EventBus from 'EventBus';
import Player from 'Player';
import Box from 'Box';

let eventBus = new EventBus();
let player = new Player(2, 3);
let box = new Box();

eventBus.subscribe(box);
eventBus.subscribe(player);
player.move(1, 1);