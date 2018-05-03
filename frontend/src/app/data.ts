export class Data {



    constructor(public id = 0, public id_subject: number = 0, public id_stud: number = 0, public note: number = 0) {

        this.id_subject = id_subject;
        this.id_stud = id_stud;
        this.note = 0;

    }
    clone() {
        return new Data(this.id,
            this.id_subject,
            this.id_stud,
            this.note);
    }

}
