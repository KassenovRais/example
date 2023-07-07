import  { ChangeEvent, FormEvent, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import Button from 'antd/es/button/button'
import Tags from '../../../Component/Tag'
import { nanoid } from 'nanoid'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ISortObject, IWordSortTutorial } from '../../../Interface/SortWords'
import ModalByLessons from '../../../Component/ModalByLessons/Modal.by.lessons'
import Typography from 'antd/es/typography/Typography'
import dayjs from 'dayjs';
import ValidetedFN from '../../../helper/Valideted.FN'
import { Card, Col, message, Row, Space } from 'antd'
import { blurStyle, buttonStyle, stockStyle } from './StyleSortTutorial/Style.words'
import { blob } from 'stream/consumers'


const SortTutorial = () => {

    const [valueArea , setArea] = useState<string> ('')

    const [showModal , setModal] = useState<boolean> (false)

    const [isShow ,  setShow] = useState<boolean>(false)

    const [messageApi, contextHolder] = message.useMessage();

    const errorMessage = (message: string) => {
        messageApi.open({
          type: 'error',
          content: message,
        });
    };

    const sucssesMessage = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    

    const [sortObject , setSortObject] = useState<ISortObject>({
        id: nanoid(),
        title: '',
        description: '',
        lessons: {
            arrWords: [],
            checkedWord: []
        },
        transit_time:''
    })
 
    const parseWords = () => {
        setShow(!isShow)

        const copyValue: IWordSortTutorial[] = valueArea.split(' ').map((val) => {

            return {value :val , id: nanoid() , isDrable : false ,styleHandler: false}

        })

        setSortObject({...sortObject , lessons: {
            ...sortObject.lessons , 
            arrWords: copyValue
        }})
        
    }

    const addWord = (val:IWordSortTutorial) => {

        const index:number = sortObject.lessons.arrWords.findIndex((obj) => obj.id === val.id)

        if(index >= 0 ) {         

            const copy : ISortObject = {...sortObject}

            copy.lessons.arrWords[index] = {...copy.lessons.arrWords[index] ,
                isDrable:true , 
                styleHandler: true 
            }

            copy.lessons.checkedWord = [...copy.lessons.checkedWord , {...val ,isDrable:true , 
                styleHandler: true  }]
        
            setSortObject(copy)
        }

    }

    const editWords = () => {
        const copy: ISortObject = {...sortObject}

        copy.lessons.checkedWord = []
        
        setSortObject({...copy})

        setShow(!isShow)
        
    }

    const removeWord = (val:IWordSortTutorial ) => {

        const index:number = sortObject.lessons.arrWords
            .findIndex((obj) => obj.id === val.id)

        const indexChecked:number = sortObject.lessons.checkedWord
            .findIndex((obj) => obj.id === val.id)

        if(index >= 0 && indexChecked >= 0) {

            const copy : ISortObject = {...sortObject}

            copy.lessons.arrWords[index] = {...val ,
                isDrable:false , 
                styleHandler: false 
            }

            copy.lessons.checkedWord.splice(indexChecked , 1)

            setSortObject(copy)

        }

    }
    const onFinish = async(e:FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        
            const copy: string [] = [ sortObject.description , sortObject.transit_time , sortObject.title] 
            
            const valideted: boolean = copy.map((val: string) => {
                
                return val.trim() !== '' ? false : true
                
            }).includes(true)
                
            
        try {
            if(!valideted) {

                const response = await axios.post('http://localhost:8000/sortTutorial' ,            
                    sortObject,
                )  
                
                setModal(!showModal)
                sucssesMessage('Туториал сохранен')
                return setSortObject({
                    id: nanoid(),
                    title: '',
                    description: '',
                    lessons: {
                        arrWords: [],
                        checkedWord: []
                    },
                    transit_time:''
                })
   
            } 
            return errorMessage('Заполните все поля')
        } catch (e) {
            errorMessage('Возникла ошибка при загрузке данных')  
        }
    };

    const cangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const {value , name} = e.target

        setSortObject({...sortObject , [name] : value})
    }

    const changeTime = (e:dayjs.Dayjs | null) => {

        const time:string = ((dayjs(e).minute() * 60) + dayjs(e).second()).toString()

        setSortObject({...sortObject ,transit_time : time} );                    
    
    }

    const validetedSortObject = () => {

        const copy: IWordSortTutorial[] = [...sortObject.lessons.checkedWord]

        if(copy.length !== 0) {
            return setModal(!showModal)
        }
        errorMessage('Вы не выбрали слова')

    }


   
 
    return (
        <>
            <div>
                {
                    !isShow ? 
                        <>  
                            
                            
                                <Row>
                                    <Col span={24}>
                                        <TextArea
                                            style={{ height: "40vh", resize: 'none' }}
                                            maxLength={3000}
                                            value={valueArea}
                                            onChange={(e) => {
                                                setArea(e.target.value)
                                            }} 
                                        /> 
                                    </Col>
                                </Row>
                            
                                <Button
                                    style={buttonStyle}
                                    onClick={parseWords}
                                >
                                    Выборка
                                </Button>
                        </>
                        :
                        <>
                            <div>
                                <Typography>
                                    {
                                        sortObject.lessons.arrWords.map((val) => {
                                            return <span
                                                style={!val.isDrable ? stockStyle : blurStyle}
                                                key={val.id}
                                                onClick={() => addWord(val)}
                                                >{val.value}</span>
                                        })
                                    }
                                </Typography>
                            </div>
                            {
                                sortObject.lessons.checkedWord.map((val) => {
                                    return <Tags
                                        key={val.id}
                                        onClose={() => removeWord(val)}
                                        label={val.value}
                                        closable={true}
                                        
                                        />
                                })
                            }

                                <Row>
                                    <Col span={4}>
                                        <Button
                                            style={buttonStyle}
                                            onClick={editWords}
                                            
                                        >
                                            Редактировать
                                        </Button>
                                    </Col>
                                    <Col span={4}>
                                        <Button
                                            style={buttonStyle}
                                            onClick={validetedSortObject}
                                        >
                                            Сохранить
                                        </Button>
                                    </Col>
                                   
                                </Row>
                                
                        </>
                }
                <ModalByLessons
                    object={sortObject}
                    open={showModal}
                    close={() => setModal(!showModal)}
                    onFinish={onFinish}
                    changeValue={cangeValue}
                    changeTime={(e) => changeTime(e)}
                />            
            </div>
            {contextHolder}

           
        </>
    )
}

export default SortTutorial