'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfFemales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noOfMales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalNumber: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.LocationItem, {
      foreignKey: 'locationId',
      as: 'locationItems',
    });
  };
  return Location;
};
