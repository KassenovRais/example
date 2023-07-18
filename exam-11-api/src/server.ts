import express , {Express} from 'express';
import sequelize from '../config/db.config';
import Test from './Controllers/Test'
import cors from 'cors';
import TutorialController from './Controllers/TutorialController';
import testConroller from './Controllers/Test.controller';

const app:Express = express();
const PORT        = 8000;


const run = async() => {

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT , () => console.log( 'Server start on ' , PORT));

  } catch (error) {
    console.log("FAQ");
  }
};


app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use('/' , testConroller)
app.use('/tutorials' ,TutorialController )
// app.use('/picture' , SortPicture )


run().catch(e => console.log(e));