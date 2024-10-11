

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

// types
import { Request , Response } from "express-serve-static-core"
import { ClientError, getExactError, response } from "../dto/response"
import { Bike } from "@prisma/client"
import { bikeDTO } from "../dto/bikeDTO";
import { updateBikeDTO } from "../dto/updateBikeDTO";



export async function getAllBikes(req : Request , res :  Response<response>){
    try {
        const bikes = await prisma.bike.findMany( { orderBy : { createdAt : "desc"}});
        const output : response = { responseCode : 1 , message : "successfully fetched bikes" , data : bikes}
        res.status(200).json(output)
    } catch (err) {
        const result = getExactError(err);
        const { status , message , responseCode} = result
        res.status(status).json({ responseCode , message})
    }
}


export async function addnewBike(req : Request<{},{},bikeDTO> , res :  Response<response>) {
    const { model , year , type, make  } = req.body
    try {
        const yearInt = parseInt(year, 10);
        if(isNaN(yearInt)){
            throw new ClientError(400, "Year should be a valid Number string");
        }else if (!model || !year || !make){
            throw new ClientError(400 , "Provide all required fields (model,year,make)")
        }
        const bike = await prisma.bike.create({ data : {
            year : yearInt , type , model , make
        }})

        res.status(201).json({ responseCode : 1 , message : "Successfully added bike" , data : bike})
        return 
    } catch (err) {
        const result = getExactError(err);
        const { status , message , responseCode} = result
        res.status(status).json({ responseCode , message})
    }
}


export async function updateBike(req : Request<{id : string},{},updateBikeDTO> , res : Response<response>) {
    const { id } = req.params;
    const updateData = req.body 
    try {
        const { year } = updateData
        const yearInt = typeof year === "string" ? parseInt(year,10) : year
        if(year && isNaN(yearInt)){
            throw new ClientError(400,"Year should be Number string / Number")
        }
        const bike = await prisma.bike.update({
            where : { id } ,
            data : { ...updateData , year : yearInt }
        })
        if(!bike){
            throw new ClientError(400,"Bike not found")
        }else{
            res.status(200).json({ responseCode : 1 , message : "successfully updated bike data" , data : bike})
        }
    } catch (err) {
        const result = getExactError(err);
        const { status , message , responseCode} = result
        res.status(status).json({ responseCode , message})
    }
}


export async function deleteBike(req : Request<{id : string},{},Partial<Bike>> , res : Response<response>) {
    const { id } = req.params
    try {
        const bike = await prisma.bike.delete({ where : { id }})
        if(!bike){
            throw new ClientError(400,"Bike not found")
        }else{
            res.status(200).json({ responseCode : 1 , message : "successfully deleted bike data" , data : bike})
        }
    } catch (err) {
        const result = getExactError(err);
        const { status , message , responseCode} = result
        res.status(status).json({ responseCode , message})
    }
}