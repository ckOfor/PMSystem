'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocationItem = sequelize.define('LocationItem', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
