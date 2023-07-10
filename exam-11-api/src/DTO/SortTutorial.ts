import { TutorialType } from "@src/Enum/Enum.tutorial.type"

export default class LessonsDto  {
    title:string
    description :string
    lesson :JSON
    transit_time :string
    lesson_type : TutorialType
    constructor (title:string,
        description :string,
        lesson :JSON,
        transit_time :string,
        lesson_type: TutorialType
        ) {
            this.title = title
            this.description = description
            this.lesson = lesson
            this.transit_time = transit_time
            this.lesson_type = lesson_type 
        
    }
    
}