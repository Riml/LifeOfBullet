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
         
            this.x+=5;                
          
            super.update();
        }

        public slowMo() : void {
            this.x -= 3;
        }
        public Accelerate() : void {
            this.x += 3;
        }
      
        public moveUp() : void {
            this.y -= 3;
        }
        public moveDown() : void {
            this.y += 3;
        }
       
    }
}