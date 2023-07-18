import LessonsDto from "@src/DTO/SortTutorial";
import LessonsModel from "@src/Models/lessons";
import { Router , Request , Response } from "express";
import { TutorialType } from "@src/Enum/Enum.tutorial.type";
import multer from "multer";
import { uploadPictureByTutorial } from "config";

const storage = multer.diskStorage({
    destination: (req , file , cb ) => { 
        
        cb(null, uploadPictureByTutorial)

    },
    filename: (req, file , cb ) => {

        cb(null , file.originalname)
           
    }
})

const upload = multer({storage})

const TutorialController: Router = Router()


TutorialController.get( '/' , async(req:Request , res:Response) => {

    try {
        const response = await LessonsModel.findAll({where: {lesson_type :  TutorialType.wordsSort}})
    
        res.send(response)
    } catch (error) {
        res.status(404).send('FUK')
    }

})

TutorialController.post('/' , async(req:Request , res:Response) => {

    const {title , description , lesson ,transit_time , lesson_type} = req.body as LessonsDto

    try {
        const copy: boolean = [ title , description , transit_time] 
            .map((val: string) => {
                
                return val.trim() !== '' ? false : true
                
        }).includes(true)
            
        if(!copy) {

            const tutorial = new LessonsDto(title , description , lesson ,transit_time , lesson_type)

            const response = await LessonsModel.create({...tutorial})
    
            response.save()
    
            res.send(response)

        }

    } catch (error) {

        res.status(400).send('FAQ')
        
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