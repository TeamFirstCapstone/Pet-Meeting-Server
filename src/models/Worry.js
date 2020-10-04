import Sequelize from "sequelize"
import {BaseModel, defaultSetting} from './BaseModel'

export class Worry extends BaseModel{
    static load(sequelize){
        Worry.init({
            WID:Sequelize.INTEGER,
            Title:Sequelize.STRING,
            Text: Sequelize.TEXT,
            Date:Sequelize.DATE,
            UID: Sequelize.INTEGER
        },{
            ...defaultSetting,
            sequelize,
            modelName:'worry'
        })
    }
    //to do link
    //not yet implemented
}

export default router;