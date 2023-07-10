import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input } from "antd";
import React, { ChangeEvent, MouseEventHandler, ReactNode } from "react";
import { labelStyle } from "../../Container/Teacher.container/SortByPicture/StyleSortPicture/StyleSortPicture";
import { ItemPicture, ITheme } from "../../Interface/SortPicture";

interface ISortComponent {
    props : ITheme
    changeThemeHandler: (e: ChangeEvent<HTMLInputElement>) => void   
    changePicture: (e: ChangeEvent<HTMLInputElement>) => void  
    children: ReactNode
}




const SortByPictureComponent = ({  props , changeThemeHandler  ,changePicture , children }: ISortComponent) => {


    return (
        <div>
            <Col span={8}>
                <Form.Item label="Тематика">
                    <Input
                        name="theme"
                        value={props.theme}
                        onChange={changeThemeHandler}
                    />
                </Form.Item>
            </Col>
            <label style={labelStyle}>
                Добавить картинку
                <input
                    name="arrPicture"
                    style={{ display: "none" }}
                    type="file"
                    onChange={changePicture}
                />
            </label>
            
            {
                children
            }
        </div>
    );
};

export default SortByPictureComponent;
