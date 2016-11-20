module objects {
    export class GameObject extends createjs.Sprite {
        private _width:number;
        private _height:number;
        private _name:string;
       // private _position:Vector2;

        private _TRCorner:Vector2;
        private _TLCorner:Vector2;
        private _BRCorner:Vector2;
        private _BLCorner:Vector2

        public collisionEnter:boolean=false;
        public dead:boolean = false;

        //private _deathAnim:string;

        // PUBLIC PROPERTIES
        get width() : number {
            return this._width
        }

        set width(w:number) {
            this._width = w;
        }

        get height() : number {
            return this._height
        }

        set height(h:number) {
            this._height = h;
        }

        get name() : string {
            return this._name;
        }

        set name(s:string) {
            this._name = s;
        }

        /*get position() : Vector2 {
            return this._position
        }

        set position(p:Vector2) {
            this._position = p;
        }
        */

        get tr_corner() : Vector2 {
            return new objects.Vector2(this.x + this.width * 0.5, this.y - this.height * 0.5);
        }

        get tl_corner() : Vector2 {
            return new objects.Vector2(this.x - this.width * 0.5, this.y - this.height * 0.5);
        }

        get br_corner() : Vector2 {
            return new objects.Vector2(this.x + this.width * 0.5, this.y + this.height * 0.5);
        }

        get bl_corner() : Vector2 {
            return new objects.Vector2(this.x - this.width * 0.5, this.y + this.height * 0.5);
        }

        constructor(animation : createjs.SpriteSheet, objectName:string, singleImageString:string=null,w:number =0, h:number=0) {
            if(animation != null)
                super(animation,"idle");
            else{
                 let newData = {
                    "images": [assets.getResult(singleImageString)],
                    "frames": {width:w, height:h},
                    "animations": {                        
                        "idle": {"frames": [0]}
                    }
                }
                var temp_anim = new createjs.SpriteSheet(newData);

                super(temp_anim,"idle");
            }                
            //this._deathAnim = deathAnimString;
            this.name = objectName;
            this._initialize();
            this.start();
        }

        private _initialize():void {
           
            //console.log("initializing "+this.name)
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            //this.position = new Vector2(this.x, this.y);
        }

        public start():void {}
        public update():void {
            //this.x = this.position.x;
           // this.y = this.position.y;

           // if(this.currentAnimationFrame == shipAtlas.getNumFrames("explode") - 1) {
           //     currentScene.removeChild(this);
            //}
        }

        public destroy() : void {
            //this.gotoAndPlay(this._deathAnim);
            //if(this.name=="enemy"){
            //        this.name="dead_enemy"
           // }
               
          
             currentScene.removeChild(this);
        }
    }
}