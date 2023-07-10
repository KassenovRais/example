import { TutorialType } from "../enum/Tutorial.type/Tutorial.type"

export default interface Tutorial {
    id?: string
    title: string
    description:string
    transit_time: string
    lesson_type: TutorialType
}