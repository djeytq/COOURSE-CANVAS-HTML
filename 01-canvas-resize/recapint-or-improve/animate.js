
class Animate {
    objArray = [];
    animating = false;

    constructor(c) {
        this.c = c;
    }


    saveObj(ob) {
        this.objArray.push(ob);
    }

    generateManyObjs(numOfObjs, classe) {
        for (var i = 0; i < numOfObjs; i++) {
            this.saveObj(new classe(this.c)); //create and put the obj into array
            //this.objArray[i].draw();//draw the obj
        }
    }

    moveTheObjs() {
        this.c.clearRect(0, 0, innerWidth, innerHeight);
        for (var obj of this.objArray) {
            obj.update();
        }

    }


}

export default Animate;