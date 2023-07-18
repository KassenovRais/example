import sequelize from "config/db.config";
import { Router , Request ,Response} from "express";
import TestModel from "@src/Models/Test.model";
import multer from "multer";
import { uploadPictureByTutorial } from "../../config";
import { nanoid } from "nanoid";
import path from "path";
import TestCheck from "@src/DTO/Comment.dto";

const storage = multer.diskStorage({
    destination: (req , file , cb ) => { 
        
        cb(null, uploadPictureByTutorial)

    },
    filename: (req, file , cb ) => {

        cb(null , file.originalname)
           
    }
})

const upload = multer({storage})




const testConroller:Router = Router()

testConroller.post('/' ,upload.array('picture'),   async(req:Request , res:Response) => {

    
    const response = await TestModel.create({picture:req.body.picture})

    response.save()

    res.send(response)
    



})

testConroller.post('/form' ,upload.array('picture') , (req:Request , res:Response ) => {

    try {
        res.send()
    } catch (error) {
        res.status(404).send('Message ')
    }
    
})

export default testConroller
