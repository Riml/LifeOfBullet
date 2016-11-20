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
    Screen.HEIGHT = 600;
    Screen.CENTER_X = 400;
    Screen.CENTER_Y = 300;
    config.Screen = Screen;
    var Game = (function () {
        function Game() {
        }
        return Game;
    }());
    Game.FPS = 60;
    config.Game = Game;
    var PipeSize = (function () {
        function PipeSize() {
        }
        return PipeSize;
    }());
    PipeSize.SMALL = "pipe1";
    PipeSize.MEDIUM = "pipe2";
    PipeSize.LARGE = "pipe3";
    config.PipeSize = PipeSize;
    var MarioState = (function () {
        function MarioState() {
        }
        return MarioState;
    }());
    MarioState.SMALL = 0;
    MarioState.BIG = 1;
    MarioState.FLOWER = 2;
    config.MarioState = MarioState;
})(config || (config = {}));
//# sourceMappingURL=config.js.map