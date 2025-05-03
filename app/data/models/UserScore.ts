import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import User from "@/app/data/models/User";

/**
 * Model for a user containing id, sub, name, email, emailVerified, and image.
 */
export default class UserScore extends Model {}

UserScore.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
    sub: DataTypes.STRING,
    score: DataTypes.INTEGER,
    model: DataTypes.STRING,
    prompt: DataTypes.STRING,
    startingPos: DataTypes.STRING,
    turnsRemaining: DataTypes.INTEGER,
    result: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  },
);
