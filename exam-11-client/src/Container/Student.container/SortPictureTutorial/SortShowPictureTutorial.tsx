import { Card, Col, Row } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { TutorialType } from '../../../enum/Tutorial.type/Tutorial.type'
import {SortPicture} from '../../../Interface/SortPicture'
import Paragraph from 'antd/es/typography/Paragraph'



const SortShowPictureTutorial = () => {

    const [sortObject , setSortObject] = useState<SortPicture[]>([])

    const getSortTutorial = async() => {

        try {

            const response = await axios.get<AxiosRequestConfig, AxiosResponse<SortPicture[]>>('http://localhost:8000/tutorials')
        
            const copySortArray: SortPicture[] = response.data.filter((val) => {
                return val.lesson_type === TutorialType.pictureSort
            })
            copySortArray && setSortObject(copySortArray)

        } catch (error) {
            
        }
        
    }

    useEffect(() => {
        getSortTutorial()
    },[])


    return (
        <div>
            <Row>
                {
                    sortObject.map((val) => {
                        return <Col 
                            key={val.id}
                            span={6}>
                            <Card  title={val.title}> 
                                <Paragraph>
                                    {val.description}
                                </Paragraph>
                            </Card>
                        </Col>
                    })
                }
                
            </Row>
            
            
        </div>
    )
}

export default SortShowPictureTutorial