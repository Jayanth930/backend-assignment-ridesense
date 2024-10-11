import { Prisma } from "@prisma/client"


// This is when success response
interface success {
    responseCode : 1 ,
    message : string ,
    data : any 
}

// This is when failue response or even error comes
interface failure {
    responseCode : number ,
    message : string
}

// This is the responsetype used for all the api's for response
export type response = success | failure

// Custom Error class to know that its a ClientSide Error
export class ClientError extends Error {
    public status : number;
    constructor(_status : number , message : string){
        super(message);
        this.status = _status
        Object.setPrototypeOf(this, ClientError.prototype);
    }
}

// This is used for getExactError function down below
interface composite extends failure{
    status : number
}


export function getExactError(err : any ) : composite{
    let message : string , status : number , responseCode : number;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = 'Unique constraint failed on the field:' + err.meta.target;
        } else if (err.code === 'P2025') {
            message = 'Record not found.';
        } else if (err.code === 'P2014') {
            message = 'Foreign key constraint failed.';
        } else if (err.code === 'P2003') {
            message = 'Required field missing.';
        } else if(err.code === 'P1012'){
            message = err.message
        } else {
            message = 'An unknown error occurred:'
        }
        status = 401;
        responseCode = 2
    }else if(err instanceof ClientError){
        status = err.status;
        message = err.message
        responseCode = 4
    }else{
        status = 500 
        message = err.message
        responseCode = 0
    }
    return {
        responseCode ,
        message,
        status
    }
}
