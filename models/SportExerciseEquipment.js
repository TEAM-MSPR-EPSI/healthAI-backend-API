const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SportExerciseEquipment = sequelize.define("SportExerciseEquipment", {
    sport_exercise_equipment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sport_exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
      sport_equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
      tableName: "sport_exercise_equipment",
      timestamps: false
    }
);

  SportExerciseEquipment.associate = (models) => {
    SportExerciseEquipment.belongsTo(models.SportExercise, {
      foreignKey: "sport_exercise_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    SportExerciseEquipment.belongsTo(models.SportEquipment, {
      foreignKey: "sport_equipment_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

  module.exports = SportExerciseEquipment;
