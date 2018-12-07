'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
