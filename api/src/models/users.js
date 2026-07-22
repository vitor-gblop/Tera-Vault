import { DataTypes, Model } from "sequelize";
import Keys from "./keys.js";

class Users extends Model {
  static initialize(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "users",
      },
    );

    // Relations
    this.hasMany(Keys);
    Keys.belongsTo(this, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    return this;
  }
}

export default Users;
