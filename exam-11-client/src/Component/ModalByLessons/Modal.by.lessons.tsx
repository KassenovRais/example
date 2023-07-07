import { Button, Col, Form, Input, Modal, Row, TimePicker, TimePickerProps } from 'antd'
import  { ChangeEvent, FormEvent, TimeHTMLAttributes, useEffect, useState } from 'react'
import { ISortObject } from '../../Interface/SortWords';
import dayjs from 'dayjs';
import axios from 'axios';
import { buttonStyle } from '../../Container/Teacher.container/SortWordsTutorial/StyleSortTutorial/Style.words';


interface ModalSortWords  {
    object: ISortObject 
    open: boolean
    close: () => void
    changeValue: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onFinish:(e:FormEvent<HTMLFormElement>) => void
    changeTime: (e:dayjs.Dayjs | null) => void
}


const ModalByLessons = ({object , open ,close ,changeValue ,onFinish , changeTime}: ModalSortWords) => {

   

    return (
        <Modal 
            title="Basic Modal" 
            open={open} 
            onCancel={close}
            footer={null}
        >         
            <Form
                onSubmitCapture={onFinish}
                style={{ maxWidth: 600 }}
            >                  
                <Form.Item 
                    label="Название" 
                    rules={[{ required: true }]}     
                >
                    <Input 
                        name='title'
                        value={object.title}   
                        onChange={(e) => changeValue(e)}               
                        />
                </Form.Item>

                <Form.Item 
                    label="Описание" 
                    rules={[{ required: true }]} 
                >
                    <Input.TextArea
                        onChange={(e) => changeValue(e)}               
                        name='description'
                        value={object.description}   
                          
                    />
                </Form.Item>

                <Form.Item 
                    label="Время на прохожденние"   
                    rules={[{ required: true }]}
                                           
                >
                    <TimePicker
                        name='transit_time'
                        onChange={(e) => changeTime(e)}                            
                        placeholder={'MM : CC'}
                        format='mm:ss' 
                    />
                </Form.Item>

                <Row >              
                    <Col span={6}>
                        <Button 
                            style={buttonStyle}
                            onClick={close}
                        >
                            Отменить
                        </Button> 
                    </Col>
                    <Col span={6}>
                        <Button 
                            style={buttonStyle}
                            htmlType="submit"
                        >
                            Сохранить
                        </Button>
                    </Col>
                </Row>
            </Form>
            
        </Modal>
    )
}

export default ModalByLessons