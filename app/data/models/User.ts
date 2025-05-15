import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

/**
 * Model for a user containing id, sub, name, email, emailVerified, and image.
 */
export default class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    emailVerified: DataTypes.BOOLEAN,
    image: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "User",
  }
);
