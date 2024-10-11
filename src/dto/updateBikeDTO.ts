import { Bike } from "@prisma/client"


export type updateBikeDTO = {
    [K in keyof Bike]? : K extends 'year' ? string | number : Bike[K]
}

// Can also be written as 
// type updateDTO = Omit<Partial<Bike>,"year"> & { year : string | number }