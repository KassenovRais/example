export default class SortTutorial  {
    title:string
    description :string
    lessons :JSON
    transit_time :string
    constructor (title:string,
        description :string,
        lessons :JSON,
        transit_time :string) {
            this.title = title
            this.description = description
            this.lessons = lessons 
            this.transit_time = transit_time 
        
    }
    
}