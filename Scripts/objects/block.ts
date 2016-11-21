module objects {
    export class Block extends objects.GameObject {

        constructor(defaultPosition : objects.Vector2) {
            super(null,"block","block",128,128);
           
            //console.log("block" + defaultPosition.x+ " : "+ defaultPosition.y);
            
           this.x = defaultPosition.x;
           this.y = defaultPosition.y
           //this.position =defaultPosition;
        }

          




    }
}