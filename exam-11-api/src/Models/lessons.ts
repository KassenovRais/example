import sequelize from "@src/config/db.config";
import { DataTypes } from "sequelize";


const LessonsModel = sequelize.define( 'lessons', {
        title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description : {
            type:DataTypes.STRING,
            allowNull: false
        },
        lessons : {
            type:DataTypes.JSON,
            allowNull: false
        },
        transit_time: {
            type:DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

export default LessonsModel