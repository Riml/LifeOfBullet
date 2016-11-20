/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _playBtn : objects.Button;
        private _tutorialBtn : objects.Button;
        private _menuBG : createjs.Bitmap;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            console.log("Menu Scene Started");
            gamelost=false;

            this._playBtn = new objects.Button("playBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 140);
            this._playBtn.on("click", this._playBtnClick, this);
            this.addChild(this._playBtn);

            this._tutorialBtn = new objects.Button("instBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y+240 );
            this._tutorialBtn.on("click", this._tutorialBtnClick, this);
            this.addChild(this._tutorialBtn);



            this._menuBG = new createjs.Bitmap(assets.getResult("menu_bg"));
            // this.addChild(this._menuBG);

            this.addChildAt(this._menuBG, 0);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

        private _playBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.GAME;
            changeScene();
        }

        private _tutorialBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.TUTORIAL;
            changeScene();
        }
    }
}