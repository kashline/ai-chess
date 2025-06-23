import {
    CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../connection";
import User from "@/app/data/models/User";

/**
 * Model for a Bot
 */
export default class Bot extends Model<
// Typescript attribute declarations
  InferAttributes<Bot>,
  InferCreationAttributes<Bot>
> {
  declare id: CreationOptional<number>;
  declare UserID: number;
  declare Name: string;
  declare Model: string;
  declare Prompt: string;
  declare RemainingGames: number;
}

Bot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    Name: DataTypes.STRING,
    Model: DataTypes.STRING,
    Prompt: DataTypes.STRING,
    RemainingGames: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Bot",
  }
);
