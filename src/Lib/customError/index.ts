// create a custom error inheriting from the Error, return the message and errorCode 
export class customError extends Error{
    code:string;
    constructor(message:string,errorCode:string){
        super(message);
        this.name="customError";
        this.code = errorCode;
    }
}