'use strict';
const utils = require('../utils/index.js');

module.exports = (sequelize, DataTypes) => {
  const Loans = sequelize.define('Loans',
      {
                     id: {
                              allowNull: false,
                          autoIncrement: true,
                             primaryKey: true,
                                   type: DataTypes.INTEGER
                         },
                 book_id: {
                              allowNull: false,
                                   type: DataTypes.INTEGER
                         },
               patron_id: {
                              allowNull: false,
                                   type: DataTypes.INTEGER
                         },
               loaned_on: {
                              allowNull: false,
                                   type: DataTypes.DATEONLY,
                               validate: {
                                          isDate: true,
                                         }
                         },
               return_by: {
                              allowNull: false,
                                   type: DataTypes.DATEONLY,
                               validate: {
                                          isDate: true,
                                         }
                         },
             returned_on: {
                                   type: DataTypes.DATEONLY,
                               validate: {
                                          isDate: true,
                                         }
                         }
      }, {
              timestamps: false,
             underscored: true
      }
  );

  Loans.associate = function(models) {
    // association defined in models/index.js
  };

  return Loans;
};
