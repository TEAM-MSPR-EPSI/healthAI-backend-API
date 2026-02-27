const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProgramSportSession = sequelize.define("ProgramSportSession", {
  sport_program_session_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sport_program_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "sport_program",
      key: "sport_program_id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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
},
{
  tableName: "program_sport_session",
  timestamps: false,
});

ProgramSportSession.associate = (models) => {
  ProgramSportSession.belongsTo(models.SportProgram, {
    foreignKey: "sport_program_id",
    as: "sport_program",
  });
  ProgramSportSession.belongsTo(models.SportSession, {
    foreignKey: "sport_session_id",
    as: "sport_session",
  });
};

module.exports = ProgramSportSession;