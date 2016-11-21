module objects {
    export class Crate extends objects.GameObject {

         constructor(defaultPosition : objects.Vector2) {
            super(crate_anim,"crate",);
            this.x = defaultPosition.x;
            this.y = defaultPosition.y
             
           
        }

         public update() : void {  
             super.update();
        }
        
        public destroy() : void {
                    
            super.destroy();
        }



    }
}