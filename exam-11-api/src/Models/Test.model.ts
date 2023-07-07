import { DataTypes , Model } from 'sequelize';
import sequelize from '../config/db.config';

interface IMessage extends Model   {
  message :Blob
}

const TestModel = sequelize.define<IMessage>('tests' , {
  
  message: {
    type: DataTypes.JSON,
    allowNull: false,
  },
 
});


export default TestModel;