import {DataTypes, Model} from "sequelize";
import Keys from "./keys.js";

class Historic extends Model {
  static initialize(sequelize) {
    super.init(
      {
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "historic",
      },
    );

    Keys.hasMany(this);
    this.belongsTo(Keys, {
      foreignKey: {
        name: "keyId",
        allowNull: false,
      },
    });

    return this;
  }
}

export default Historic;
