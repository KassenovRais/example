import { uploadPictureByTutorial } from "../../config";
import LessonsDto from "@src/DTO/SortTutorial";
import e, { Router , Request ,Response } from "express";
import multer from "multer";
import path from "path";
import {nanoid} from 'nanoid'
import LessonsModel from "@src/Models/lessons";
import { TutorialType } from "@src/Enum/Enum.tutorial.type";

const storage = multer.diskStorage({
    destination: (req , file , cb ) => {        
           cb(null, uploadPictureByTutorial)
    },
    filename: (req, file , cb ) => {
           cb(null , nanoid() + path.extname(file.originalname))
           
    }
})

const upload = multer({storage})


const sortPicture:Router = Router()

sortPicture.post('/' ,upload.single('picture'),async(req:Request , res:Response) => {

    // console.log(req.body);
    


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

sortPicture.get( '/' , async(req:Request , res:Response) => {

    try {

        const response = await LessonsModel.findAll({where : {lesson_type :TutorialType.pictureSort}})

        res.send(response)

    } catch (error) {

        res.status(404).send('FAQ')

    }           

})

export default sortPicture