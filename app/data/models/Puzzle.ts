import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

/**
 * Model for a starting position.
 */
export default class Puzzle extends Model {}

Puzzle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    fen: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Puzzle",
  },
);
