var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Saw = (function (_super) {
        __extends(Saw, _super);
        function Saw(defaultPosition, rnd) {
            if (rnd === void 0) { rnd = false; }
            _super.call(this, saw_anim, "saw");
            this.x = defaultPosition.x;
            this.y = defaultPosition.y;
            this.direction = 1;
            this.random = 5 - Math.random() * 3;
        }
        Saw.prototype.update = function () {
            if (!stopGame)
                this.y -= (5 + this.random) * this.direction;
            if (this.y < 0 || this.y > 640)
                this.direction *= -1;
            _super.prototype.update.call(this);
        };
        return Saw;
    }(objects.GameObject));
    objects.Saw = Saw;
})(objects || (objects = {}));
//# sourceMappingURL=saw.js.map