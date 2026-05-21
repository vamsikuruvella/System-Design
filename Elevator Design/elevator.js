class Elevator {
    constructor(obj) {
        this.user = [];
        this.currentFloor = obj.currentFloor || 0;
        this.destinationFloor = obj.destinationFloor || 0;
        this.speed = obj.speed || 2;
        this.isMoving = obj.isMoving || false;
        this.has=0;
        this.limit=10;
    }
    requiredTime(floorNum) {
        //return time it takes to go to 'floorNum'
        if (floorNum < this.destinationFloor) {
            return (floorNum - this.currentFloor) * this.speed;
        }
    }
    goUp(floorNum) {
        this.isMoving = true;
        let i = this.currentFloor
        while (i < this.destinationFloor) {
            setTimeout(() => {
                this.currentFloor = ++i;
            }, 2000)
        }
        this.isMoving=false;
    }
    goDown(floorNum){
        this.isMoving = true;
        let i = this.currentFloor
        while (i > this.destinationFloor) {
            setTimeout(() => {
                this.currentFloor = --i;
            }, 2000)
        }
        this.isMoving=false;
    }
}

module.exports= Elevator;