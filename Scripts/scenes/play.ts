module scenes {
    export class Play extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _player : objects.Player;
        private _blocks : objects.Block[];
        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;
        private _tileSize : number = 128;

        constructor() {
            super();
            //this.start();
        }

        public start() : void {
            this._tileSize = 128;
            console.log("Level started");
            this._bg = new createjs.Bitmap(assets.getResult("background"));
       
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player();

               

            

          

            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
          
            this._blocks = [];   
            this.buildLevel(this);
            this.addChild(this._scrollableObjContainer);
        

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

           // createjs.Sound.play("theme");

            stage.addChild(this);
        }

        public update() : void {

            if(controls.UP) {
                this._player.moveUp();
            }
            if(controls.DOWN) { 
                this._player.moveDown();
            }
             if(controls.LEFT) {
                this._player.slowMo();
            }
             if(controls.RIGHT) {
                this._player.Accelerate();
            }          
           

            this._player.update();

            if(this.checkScroll()) {
                this._scrollBGForward(this._player.x);
            }


        }

        private _onKeyDown(event: KeyboardEvent) : void {
             switch(event.keyCode) {
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
        }

        private _onKeyUp(event : KeyboardEvent) : void {
            switch(event.keyCode) {
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
        }

        private _scrollBGForward(speed : number) : void{
            //if(this._scrollableObjContainer.regX < 4800 - 815)
                this._scrollableObjContainer.regX = speed - 350;
        }

     

        private checkScroll() : boolean {
            if(this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        }

        private checkCollision(obj1 : objects.GameObject, obj2 : objects.GameObject) : boolean {

            if(obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }

            return false;
        }

        private buildLevel(thisThis){
             console.log("Level construction started");
            var blocksToBuild = [[1,5,6,7,8,12,24,25,29,31,32,33,34,38,42,44,45,46],
                                [1,5,8,10,12,24,25,27,34,36,37,38,40,42,44,45,46],
                                [5,10,27,29,31,32,33,34,38,40,42],
                                [1,7,12,24,25,27,29,36,37,38,40,42,44,45,46],
                                [1,6,7,12,24,25,29,31,32,33,34,40,44,45,46]
                                ];
         

            var breakableWalls =[[12,3],[34,4],[38,5],[44,3],[45,3],[46,3]];

            var floatingWalls =[[14,2],[15,2],[16,2],[18,1],[18,3],[20,1],[20,3]];
            var floatingHalfWalls =[[22,1],[22,2],[22,3],[22,4]];

            for(var r=0;r<5;r++){
                blocksToBuild[r].forEach(el => {
                    var currentBlock =new objects.Block(new objects.Vector2(this._tileSize*el+this._tileSize/2,this._tileSize*r+this._tileSize/2))
                    this._blocks.push(currentBlock);
                    this._scrollableObjContainer.addChild(currentBlock);
                });
            }
            console.log("Level construction finished");
        }
    }
}