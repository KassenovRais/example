import { LeftCircleOutlined } from '@ant-design/icons'
import {  Button, Card, Col, Modal, Row, Tag, Typography } from 'antd'
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState , DragEvent , CSSProperties} from 'react'
import { TutorialType } from '../../../enum/Tutorial.type/Tutorial.type'
import { ISortObject, IWordSortTutorial } from '../../../Interface/SortWords'
import { buttonStyle } from '../../Teacher.container/SortWordsTutorial/StyleSortTutorial/Style.words'
import { dragbleStyle, dragBlur, dragStyle, gridStyle, iconStyle  } from './StyleSortWords/Style.style.words'





const SortShowTutorial = () => {

    const [arrSortObject , setArrSort] = useState<ISortObject[]>([])

    const [sortObject , setSortObject] = useState<ISortObject | null>()

    const [copySortArr , setCopyArr] = useState<ISortObject>()

    const [currentWord , setCurrentWord] = useState<{value: IWordSortTutorial , index:number}>()

    const [start , setStart] = useState<boolean>(false)
  
    const getSortTutorial = async() => {

        try {

            const response = await axios.get<AxiosRequestConfig, AxiosResponse<ISortObject[]>>('http://localhost:8000/tutorials')
        
            const copySortArray: ISortObject[] = response.data.filter((val) => {
                return val.lesson_type === TutorialType.wordsSort
            })
            copySortArray && setArrSort(copySortArray)

        } catch (error) {
            
        }
        
    }

    const currentArrWords = (e:ISortObject) => {

        const copyArr: IWordSortTutorial[] = [...e.lesson.checkedWord]

        copyArr.sort(()=>Math.random()-0.5)

        

        setSortObject({...e ,lesson: {...e.lesson , checkedWord: copyArr} })

        setCopyArr(e)

    }

    const dropHandler = (e: DragEvent<HTMLSpanElement> , val:IWordSortTutorial , index: number ) => {

        e.preventDefault()

        if (sortObject && currentWord) {

            const include: boolean = sortObject.lesson.arrWords.includes(val)

            const includeWord : boolean = sortObject.lesson.arrWords.includes(currentWord.value)

            const copy: ISortObject = {...sortObject}

            if(include && includeWord && val.isDrable) {

                const copyCurrent:IWordSortTutorial =  sortObject.lesson.arrWords[currentWord.index]

                const copyByRemove :IWordSortTutorial =  sortObject.lesson.arrWords[index]

                copy.lesson.arrWords.splice(index , 1 , copyCurrent)

                copy.lesson.arrWords.splice(currentWord.index , 1 , copyByRemove)

                return setSortObject(copy)
            
            }
            const includeChecked: boolean = sortObject.lesson.checkedWord.includes(val)

            if( val.isDrable && !includeChecked) {

                copy.lesson.arrWords[index] = {...copy.lesson.arrWords[index] , 
                    value: currentWord.value.value  , 
                    isDrable :true , 
                    styleHandler: false 
                }          
                copy.lesson.checkedWord[currentWord.index] = {...copy.lesson.checkedWord[currentWord.index] ,
                    isDrable: false
                }      

                return setSortObject(copy)

            }                
            
        }

    }
    
    useEffect(() => {

        getSortTutorial().catch((e) => console.log(e))

    }, [])

   

    return (
        <div>
            
            {
                sortObject && <LeftCircleOutlined
                        style={iconStyle}
                        onClick={() => setSortObject(null)}
                    />
            }
             
            {
                !sortObject ? 
                <Row gutter={16}>
                    {
                            
                        arrSortObject.map((val) => {
                            return <Col 
                                        key={val.id}
                                        onClick={() => currentArrWords(val)}
                                        span={8}>
                                        <Card title={val.title} bordered={false}>
                                            {val.description}
                                        </Card>
                                    </Col>
                                })
                            }
                </Row>:

                (
                    <Card  >
                        <Title>
                            Поместите слова в нужном порядке 
                        </Title>
                        <Typography>
                            <Title>{sortObject.title}</Title>
                                <Paragraph>
                                    {sortObject.description}
                                </Paragraph>
                        </Typography>

                        <Typography style={{margin : '4vh  0'}} >
                            {
                                sortObject.lesson.arrWords.map((val , index) => {
                                    return <span 
                                            key={val.id} 
                                            draggable={val.isDrable}
                                            onDragStart={() => setCurrentWord({value: val , index: index})}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => dropHandler(e , val , index) } 
                                            style={
                                                val.styleHandler
                                                ?  dragBlur : (val.isDrable ? dragStyle : gridStyle ) }
                                        >{val.value}</span>
                                })
                            }
                        </Typography>
                        {                    
                            sortObject.lesson.checkedWord.map((val , index) => {
                                return <Tag
                                        style={val.isDrable ? gridStyle : dragbleStyle} 
                                        color="#5BC0EB" 
                                        key={val.id} 
                                        draggable={val.isDrable}
                                        onDragStart={(e) => setCurrentWord({value: val , index: index})}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => dropHandler(e , val , index)}
                                        
                                    >{val.value}</Tag>
                                
                            })
                        }
                        <Col span={12} style={{margin : '3vh  0'}}>
                            <Countdown 
                                
                                title="Время для прохождения" 
                                value={Date.now() + (start ? Number(sortObject.transit_time) : 0) * 1000}
                                
                            />
                        </Col>
                        <Modal
                            title="Задание"
                            centered
                            open={!start}
                            width={600}
                            footer={[<Button
                                style={buttonStyle}
                                onClick={() => setStart(!start)}
                                >Старт</Button>]}
                        >
                            <Paragraph>
                                Переместите слова в нужном порядке 
                            </Paragraph>
                        </Modal>
                    
                </Card>
                
                )
            }
            
            
            
        </div>
    )
}

export default SortShowTutorial