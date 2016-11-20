var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this._scrollTrigger = 350;
            this._tileSize = 128;
            //this.start();
        }
        Play.prototype.start = function () {
            this._bg = new createjs.Bitmap(assets.getResult("background"));
            //this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("player");
            this._blocks = [];
            this.buildLevel();
            /*this._pipes = [];
            this._pipes.push(new objects.Pipe(config.PipeSize.SMALL, new objects.Vector2(1208, 450)));
            this._pipes.push(new objects.Pipe(config.PipeSize.MEDIUM, new objects.Vector2(1640, 408)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(1984,363)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(2460, 363)));

            this._blocks = [];
            this._blocks.push(new objects.Block(new objects.Vector2(861,364)));
            this._blocks.push(new objects.Block(new objects.Vector2(946,364)));
            this._blocks.push(new objects.Block(new objects.Vector2(1031,364)));

            this._qBlocks = [];
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(688, 364)));
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(906, 364)));
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(993, 364)));
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(948, 191)));
            */
            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            //this._scrollableObjContainer.addChild(this._ground);
            /*for(let pipe of this._pipes) {
                this._scrollableObjContainer.addChild(pipe);
            }

            for(let block of this._blocks) {
                this._scrollableObjContainer.addChild(block);
            }

            for(let qBlock of this._qBlocks) {
                this._scrollableObjContainer.addChild(qBlock);
            }*/
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            // createjs.Sound.play("theme");
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            if (controls.LEFT) {
                this._player.moveLeft();
            }
            if (controls.RIGHT) {
                this._player.moveRight();
            }
            if (controls.JUMP) {
                this._player.jump();
            }
            if (!controls.RIGHT && !controls.LEFT) {
                this._player.resetAcceleration();
            }
            if (!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
            /*for(let p of this._pipes ) {
                if(this.checkCollision(this._player, p)) {
                    this._player.position.x = p.x - this._player.getBounds().width - 0.01;
                    this._player.setVelocity(new objects.Vector2(0,0));
                    this._player.resetAcceleration();

                    this._player.isColliding = true;
                    
                    console.log(p.name);
                }
                else {
                    this._player.isColliding = false;
                }
            }*/
            this._player.update();
            if (this.checkScroll()) {
                this._scrollBGForward(this._player.position.x);
            }
        };
        Play.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.JUMP = true;
                    break;
            }
        };
        Play.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.JUMP = false;
                    break;
            }
        };
        Play.prototype._scrollBGForward = function (speed) {
            //if(this._scrollableObjContainer.regX < 4800 - 815)
            this._scrollableObjContainer.regX = speed - 300;
        };
        Play.prototype._checkPlayerWithFloor = function () {
            if (this._player.y + this._player.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground.y - this._player.getBounds().height;
                this._player.setIsGrounded(true);
            }
        };
        Play.prototype.checkScroll = function () {
            if (this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        };
        Play.prototype.checkCollision = function (obj1, obj2) {
            if (obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }
            return false;
        };
        Play.prototype.buildLevel = function () {
            var _this = this;
            var blocksToBuild = [[1, 5, 6, 7, 8, 12, 24, 25, 29, 31, 32, 33, 34, 38, 42, 44, 45, 46],
                [1, 5, 8, 10, 12, 24, 25, 27, 34, 36, 37, 38, 40, 42, 44, 45, 46],
                [5, 10, 27, 29, 31, 32, 33, 34, 38, 40, 42],
                [1, 7, 12, 24, 25, 27, 29, 36, 37, 38, 40, 42, 44, 45, 46],
                [1, 6, 7, 12, 24, 25, 29, 31, 32, 33, 34, 40, 44, 45, 46]
            ];
            var breakableWalls = [[12, 3], [34, 4], [38, 5], [44, 3], [45, 3], [46, 3]];
            var floatingWalls = [[14, 2], [15, 2], [16, 2], [18, 1], [18, 3], [20, 1], [20, 3]];
            var floatingHalfWalls = [[22, 1], [22, 2], [22, 3], [22, 4]];
            for (var r = 0; r < 5; r++) {
                blocksToBuild[r].forEach(function (el) {
                    _this._blocks.push(new objects.Block(new objects.Vector2(_this._tileSize * el, _this._tileSize * r)));
                });
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map