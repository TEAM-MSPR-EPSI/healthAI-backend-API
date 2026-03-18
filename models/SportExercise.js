const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SportExercise = sequelize.define("SportExercise", {
    sport_exercise_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sport_exercise_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sport_exercise_objective: {
      type: DataTypes.ENUM('weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'maintenance'),
      allowNull: false,
    },
    sport_exercise_difficulty: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'), // adapte selon ton enum SQL exact
      allowNull: false,
    },
    sport_exercise_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sport_exercise_muscle_group: {
      type: DataTypes.ENUM('chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs', 'glutes', 'quadriceps', 'hamstrings', 'calves', 'full_body'),
      allowNull: false,
    },
    sport_exercise_video: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sport_exercise_instruction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sport_exercise_cal_burned: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},
{
    tableName: "sport_exercise",
    timestamps: false,
});

SportExercise.associate = (models) => {
    SportExercise.hasMany(models.SportExerciseEquipment, {
        foreignKey: "sport_exercise_id",
        as: "exerciseEquipments",
    });
};

module.exports = SportExercise;