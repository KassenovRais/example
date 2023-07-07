import express , {Express} from 'express';
import sequelize from './config/db.config';
import Test from './Controllers/Test'
import cors from 'cors';
import SortTutorialController from './Controllers/SortTutorial';

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
app.use('/' , Test)
app.use('/sortTutorial' , SortTutorialController)



run().catch(e => console.log(e));