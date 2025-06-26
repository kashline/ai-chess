import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Bot from "@/app/data/models/Bot";

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

Bot.hasOne(LatestBotRating, {
  foreignKey: "BotID",
  sourceKey: "id",
  as: "latest_rating",
});

LatestBotRating.belongsTo(Bot, {
  foreignKey: "BotID",
  targetKey: "id",
  as: "bot",
});
