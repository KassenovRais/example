import {Router , Request , Response} from 'express'
import Comment from '@src/Models/Comment.model';
import CommentDto from '@src/DTO/Comment.dto';
import News from '@src/Models/News.model';

const commentController: Router = Router()

commentController.get('' , async(req:Request , res:Response) => {

       const {news_id} = req.query

       if(news_id) {
              try {
                     const responceComment = await Comment.find({news_id: news_id})
       
                     res.send(responceComment)
       
              } catch (error) {
                     res.status(404).send('Error')
              }

       }else{
              try {
                     const responceComment = await Comment.find()
       
                     res.send(responceComment)
       
              } catch (error) {
                     res.status(404).send('Error')
              }
       }

       

})

commentController.post('' , async(req:Request , res:Response) => {


       try {
              const {news_id  , comment} = req.body      

              const commentDto:CommentDto = new CommentDto(news_id , req.body.author? req.body.author : 'Anonymous' , comment)              

              const responceComment = new Comment(commentDto)              

              const responseNews = await News.findById(news_id)

              if(responseNews){
                     await responceComment.save()

                     res.send(responceComment)
              }else{
                     res.status(404).send("Error")
              }

              
              
       } catch (error) {
              res.status(404).send('Error')
       }

})


commentController.delete('/:id' , async (req:Request , res:Response) => {
       
       const {id} = req.params

       
       try {
              const responceComment = await Comment.findByIdAndRemove(id)
              if(responceComment) {
                     res.send(responceComment)
              }

       
       } catch (error) {
              res.status(404).send('Error')
       }

})

export default commentController