const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SessionProgress = sequelize.define("SessionProgress", {
    session_progress_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    session_progress_start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    session_progress_end: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    sport_session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sport_session",
        key: "sport_session_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "session_progress",
    timestamps: false,
  }
);

SessionProgress.associate = (models) => {
  SessionProgress.belongsTo(models.SportSession, {
    foreignKey: "sport_session_id",
    as: "sport_session",
  });

  SessionProgress.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

module.exports = SessionProgress;
