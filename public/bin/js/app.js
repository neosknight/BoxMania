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
System.register("INotifiable", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("EventBus", [], function (exports_2, context_2) {
    "use strict";
    var EventBus;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            EventBus = /** @class */ (function () {
                function EventBus() {
                    this.subscribers = [];
                }
                EventBus.prototype.subscribe = function (subscriber) {
                    this.subscribers.push(subscriber);
                    subscriber.setEventBus(this);
                    return true;
                };
                EventBus.prototype.unsubscribe = function (subscriber) {
                    for (var i = 0; i < this.subscribers.length; i++) {
                        if (this.subscribers[i] === subscriber) {
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
            exports_2("default", EventBus);
        }
    };
});
System.register("NotifiableComponent", [], function (exports_3, context_3) {
    "use strict";
    var NotifiableComponent;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            NotifiableComponent = /** @class */ (function () {
                function NotifiableComponent() {
                    this.eventBus = null;
                }
                NotifiableComponent.prototype.setEventBus = function (eventBus) {
                    this.eventBus = eventBus;
                };
                NotifiableComponent.prototype.onNotify = function (event, data) { };
                NotifiableComponent.prototype.raiseEvent = function (event, data) {
                    this.eventBus.notify(event, data);
                };
                return NotifiableComponent;
            }());
            exports_3("default", NotifiableComponent);
        }
    };
});
System.register("Box", ["NotifiableComponent"], function (exports_4, context_4) {
    "use strict";
    var NotifiableComponent_1, Box;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (NotifiableComponent_1_1) {
                NotifiableComponent_1 = NotifiableComponent_1_1;
            }
        ],
        execute: function () {
            Box = /** @class */ (function (_super) {
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
            }(NotifiableComponent_1.default));
            exports_4("default", Box);
        }
    };
});
System.register("Player", ["NotifiableComponent"], function (exports_5, context_5) {
    "use strict";
    var NotifiableComponent_2, Player;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (NotifiableComponent_2_1) {
                NotifiableComponent_2 = NotifiableComponent_2_1;
            }
        ],
        execute: function () {
            Player = /** @class */ (function (_super) {
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
            }(NotifiableComponent_2.default));
            exports_5("default", Player);
        }
    };
});
System.register("app", ["EventBus", "Player", "Box"], function (exports_6, context_6) {
    "use strict";
    var EventBus_1, Player_1, Box_1, eventBus, player, box;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (EventBus_1_1) {
                EventBus_1 = EventBus_1_1;
            },
            function (Player_1_1) {
                Player_1 = Player_1_1;
            },
            function (Box_1_1) {
                Box_1 = Box_1_1;
            }
        ],
        execute: function () {
            eventBus = new EventBus_1.default();
            player = new Player_1.default(2, 3);
            box = new Box_1.default();
            eventBus.subscribe(box);
            eventBus.subscribe(player);
            player.move(1, 1);
        }
    };
});
