class User{
    constructor(obj){
        this.isInside=obj.isInside != undefined || false;
        if(obj.destinationFloor === undefined){
            throw console.error("Need Destination floor");
            
        }
        this.destinationFloor = obj.destinationFloor;
    }
}

module.exports=User;