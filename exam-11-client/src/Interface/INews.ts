export interface INewsProps{
       _id:string
       title:string
       description:string
       imageNews:string
       datePub:string
}
export interface INewsValue{
       title:string
       description:string
       imageNews:string
}

export interface INews {
       news:INewsProps[]
       newsId:INewsProps
}