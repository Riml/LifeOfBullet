/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Tutorial extends objects.Scene {

        // Button 
        private _backBtn : objects.Button;
        //private _tutorialBtn : objects.Button;
        private _menuBG : createjs.Bitmap;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            console.log("Tutorial Scene Started");
            gamelost=false;

          
            this._menuBG = new createjs.Bitmap(assets.getResult("menu_bg"));
            this.addChild(this._menuBG);

            this._backBtn = new objects.Button("backBtn", config.Screen.CENTER_X-250, config.Screen.CENTER_Y +250);
            this._backBtn.on("click", this._backBtnClick, this);
            this.addChild(this._backBtn);
     

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

       
        private _backBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}