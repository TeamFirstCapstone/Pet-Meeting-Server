import {Model} from "sequelize"
export const defaultSetting={
    underscored: true,
  timestamps: false,
  //createdDate만 true

}

export class BaseModel extends Model{

    static load(sequelize){}
    static link(sequelize){}

}