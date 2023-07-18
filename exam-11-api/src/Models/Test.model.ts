import { DataTypes , Model } from 'sequelize';
import sequelize from '../../config/db.config';

interface IMessage extends Model   {
  message :Blob
}

const TestModel = sequelize.define<IMessage>('check' , {
  
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});


export default TestModel;