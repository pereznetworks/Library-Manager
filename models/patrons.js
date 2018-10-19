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
                                                  }
                                        }
                         },
              last_name: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: {// must have letters, capped words, allows numbers
                                        notEmpty: {
                                                   msg: "Please enter Patron's last name"
                                                  }
                                        }
                          },
                address: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // not empty at least 3 words (5 word breaks)
                                        notEmpty: {
                                                   msg: "Please enter Patron's address"
                                                  },
                                         enoughWordBreaks: function(str){
                                                              if (str){
                                                                  var wordBrks = /.\b/g
                                                                  if (5 > str.match(wordBrks).length){
                                                                    throw new Error("This doesn't seem to be a complete address");
                                                                  }
                                                              }
                                                            }
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
                                            var num = 100 + this.getDataValue('id');
                                            var nextLibraryId = utils.ldgZeroForLibraryId(num);
                                            this.setDataValue('library_id', `MCL${nextLibraryId}`);
                                          }
                         },
               zip_code: {
                              allowNull: false,
                                   type: DataTypes.INTEGER,
                               validate: { // allows numbers and letters
                            // must have letters, capped words, at least 3 words and allows numbers
                                     notEmpty: {
                                                msg: "Please enter Patron's zip code or postal code"
                                               },
                                     moreThan5: function(str){
                                                          if (str){
                                                              var alphaNumeric = /[(A-Z0-9)]/g
                                                              if (5 > str.match(alphaNumeric).length){
                                                                throw new Error("This doesn't seem to be a complete zip code");
                                                              }
                                                          }
                                                }
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
