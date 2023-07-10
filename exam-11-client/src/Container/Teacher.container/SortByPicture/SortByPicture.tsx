import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { nanoid } from 'nanoid'
import  { ChangeEvent, useEffect, useState } from 'react'
import { ItemPicture, ITheme, SortPicture } from '../../../Interface/SortPicture'
import SortByPictureComponent from '../../../Component/SortByPictyre/SortByPictureComponent'
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import MessageEnum  from '../../../enum/MessageEnum/MessageEnum'
import { deleteButtonPicture,  iconStyle,  itemBlock, pictureItemBlock, pictureStyle } from './StyleSortPicture/StyleSortPicture'
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios'
import { TutorialType } from '../../../enum/Tutorial.type/Tutorial.type'


const SortByPicture = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const [sortObject , setSortObject] = useState<SortPicture>({
        title: '',
        description: 'awdw',
        lesson: {
            theme: [],
            arrPicture: []
        },
        transit_time: '5655',
        lesson_type : TutorialType.pictureSort
    })

    const messageBy = (message :string , type: MessageEnum) => {
        messageApi.open({
          type: type,
          content: message,
        });
    };

    const changeThemeHandler = (e: ChangeEvent<HTMLInputElement> , index:number) => {

        const {name , value} = e.target
        
        const copyArr: ITheme [] = [...sortObject.lesson.theme]
    
        copyArr[index] = {...copyArr[index] , [name] : value}
        
        setSortObject({...sortObject ,lesson: {...sortObject.lesson , theme: copyArr}})

    }

    const changePicture = (e: ChangeEvent<HTMLInputElement> , index:number , id:string) => {

        if(e.target.files) {

            const file: File = e.target.files[0]             

            if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg') {
                
                return setSortObject({...sortObject, lesson :{...sortObject.lesson , arrPicture: 
                    [...sortObject.lesson.arrPicture , 
                        {id: nanoid() , theme_id: id , picture : file}]}})
                

            }
            
            messageBy('Данное фото не корректного формата' , MessageEnum.error)
        }
    }

    const addAnswer = () => {
        setSortObject({...sortObject ,lesson: {...sortObject.lesson ,theme:
            [...sortObject.lesson.theme , {id: nanoid() ,theme: ''}]}})
    }

    const deletePicture = (index : number) => {

        const copyArr:ItemPicture[] = [...sortObject.lesson.arrPicture]

        copyArr.splice(index , 1)

        setSortObject({...sortObject , lesson:{...sortObject.lesson , arrPicture : copyArr}})

    }

    const deleteBlock = (index:number) => {

        const copy: ITheme[] = [...sortObject.lesson.theme]

        const copyArrPicture: ItemPicture[] = [...sortObject.lesson.arrPicture.filter((val) => {
            return val.theme_id !== copy[index].id
        })]

        copy.splice(index , 1)

        setSortObject({...sortObject , lesson : 
            {...sortObject.lesson ,  arrPicture: copyArrPicture , theme: copy}})

    }

    const saveTutorialHandler = async() => {

        let formData:FormData = new FormData() ;

        const copySortObject: Omit<SortPicture , 'lessons'> = {...sortObject}

        sortObject.lesson.arrPicture.map((val) => {
            for(let key in val) {

                formData.append(key, val[key as keyof typeof val]);

            }
                        
        })
        


        
        
        
        const response = await axios.post('http://localhost:8000/sortPicture' , {
            title: sortObject.title,
            description :sortObject.description,
            lesson: {
                theme :sortObject.lesson.theme,
                arrPicture :formData
            },
            transit_time : sortObject.transit_time,
            lesson_type: sortObject.lesson_type,
            formData
     })        
                     
    }


    const getSortTutorial = async() => {
        const response = await axios.get<AxiosResponseHeaders ,AxiosResponse <SortPicture[]>>('http://localhost:8000/sortPicture' )

        const check = response.data[0].lesson.arrPicture[0].picture

        const res:BlobPart = new Blob([check] , {type: 'image/jpeg'}) 
        
        console.log( check.type);
        
        setCheck(URL.createObjectURL(res));        

    }
    useEffect(() => {

        // getSortTutorial()

    }, [])

    const [check , setCheck] = useState<string> ('')

    
    return (
        <>
            <img src={check} width='100px' />

            <Form>  
                <Typography>
                    <Title>
                        Нужно прописать тему и добавить картинки
                    </Title>
                </Typography>
                <Col span={8} >
                    <Form.Item
                        label='Название задания'
                    >
                        <Input 
                            value={sortObject.title}
                            onChange={(e) => setSortObject({...sortObject,title: e.target.value})} 
                        />
                    </Form.Item>
                </Col>
            </Form>
            <Button
                onClick={addAnswer}
            >
                Добавить тематику 
            </Button>
            <div>
            {
                    sortObject.lesson.theme.map((val , index) => {
                        return <Card 
                            style={pictureItemBlock}
                            key={val.id}
                            hoverable
                            >
                            <SortByPictureComponent                             
                                changeThemeHandler={(e) => changeThemeHandler(e , index)}
                                props={val}
                                changePicture={(e) => changePicture(e , index , val.id)}
                            >
                                <DeleteOutlined 
                                    style={iconStyle}
                                    onClick={() => deleteBlock(index)}
                                /> 
                            
                                <Row>
                                    {
                                        sortObject.lesson.arrPicture.map((pic , index) => {
                                            
                                            return val.id === pic.theme_id ?  
                                                <Col 
                                                    span={3}
                                                    style={itemBlock}
                                                    key={pic.id}
                                                >
                                                    <img      
                                                        style={pictureStyle}
                                                        src={
                                                            URL.createObjectURL(pic.picture)
                                                        } 
                                                        
                                                    />
                                                     
                                                    <CloseOutlined 
                                                        style={deleteButtonPicture}
                                                        onClick={() => deletePicture(index)}
                                                    /> 
                                                </Col>
                                                : null
                                        })
                                    }
                                </Row>
                            </SortByPictureComponent>             
                        </Card> 
                    })

            }
            
            
           </div>
           
            
           {contextHolder}
            <Button
                onClick={() => saveTutorialHandler()}  
            >
                SAVE
            </Button>

        </>
    )
}

export default SortByPicture