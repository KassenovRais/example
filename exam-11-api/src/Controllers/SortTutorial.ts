import sequelize from "../../config/db.config";
import LessonsDto from "@src/DTO/SortTutorial";
import LessonsModel from "@src/Models/lessons";
import { Router , Request , Response } from "express";
import { SortPicture } from "@src/Interfaces/SortPicture";
import { TutorialType } from "@src/Enum/Enum.tutorial.type";

const SortTutorialController: Router = Router()


SortTutorialController.get( '/' , async(req:Request , res:Response) => {

    const response = await LessonsModel.findAll({where: {lesson_type :  TutorialType.wordsSort}})
    
    res.send(response)

})

SortTutorialController.post('/' , async(req:Request , res:Response) => {

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

export default SortTutorialController