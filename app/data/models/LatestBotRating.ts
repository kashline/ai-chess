import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class LatestBotRating extends Model {}

LatestBotRating.init(
  {
    BotID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    latest_rating: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "LatestBotRating",
    tableName: "latest_bot_ratings",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default LatestBotRating;
