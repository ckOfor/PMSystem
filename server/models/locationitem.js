'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocationItem = sequelize.define('LocationItem', {
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
    totalNumber: DataTypes.INTEGER,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  LocationItem.associate = function(models) {
    // associations can be defined here
    LocationItem.belongsTo(models.Location, {
      foreignKey: 'locationId',
      onDelete: 'CASCADE',
    });
  };
  return LocationItem;
};
