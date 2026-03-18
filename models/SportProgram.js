const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SportProgram = sequelize.define("SportProgram", {
    sport_program_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sport_program_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    sport_program_objective: {
        type: DataTypes.ENUM("maintenance", "weight_loss", "muscle_gain", "endurance", "flexibility"),
        allowNull: false,
    },
    sport_program_sessions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sport_program_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sport_program_is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
},
{
    tableName: "sport_program",
    timestamps: false,
});

SportProgram.associate = (models) => {
    SportProgram.hasMany(models.ProgramSportSession, {
        foreignKey: "sport_program_id",
        as: "programSessions",
    });
};

module.exports = SportProgram;