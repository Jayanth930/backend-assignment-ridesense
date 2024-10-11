

export function isNumber(key : any) : boolean{
    const number = parseInt(key,10);
    return isNaN(number) ? false : true
}