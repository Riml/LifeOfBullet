module objects {
    export class Saw extends objects.GameObject {

        private direction: number;
        private random: number;

        constructor(defaultPosition : objects.Vector2, rnd: boolean=false) {
            super(saw_anim,"saw",);
            this.x = defaultPosition.x;
            this.y = defaultPosition.y
            this.direction=1;
            this.random= 5-Math.random()*3;

            
           
        }

         public update() : void {
            
            if(!stopGame)         
                this.y-=(5+this.random)*this.direction;

            if(this.y <0 || this.y > 640)
                this.direction *=-1;                   
          
            super.update();
        }



    }
}