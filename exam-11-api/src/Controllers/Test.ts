import TestModel from "@src/Models/Test.model";
import { Router , Request, Response } from "express";


const test: Router = Router()

interface IMessage {
    message :Blob
}

test.post('/' , async(req:Request , res:Response) => {

    const {message} = req.body as IMessage

    console.log(message);
    

    const response = await TestModel.create({message : message})

    res.send(response)


})


test.get('/' , async(req:Request , res:Response) => {

    const response = await TestModel.findAll()

    res.send(response)


})

export default test