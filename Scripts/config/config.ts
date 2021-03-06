/*
    Module to store globally accessible values and states for the game.
*/
module config {
    export class Scene {
        public static MENU : number = 0;
        public static GAME : number = 1;
        public static TUTORIAL : number = 2;
    }

    export class Screen {
        public static WIDTH : number = 1000;
        public static HEIGHT : number = 640;
        public static CENTER_X : number = 500;
        public static CENTER_Y : number = 320;
    }
    
    export class Game {
        public static FPS : number = 60;
    }
  
}