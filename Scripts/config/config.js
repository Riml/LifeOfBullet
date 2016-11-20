/*
    Module to store globally accessible values and states for the game.
*/
var config;
(function (config) {
    var Scene = (function () {
        function Scene() {
        }
        return Scene;
    }());
    Scene.MENU = 0;
    Scene.GAME = 1;
    config.Scene = Scene;
    var Screen = (function () {
        function Screen() {
        }
        return Screen;
    }());
    Screen.WIDTH = 800;
    Screen.HEIGHT = 640;
    Screen.CENTER_X = 400;
    Screen.CENTER_Y = 320;
    config.Screen = Screen;
    var Game = (function () {
        function Game() {
        }
        return Game;
    }());
    Game.FPS = 60;
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map