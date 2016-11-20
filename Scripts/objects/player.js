var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this, player_anim, "player");
            this.isColliding = false;
            this.start();
        }
        Player.prototype.start = function () {
            this.x = 120;
            this.y = 320;
        };
        Player.prototype.update = function () {
            this.x += 5;
            _super.prototype.update.call(this);
        };
        Player.prototype.slowMo = function () {
            this.x -= 3;
        };
        Player.prototype.Accelerate = function () {
            this.x += 3;
        };
        Player.prototype.moveUp = function () {
            this.y -= 3;
        };
        Player.prototype.moveDown = function () {
            this.y += 3;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map