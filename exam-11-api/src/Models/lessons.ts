import sequelize from "../../config/db.config";
import { DataTypes } from "sequelize";
import { TutorialType } from "@src/Enum/Enum.tutorial.type";
import { UUID } from "sequelize";


const LessonsModel = sequelize.define( 'lessons', {
        title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description : {
            type:DataTypes.STRING,
            allowNull: false
        },
        lesson : {
            type:DataTypes.JSON,
            allowNull: false
        },
        transit_time: {
            type:DataTypes.STRING,
            allowNull: false
        },
        lesson_type: {
            type:DataTypes.ENUM(TutorialType.pictureSort , TutorialType.wordsSort),
            allowNull: false
        } 
    },
    {
        timestamps: false,
    }
)

export default LessonsModel