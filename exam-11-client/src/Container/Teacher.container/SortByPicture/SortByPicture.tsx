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

    const [check , setCheck] = useState<Blob>()

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

        const copySortObject: SortPicture = {...sortObject}

        try {

            copySortObject.lesson.arrPicture.map((val) => {
            
                if(typeof val.picture !== 'string'){
    
                    const  file_name = nanoid() + '.' + val.picture.name.split('.').at(-1);
    
                    const  new_file = new File([val.picture], 
                        file_name, 
                        {type: val.picture.type});
    
                    const dataTransfer = new DataTransfer()               
                    
                    dataTransfer.items.add(new_file);
    
                    val.picture = dataTransfer.files[0].name
    
                    formData.append(`picture` , dataTransfer.files[0])
        
                    return val
                    
                }
                
            })
    
            const response = await axios.post('http://localhost:8000/tutorials' , copySortObject )
    
            const responseDouble = await axios.post('http://localhost:8000/tutorials/save/picturearray' , formData)
        
        } catch (error) {
            console.log('Error FAQ');    
        }         
    }

    
    return (
        <>
            <img src={check ? URL.createObjectURL(check) : ''} width='100px' />

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
                                                            typeof pic.picture !== 'string' ?  
                                                            URL.createObjectURL(pic.picture) 
                                                            : 'https://yt3.ggpht.com/ytc/AOPolaRDPxPNLIGR0XaWtsBf6K_wiaqL2ZP2kNiV590Klw=s88-c-k-c0x00ffffff-no-rj'
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