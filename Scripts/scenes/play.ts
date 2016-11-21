module scenes {
    export class Play extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _player : objects.Player;
        private _blocks : objects.Block[];
        private _blocksPenetratable : objects.Block[];
        private _saws : objects.Block[];
        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;
        private _tileSize : number = 128;
        private _winBtn: objects.Button;
        private _loseBtn: objects.Button;

       

        constructor() {
            super();
            //this.start();
        }

        public start() : void {
            stopGame=false;

            this._winBtn = new objects.Button("winBtn", 75, 25);
            this._winBtn.on("click", this._winBtnClick, this);
            this._loseBtn = new objects.Button("loseBtn", 75, 25);
            this._loseBtn.on("click", this._loseBtnClick, this);

            animationInPlay=false;
            idleAnimationInPlay=true;
            this._tileSize = 128;

            console.log("Level started");
            this._bg = new createjs.Bitmap(assets.getResult("background"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player();this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
          
            
            this._blocks = [];
            this._saws = [];      
            this.buildLevel(this);
            this.addChild(this._scrollableObjContainer);
        

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

           // createjs.Sound.play("theme");

            stage.addChild(this);
        }

        public update() : void {
            //console.log( "animationInPlay? : " +animationInPlay);
            if(controls.UP) {
                this._player.moveUp();
            }
            if(controls.DOWN) { 
                this._player.moveDown();
            }
             if(controls.LEFT) {
                this._player.slowMo();
             
                if(!animationInPlay){
                 
                    this._player.gotoAndPlay("slow");
                    animationInPlay=true;
                }
            }
             if(controls.RIGHT) {
                this._player.Accelerate();
                if(!animationInPlay){
                    this._player.gotoAndPlay("fast");
                    animationInPlay=true;
                }
            }

             if(!animationInPlay &&  idleAnimationInPlay){
                    this._player.gotoAndPlay("idle");
                    idleAnimationInPlay=false;
                   
            }   

            this._blocks.forEach(block => {
                     this.checkCollision(this._player, block);
                    });
             this._saws.forEach(saw => {
                     this.checkCollision(this._player, saw); 
                     saw.update();               
                    });   
           

            this._player.update();

            if(this.checkScroll()) {
                this._scrollBGForward(this._player.x);
            }

            if(this._player.x >12100){
                stopGame=true;
                stage.addChild(this._winBtn);
            }


        }

        private _onKeyDown(event: KeyboardEvent) : void {
             switch(event.keyCode) {
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
                    animationInPlay=false;
                    idleAnimationInPlay=true;
                  
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    animationInPlay=false;
                    idleAnimationInPlay=true;
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

        private checkCollision(obj1 : objects.GameObject, obj2 : objects.GameObject) {

        if(!stopGame){
           if( obj1.tr_corner.x < obj2.tr_corner.x &&
                obj1.tr_corner.x > obj2.tl_corner.x && 
                obj1.tr_corner.y < obj2.bl_corner.y &&
                obj1.br_corner.y > obj2.tl_corner.y) {
               
               stopGame=true;
               stage.addChild(this._loseBtn);
            }
        }

            
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
            var floatingSaws =[[14,2],[15,2],[16,2],[18,1],[18,3],[20,1],[20,3]];
            var floatingHalfWalls =[[22,1],[22,2],[22,3],[22,4]];


            for(var r=0;r<5;r++){
                blocksToBuild[r].forEach(el => {
                    var currentBlock =new objects.Block(new objects.Vector2(this._tileSize*2*el+this._tileSize/2,this._tileSize*r+this._tileSize/2))
                    this._blocks.push(currentBlock);
                    this._scrollableObjContainer.addChild(currentBlock);
                });
            }

            floatingSaws.forEach(el => {
                var currentBlock =new objects.Saw(new objects.Vector2(this._tileSize*2*el[0]+this._tileSize/2,this._tileSize*el[1]+this._tileSize/2))
                this._saws.push(currentBlock);
                this._scrollableObjContainer.addChild(currentBlock);

                
            });
            console.log("Level construction finished");
        }

        private _winBtnClick(event : createjs.MouseEvent){
            
            scene = config.Scene.MENU;
            changeScene();


        }

         private _loseBtnClick(event : createjs.MouseEvent){
           
            scene = config.Scene.MENU;
            changeScene();


        }
    







}

}