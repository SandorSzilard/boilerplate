export class Subject {



    constructor(public id:number = 0, public id_prof:number=0, public name:string ="") {

        this.id_prof = id_prof;
        this.name=name;

    }
    clone() {
        return new Subject(this.id,
           this.id_prof,
            this.name);
    }

}