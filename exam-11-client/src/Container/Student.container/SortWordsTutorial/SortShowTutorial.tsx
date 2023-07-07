import { LeftCircleOutlined } from '@ant-design/icons'
import {  Card, Col, Row, Tag, Typography } from 'antd'
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState , DragEvent , CSSProperties} from 'react'
import { ISortObject, IWordSortTutorial } from '../../../Interface/SortWords'
import { dragbleStyle, dragBlur, dragStyle, gridStyle, iconStyle  } from './StyleSortWords/Style.style.words'





const SortShowTutorial = () => {

    const [arrSortObject , setArrSort] = useState<ISortObject[]>([])

    const [sortObject , setSortObject] = useState<ISortObject | null>()

    const [copySortArr , setCopyArr] = useState<ISortObject>()

    const [currentWord , setCurrentWord] = useState<{value: IWordSortTutorial , index:number}>()

  
    const getSortTutorial = async() => {

        try {

            const response = await axios.get<AxiosRequestConfig, AxiosResponse<ISortObject[]>>('http://localhost:8000/sortTutorial')
        
            setArrSort(response.data)

        } catch (error) {
            
        }
        
    }

    const currentArrWords = (e:ISortObject) => {

        setSortObject(e)

        setCopyArr(e)

    }

    const dropHandler = (e: DragEvent<HTMLSpanElement> , val:IWordSortTutorial , index: number ) => {

        e.preventDefault()
        
        if (sortObject && currentWord) {

            const include: boolean = sortObject.lessons.arrWords.includes(val)

            const includeWord : boolean = sortObject.lessons.arrWords.includes(currentWord.value)

            const copy: ISortObject = {...sortObject}

            if(include && includeWord) {

                const copyCurrent:IWordSortTutorial =  sortObject.lessons.arrWords[currentWord.index]

                const copyByRemove :IWordSortTutorial =  sortObject.lessons.arrWords[index]

                copy.lessons.arrWords.splice(index , 1 , copyCurrent)

                copy.lessons.arrWords.splice(currentWord.index , 1 , copyByRemove)

                return setSortObject(copy)
            
            }
            const includeChecked: boolean = sortObject.lessons.checkedWord.includes(val)

            if(val.isDrable && !includeChecked) {

                copy.lessons.arrWords[index] = {...copy.lessons.arrWords[index] , 
                    value: currentWord.value.value  , 
                    isDrable :true , 
                    styleHandler: false 
                }          
                copy.lessons.checkedWord[currentWord.index] = {...copy.lessons.checkedWord[currentWord.index] ,
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
                                sortObject.lessons.arrWords.map((val , index) => {
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
                            sortObject.lessons.checkedWord.map((val , index) => {
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
                            <Countdown title="Время для прохождения" value={Date.now() + Number(sortObject.transit_time) * 1000}/>
                        </Col>
                    
                </Card>
                
                )
            }
            
            
        </div>
    )
}

export default SortShowTutorial