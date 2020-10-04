import Sequelize from "sequelize"
import {BaseModel, defaultSetting} from './BaseModel'

export class Comment extends BaseModel{

    static load(sequelize){
        Comment.init({
            CID:Sequelize.INTEGER,
            Text:Sequelize.TEXT,
            Date:Sequelize.DATE,
            CID_ReplyTo: Sequelize.INTEGER,
            UID:Sequelize.INTEGER,
            WID:Sequelize.INTEGER
        },{
            ...defaultSetting,
            sequelize,
            modelName:'comment'
        })

    }
}