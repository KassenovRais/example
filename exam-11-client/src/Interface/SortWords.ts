import Tutorial from "./Tutorial"

export  interface ISortObject extends Tutorial{
    lesson: {
        arrWords: IWordSortTutorial[],
        checkedWord : IWordSortTutorial[] 
    }
}

export interface IWordSortTutorial {
    value:string
    isDrable:boolean
    id:string
    styleHandler :boolean
}
