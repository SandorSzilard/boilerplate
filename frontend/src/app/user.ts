export class User {

     

    constructor(public id = 0 ,public name:string = '', public contact:string ='', public verifyIfTeacher = false, public UN:string ='',public PW:string ='') {
        
        this.name = name;
        this.contact = contact;
        this.verifyIfTeacher = verifyIfTeacher;
        this.UN = UN;
        this.PW = PW;
    }
    clone(){
        return new User(this.id,this.name = name,
        this.contact  ,
        this.verifyIfTeacher ,
        this.UN,
        this.PW );
    }
    
}