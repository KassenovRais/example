import { Button, Col, Form, Input, Space, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { nanoid } from 'nanoid'
import React, { ChangeEvent, useState } from 'react'
import { ItemPicture, SortPicture } from '../../../Interface/SortPicture'
import { labelStyle } from './StyleSortPicture/StyleSortPicture'
import {Image} from 'antd'



const SortByPicture = () => {

    const [sortObject , setSortObject] = useState<SortPicture>({
        title: '',
        description: '',
        item: []
    })


    const changeThemeHandler = (e: ChangeEvent<HTMLInputElement> , index:number) => {

        const {name , value} = e.target
        
        const copyArr: ItemPicture [] = [...sortObject.item]


        if(e.target.files) {
            
            const file:File = e.target.files[0]


                copyArr[index] = {...copyArr[index] , [name] : file}

                console.log(URL.createObjectURL(new Blob([file] , {type :'image/jpeg'})));
                

                return setSortObject({...sortObject , item: copyArr})
            

        }

        copyArr[index] = {...copyArr[index] , [name] : value}
        
        setSortObject({...sortObject , item: copyArr})

    }

    return (
        <div>

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
                        />
                    </Form.Item>
                </Col>
            </Form>
            <Button
                onClick={() => 
                    setSortObject({...sortObject , 
                        item: [...sortObject.item , {theme:'' , arrPicture: [] , id:nanoid()}]})}
            >
                Добавить тематику 
            </Button>

           {
                sortObject.item.map((val , index) => {
                    return <div>
                            <div 
                                key={val.id}
                            >
                                <Col span={8} >
                                    <Form.Item
                                        label='Тематика'
                                    >
                                        <Input 
                                            name='theme'
                                            value={val.theme} 
                                            onChange={(e) => changeThemeHandler(e ,index)}
                                        />
                                    </Form.Item>
                                </Col>
                                <label
                                    style={labelStyle}
                                >
                                    Добавить картинку
                                    <input
                                        name='arrPicture'
                                        style={{display:'none'}}                        
                                        type='file'
                                        onChange={(e) => changeThemeHandler(e , index)}
                                    />
                                </label>
                                
                        </div>
                    </div>
                })
           }
            
            
        </div>
    )
}

export default SortByPicture