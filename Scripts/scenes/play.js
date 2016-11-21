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
            stopGame = false;
            this._winBtn = new objects.Button("winBtn", 75, 25);
            this._winBtn.on("click", this._winBtnClick, this);
            this._loseBtn = new objects.Button("loseBtn", 75, 25);
            this._loseBtn.on("click", this._loseBtnClick, this);
            animationInPlay = false;
            idleAnimationInPlay = true;
            this._tileSize = 128;
            console.log("Level started");
            this._bg = new createjs.Bitmap(assets.getResult("background"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player();
            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._blocks = [];
            this._saws = [];
            this._crates = [];
            this.buildLevel(this);
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            // createjs.Sound.play("theme");
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            var _this = this;
            //console.log( "animationInPlay? : " +animationInPlay);
            if (controls.UP) {
                this._player.moveUp();
            }
            if (controls.DOWN) {
                this._player.moveDown();
            }
            if (controls.LEFT) {
                this._player.slowMo();
                if (!animationInPlay) {
                    this._player.gotoAndPlay("slow");
                    animationInPlay = true;
                }
            }
            if (controls.RIGHT) {
                this._player.Accelerate();
                if (!animationInPlay) {
                    this._player.gotoAndPlay("fast");
                    animationInPlay = true;
                }
            }
            if (!animationInPlay && idleAnimationInPlay) {
                this._player.gotoAndPlay("idle");
                idleAnimationInPlay = false;
            }
            this._blocks.forEach(function (block) {
                _this.checkCollision(_this._player, block);
            });
            this._saws.forEach(function (saw) {
                _this.checkCollision(_this._player, saw);
                saw.update();
            });
            this._crates.forEach(function (crate) {
                //console.log("frame" +crate.currentAnimationFrame);
                if (crate.currentAnimationFrame > 2.5) {
                    _this._scrollableObjContainer.removeChild(crate);
                    _this.removeChild(crate);
                }
                else
                    _this.checkCollision(_this._player, crate);
            });
            this._player.update();
            if (this.checkScroll()) {
                this._scrollBGForward(this._player.x);
            }
            if (this._player.x > 12100) {
                stopGame = true;
                stage.addChild(this._winBtn);
            }
            if (this._player.y > 650 || this._player.y < -10) {
                stopGame = true;
                stage.addChild(this._loseBtn);
            }
        };
        Play.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    //console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    //console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    //console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    // console.log("D key pressed");
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
                    animationInPlay = false;
                    idleAnimationInPlay = true;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    animationInPlay = false;
                    idleAnimationInPlay = true;
                    break;
                case keys.SPACE:
                    controls.JUMP = false;
                    break;
            }
        };
        Play.prototype._scrollBGForward = function (speed) {
            this._scrollableObjContainer.regX = speed - 350;
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
            if (!stopGame) {
                if (obj1.tr_corner.x < obj2.tr_corner.x &&
                    obj1.tr_corner.x > obj2.tl_corner.x &&
                    obj1.tr_corner.y < obj2.bl_corner.y &&
                    obj1.br_corner.y > obj2.tl_corner.y) {
                    if (this._player.currentAnimation == "fast" && obj2.name == "crate") {
                        this.crateAnim(obj2);
                    }
                    else {
                        stopGame = true;
                        stage.addChild(this._loseBtn);
                    }
                }
            }
        };
        Play.prototype.crateAnim = function (cr) {
            if (cr.currentAnimation != "blow") {
                cr.gotoAndPlay("blow");
            }
        };
        Play.prototype.buildLevel = function (thisThis) {
            var _this = this;
            console.log("Level construction started");
            var blocksToBuild = [[1, 5, 6, 7, 8, 12, 24, 25, 29, 31, 32, 33, 34, 38, 42, 44, 45, 46],
                [1, 5, 8, 10, 12, 24, 25, 27, 34, 36, 37, 38, 40, 42, 44, 45, 46],
                [5, 10, 27, 29, 31, 32, 33, 34, 38, 40, 42],
                [1, 7, 12, 24, 25, 27, 29, 36, 37, 38, 40, 42, 44, 45, 46],
                [1, 6, 7, 12, 24, 25, 29, 31, 32, 33, 34, 40, 44, 45, 46]
            ];
            var breakableCrates = [[12, 3], [34, 4], [38, 5], [44, 3], [45, 3], [46, 3]];
            var floatingSaws = [[14, 2], [15, 2], [16, 2], [18, 1], [18, 3], [20, 1], [20, 3]];
            var floatingHalfWalls = [[22, 1], [22, 2], [22, 3], [22, 4]];
            for (var r = 0; r < 5; r++) {
                blocksToBuild[r].forEach(function (el) {
                    var currentBlock = new objects.Block(new objects.Vector2(_this._tileSize * 2 * el + _this._tileSize / 2, _this._tileSize * r + _this._tileSize / 2));
                    _this._blocks.push(currentBlock);
                    _this._scrollableObjContainer.addChild(currentBlock);
                });
            }
            floatingSaws.forEach(function (el) {
                var currentBlock = new objects.Saw(new objects.Vector2(_this._tileSize * 2 * el[0] + _this._tileSize / 2, _this._tileSize * (el[1] - 1) + _this._tileSize / 2));
                _this._saws.push(currentBlock);
                _this._scrollableObjContainer.addChild(currentBlock);
            });
            breakableCrates.forEach(function (el) {
                var currentBlock = new objects.Crate(new objects.Vector2(_this._tileSize * 2 * el[0] + _this._tileSize / 2, _this._tileSize * (el[1] - 1) + _this._tileSize / 2));
                _this._crates.push(currentBlock);
                _this._scrollableObjContainer.addChild(currentBlock);
            });
            console.log("Level construction finished");
        };
        Play.prototype._winBtnClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        Play.prototype._loseBtnClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map