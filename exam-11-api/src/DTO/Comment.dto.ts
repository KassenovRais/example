
export default class CommentDto {
       news_id:string;
       author:string
       comment:string
       
       constructor(news_id:string,author:string,comment:string) {
              this.author = author
              this.comment = comment
              this.news_id = news_id
       }

}
