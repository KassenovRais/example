import { createSlice , createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios ,{AxiosRequestConfig , AxiosResponse} from "axios";
import { ICommentProps, ICommentValue  } from "../Interface/IComment";



const commentState:ICommentProps[] = []


export const getDataComment = createAsyncThunk(
       'getcomment',
       async () => {
              const responce = await axios.get<AxiosRequestConfig , AxiosResponse <ICommentProps[]>>('/comments')
              
              return responce.data
       }
)


export const getDataCommentId = createAsyncThunk(
       'getcommentId',
       async (news_id:string) => {
              const responce = await axios.get<AxiosRequestConfig , AxiosResponse <ICommentProps[]>>(`/comments?news_id=${news_id}`)
              
              return responce.data
       }
)

export const postDataComment = createAsyncThunk(
       'postcomment',
       async (item:ICommentValue) => {
              const responce = await axios.post(`/comments` , {author:item.author,
                                                               comment:item.comment,
                                                               news_id:item.news_id})
              

              return responce.data
       }

)

export const deleteDataComment = createAsyncThunk(
       'deletecomment',
       async (comment_id:string) => {
              const responce = await axios.delete<AxiosRequestConfig , AxiosResponse <ICommentProps>>(`/comments/${comment_id}`)

              return responce.data
       }
)


const commentReducer = createSlice({
       name: 'comment',
       initialState: commentState,
       reducers:{
       
       },
       extraReducers:(builder) => {
              builder
              .addCase(getDataCommentId.fulfilled , (state , {payload}) => {
                     return state = [...payload]
              })
              .addCase(getDataComment.fulfilled ,(state , {payload}) => {
                     return state = [...state]
              })
              .addCase(postDataComment.fulfilled , (state , {payload}) => {
                     return state = [ ...state , payload]
              })
              .addCase(deleteDataComment.fulfilled , (state , {payload}) => {
                     const index:number = state.findIndex((val) => val._id === payload._id)
                     
                     if(index !== -1) {
                            const res: ICommentProps[] = state.splice(index , 1)
                            state = [...res]
                     }
              })     
       }
})



export default commentReducer.reducer