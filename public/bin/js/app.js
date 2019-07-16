var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
;
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.subscribers = [];
    }
    EventBus.prototype.subscribe = function (object) {
        this.subscribers.push(object);
        object.setEventBus(this);
        return true;
    };
    EventBus.prototype.unsubscribe = function (object) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === object) {
                this.subscribers.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    EventBus.prototype.notify = function (event, data) {
        if (data === void 0) { data = {}; }
        if (event == "")
            return false;
        this.subscribers.forEach(function (subscriber) {
            subscriber.onNotify(event, data);
        });
        return true;
    };
    return EventBus;
}());
var Component = /** @class */ (function () {
    function Component() {
        this.eventBus = null;
    }
    Component.prototype.setEventBus = function (eventBus) {
        this.eventBus = eventBus;
    };
    return Component;
}());
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Player.prototype.onNotify = function (event, data) {
    };
    Player.prototype.updatePlayerPosition = function () {
    };
    Player.prototype.move = function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        this.eventBus.notify("player-moved", { x: this.x, y: this.y });
        this.updatePlayerPosition();
    };
    return Player;
}(Component));
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super.call(this) || this;
    }
    Box.prototype.onNotify = function (event, data) {
        if (event == "player-moved") {
            console.log("Player moved to: ", data);
        }
    };
    return Box;
}(Component));
var eventBus = new EventBus();
var player = new Player(2, 3);
var box = new Box();
eventBus.subscribe(box);
eventBus.subscribe(player);
player.move(1, 1);
