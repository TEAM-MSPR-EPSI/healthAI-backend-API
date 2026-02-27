const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserAllergy = sequelize.define("UserAllergy", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "user",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    allergy: {
      type: DataTypes.ENUM('gluten', 'crustaceans', 'eggs', 'fish', 'peanuts',
        'soybeans', 'milk', 'nuts', 'celery', 'mustard',
        'sesame', 'sulphites', 'lupin', 'molluscs'),
      primaryKey: true,
      allowNull: false,
    },
},
{
    tableName: "user_allergy",
    timestamps: false,
});
UserAllergy.associate = (models) => {
  UserAllergy.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

module.exports = UserAllergy;