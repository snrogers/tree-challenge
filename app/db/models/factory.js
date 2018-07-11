'use strict';
module.exports = (sequelize, DataTypes) => {
  var Factory = sequelize.define(
    'Factory',
    {
      name: DataTypes.STRING,
      numChildren: DataTypes.INTEGER,
      rangeMin: DataTypes.INTEGER,
      rangeMax: DataTypes.INTEGER,
      children: DataTypes.JSON
    },
    {}
  );
  Factory.associate = function(models) {
    // associations can be defined here
  };
  return Factory;
};
