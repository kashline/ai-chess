import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import User from "@/app/data/models/User";
import Puzzle from "@/app/data/models/Puzzle";

/**
 * Model for a UserScore.
 */
export default class UserScore extends Model {}

UserScore.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    PuzzleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Puzzle,
        key: "id",
      },
    },
    sub: DataTypes.STRING,
    score: DataTypes.INTEGER,
    model: DataTypes.STRING,
    prompt: DataTypes.STRING,
    turnsRemaining: DataTypes.INTEGER,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "UserScore",
  }
);

User.hasMany(UserScore);
UserScore.belongsTo(User, { foreignKey: "UserId" });
Puzzle.hasMany(UserScore, { foreignKey: 'PuzzleId' });
UserScore.belongsTo(Puzzle, { foreignKey: "PuzzleId" });
