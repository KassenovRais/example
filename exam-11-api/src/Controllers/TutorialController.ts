import { uploadPictureByTutorial } from "../../config";
import LessonsDto from "@src/DTO/SortTutorial";
import e, { Router , Request ,Response } from "express";
import multer from "multer";
import LessonsModel from "@src/Models/lessons";
import { TutorialType } from "@src/Enum/Enum.tutorial.type";


const storage = multer.diskStorage({
    destination: (req , file , cb ) => { 
        
        cb(null, uploadPictureByTutorial)

    },
    filename: (req, file , cb ) => {

        cb(null , file.originalname)
           
    }
})

const upload = multer({storage})


const TutorialController:Router = Router()

TutorialController.post('/' ,async(req:Request , res:Response) => {    

    try {

        const {title , description ,lesson ,transit_time ,lesson_type } = req.body as LessonsDto

        const lessonsDto: LessonsDto = new LessonsDto(title , description ,lesson ,transit_time , lesson_type)

        const response = await LessonsModel.create({...lessonsDto})

        response.save()

        res.send(response)

    } catch (error) {
        res.status(404).send("FAQ")
    }

})



TutorialController.get( '/' , async(req:Request , res:Response) => {

    try {

        const response = await LessonsModel.findAll()

        res.send(response)

    } catch (error) {

        res.status(404).send('FAQ')

    }           

})

TutorialController.post('/save/picturearray' ,upload.array('picture') , (req:Request , res:Response ) => {

    try {
        res.send()
    } catch (error) {
        res.status(404).send('Message ')
    }
    
})

export default TutorialController