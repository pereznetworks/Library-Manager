'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patrons = sequelize.define('Patrons',
      {
                     id: {
                              allowNull: false,
                          autoIncrement: true,
                             primaryKey: true,
                                   type: DataTypes.INTEGER
                         },
             first_name: {
                              allowNull: false,
                                   type: DataTypes.STRING
                         },
              last_name: {
                              allowNull: false,
                                   type: DataTypes.STRING
                         },
                address: {
                              allowNull: false,
                                   type: DataTypes.STRING
                         },
                  email: {
                              allowNull: false,
                                   type: DataType.STRING
                         },
             library_id: {
                              allowNull: false
                                   type: DataTypes.STRING
                         },
               zip_code: {
                              allowNull: false
                                   type: DataTypes.INTEGER
                         }
      }, {
          timestamps: false,
          underscored: true
      }
  );

  Patrons.associate = function(models) {
    // association defined in models/index.js
  };

  return Patrons;

};
