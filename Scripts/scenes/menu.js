/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.start = function () {
            console.log("Menu Scene Started");
            gamelost = false;
            this._playBtn = new objects.Button("playBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 140);
            this._playBtn.on("click", this._playBtnClick, this);
            this.addChild(this._playBtn);
            this._tutorialBtn = new objects.Button("instBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 240);
            this._tutorialBtn.on("click", this._tutorialBtnClick, this);
            this.addChild(this._tutorialBtn);
            this._menuBG = new createjs.Bitmap(assets.getResult("menu_bg"));
            // this.addChild(this._menuBG);
            this.addChildAt(this._menuBG, 0);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        Menu.prototype._playBtnClick = function (event) {
            scene = config.Scene.GAME;
            changeScene();
        };
        Menu.prototype._tutorialBtnClick = function (event) {
            scene = config.Scene.TUTORIAL;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map