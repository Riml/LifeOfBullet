module objects {
    export class Player extends objects.GameObject {
      
     
        public isColliding : boolean = false;

        constructor() {
            super(player_anim,"player");
            this.start();
        }

        public start() : void {
          
            this.x = 120;
            this.y = 320;
            
        }

        public update() : void {
            if(!stopGame)         
                this.x+=5;                
          
            super.update();
        }

        public slowMo() : void {
            if(!stopGame)         
                this.x -= 4;
        }
        public Accelerate() : void {
            if(!stopGame)         
                this.x += 5;
        }
      
        public moveUp() : void {
            if(!stopGame)         
                this.y -= 4;
        }
        public moveDown() : void {
            if(!stopGame)         
                this.y += 4;
        }
       
    }
}