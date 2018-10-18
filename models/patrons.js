'use strict';
const utils = require('../utils/index.js');

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
                              validate: { // must have letters, capped words, allows numbers
                                         notEmpty: {
                                                    msg: "Please enter Patron's first name"
                                                   },
                                  checkIfNumsOnly: utils.checkIfNumbersOnly(this.title)
                                      wordsCapped: utils.checkifCappedWords(this.title);
                                        }
                         },
              last_name: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: // must have letters, capped words, allows numbers
                                        notEmpty: {
                                                   msg: "Please enter Patron's last name"
                                                  },
                                 checkIfNumsOnly: utils.checkIfNumbersOnly(this.title)
                                     wordsCapped: utils.checkifCappedWords(this.title);
                         },
                address: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // must have letters, capped words, at least 3 words and allows numbers
                                        notEmpty: {
                                                   msg: "Please enter Patron's address"
                                                  },
                                 checkIfNumsOnly: utils.checkIfNumbersOnly(this.address),
                                     wordsCapped: utils.checkifCappedWords(this.address),
                              checkAddressLength: utils.checkAddressLength(this.address)
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
                            // must have letters, capped words, at least 3 words and allows numbers
                                     notEmpty: {
                                                msg: "Please a zip_code"
                                               },
                           checkZipCodeLength: checkZipCodeLength(this.zip_code)
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
