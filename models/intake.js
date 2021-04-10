'use strict';
module.exports = (sequelize, DataTypes) => {
  const Intake = sequelize.define('Intake', {
    vrnumber: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    assignedTo: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER
  }, {});
  Intake.associate = function(models) {
    // associations can be defined here
  };
  return Intake;
};
