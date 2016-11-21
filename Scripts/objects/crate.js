var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Crate = (function (_super) {
        __extends(Crate, _super);
        function Crate(defaultPosition) {
            _super.call(this, crate_anim, "crate");
            this.x = defaultPosition.x;
            this.y = defaultPosition.y;
        }
        Crate.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Crate.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return Crate;
    }(objects.GameObject));
    objects.Crate = Crate;
})(objects || (objects = {}));
//# sourceMappingURL=crate.js.map