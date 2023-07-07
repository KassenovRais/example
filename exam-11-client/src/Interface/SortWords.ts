export  interface ISortObject {
    id:string
    title :string
    description :string
    lessons: {
        arrWords: IWordSortTutorial[],
        checkedWord : IWordSortTutorial  [] 
    }
    transit_time: string
}

export interface IWordSortTutorial {
    value:string
    isDrable:boolean
    id:string
    styleHandler :boolean
}


export interface Check {
   
    
} 