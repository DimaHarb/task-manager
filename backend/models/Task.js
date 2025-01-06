const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Tag = require("./Tag"); 

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  column: { type: DataTypes.STRING, allowNull: false },
  tag: { type: DataTypes.STRING }, 
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
});


Task.belongsTo(Tag, { foreignKey: "tag", targetKey: "name", as: "tagDetails" });

module.exports = Task;
