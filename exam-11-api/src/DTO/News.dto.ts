export default class NewsDto {
       title:string;
       description:string;
       imageNews:string;
       datePub:Date;

       constructor(title:string, description:string, imageNews:string,) {
              this.title = title
              this.description = description
              this.imageNews = imageNews
              this.datePub = new Date()
       }
}