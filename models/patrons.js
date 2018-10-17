'use strict';
const addLeadingZero = require('../utils/index.js').addLeadingZero;

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
                                   type: DataTypes.STRING,
                              validate: { // is letters only, capitalized and no numbers
                                                         is: /^[a-z]+$/i,
                                                         is: /([A-Z])\w+/g,
                                                         not: /[0-9]\+/g
                                        }
                         },
              last_name: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // letters only, no numbers
                                                      is: /^[a-z]+$/i,
                                                     not: /[0-9]\+/g
                                         }
                         },
                address: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // allows numbers and letters
                                                      is: /([A-Z])\w+/gi
                                         }
                         },
                  email: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // must be a properly formated email address
                                                  isEmail: true
                                }
                         },
             library_id: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                                    set: function() {
                                            // set library_id to MCL + 0100 + id
                                            var num = 100 + this.id
                                            var nextLibraryId = addLeadingZero(num);
                                            this.setDataValue('title', `MCL`);
                                          }
                         },
               zip_code: {
                              allowNull: false,
                                   type: DataTypes.INTEGER,
                               validate: { // allows numbers and letters
                                                      is: /([A-Z])\w+/gi
                                         }
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
