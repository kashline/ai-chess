import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Bot from "@/app/data/models/Bot";
import Puzzle from "@/app/data/models/Puzzle";

/**
 * Model for a bot match's result
 */
export default class BotMatchResult extends Model {}

BotMatchResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    BotOneID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bot,
        key: "id",
      },
    },
    BotTwoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bot,
        key: "id",
      },
    },
    PuzzleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Puzzle,
        key: "id",
      },
    },
    History: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    Score: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "BotMatchResult",
  }
);
