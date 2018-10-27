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
                                   type: DataTypes.INTEGER,
                               validate: {
                                             isNumeric: {
                                               // not empty must be a number
                                                        msg: "Please choose a book title"
                                                       },
                                         }
                         },
               patron_id: {
                              allowNull: false,
                                   type: DataTypes.INTEGER,
                               validate: {
                                             isNumeric: {
                                               // not empty must be a number
                                                        msg: "Please choose a patron"
                                                       },
                                         }
                         },
               loaned_on: {
                              allowNull: false,
                                   type: DataTypes.DATEONLY,
                               validate: {
                                            // validated as date
                                            // but this field is auto-populated
                                          isDate: true,
                                         }
                         },
               return_by: {
                              allowNull: false,
                                   type: DataTypes.DATEONLY,
                               validate: {
                                            // validated as date
                                            // but this field is auto-populated
                                          isDate: true,
                                         }
                         },
             returned_on: {
                                   type: DataTypes.DATEONLY,
                               validate: {
                                            // validated as date
                                            // but this field is auto-populated
                                          isDate: true,
                                          }
                      },
             current: {
                             allowNull: false,
                             type: DataTypes.BOOLEAN,

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
