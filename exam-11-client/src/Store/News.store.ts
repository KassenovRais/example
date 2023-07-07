import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { INewsProps, INewsValue , INews} from "../Interface/INews";
import axios , {AxiosRequestConfig , AxiosResponse} from "axios";

const newsState: INews = {
       news:[],
       newsId:{
              _id:'',
              title:'',
              description:'',
              imageNews:'',
              datePub:''
       }
}


export const getDataNews = createAsyncThunk(
       'getnews',
       async () => {
              const responce = await axios.get<AxiosRequestConfig , AxiosResponse <INewsProps[]>>('/news')

              return responce.data
       }
)

export const postDataNews =  createAsyncThunk(
       'postnews',
       async (item:FormData) => {
              const responce = await axios.post<AxiosRequestConfig , AxiosResponse <INewsProps>>('/news' , item)

              return responce.data
       }
)

export const deleteDataNews = createAsyncThunk(
       'deletenews',
       async (id:string) => {
              console.log(id);
              
              const responce = await axios.delete(`/news/${id}`)

              return responce.data
       }
)


export const getDataNewsId = createAsyncThunk(
       'getnewsId',
       async (id:string) => {
              const responce = await axios.get<AxiosRequestConfig , AxiosResponse <INewsProps>>(`/news/${id}`)

              return responce.data
       }
)



const newsReducer = createSlice({
       name: 'news',
       initialState:newsState,
       reducers:{

       },
       extraReducers:(builder) => {
              builder
              .addCase(getDataNews.fulfilled ,(state , {payload}) => {
                     return state = {...state ,news: [...payload]}
              })
              .addCase(postDataNews.fulfilled , (state ,{payload} ) => {
                     return state = {...state ,news: [...state.news , payload]}
              })
              .addCase(deleteDataNews.fulfilled , (state , {payload}) => {
                     
                     const index :number = state.news.findIndex((val) => payload._id !== val._id )
                     
                     if(index !== -1){
                            const res:INewsProps[] = state.news.splice(index , 1)
                            state = {...state , news:res}
                     }
              })
              .addCase(getDataNewsId.fulfilled , (state , {payload} ) => {
                     
                     return state = {...state , newsId: payload}
              
              })
       }
})



export const {} = newsReducer.actions

export default newsReducer.reducer