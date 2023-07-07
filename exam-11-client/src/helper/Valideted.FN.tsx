import { Button, message, Space } from 'antd'
import {ISortObject} from '../Interface/SortWords'



const ValidetedFN = (object:Omit<ISortObject , 'lessons'>) => {

    const [messageApi, contextHolder] = message.useMessage();

 
    const error = () => {
        messageApi.open({
        type: 'error',
        content: 'This is an error message',
        });
    };

    return (
        <div>
            {contextHolder}
        </div>
    )
}

export default ValidetedFN