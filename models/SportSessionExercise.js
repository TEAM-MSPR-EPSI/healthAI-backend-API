const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SportSessionExercise = sequelize.define("SportSessionExercise", {
    sport_session_exercise_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sport_session_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sport_exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sport_session_exercise_rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
      tableName: "sport_session_exercise",
      timestamps: false
    }
);

  SportSessionExercise.associate = (models) => {
    SportSessionExercise.belongsTo(models.SportSession, {
      foreignKey: "sport_session_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    SportSessionExercise.belongsTo(models.SportExercise, {
      foreignKey: "sport_exercise_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

module.exports = SportSessionExercise;
