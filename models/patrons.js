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
                                        noNumbers: function(str){
                                          // if any numbers throw error
                                                      if (str.match(/\d/g)) {
                                                        throw new Error('Please enter a name');
                                                      }
                                                    }
                                        }
                         },
              last_name: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: {
                                            notEmpty: {
                                              // not empty
                                                       msg: "Please enter Patron's last name"
                                                     },
                                            noNumbers: function(str){
                                              // if str contains any numbers throw error
                                                          if (str.match(/\d/g)) {
                                                            throw new Error('Please enter a name');
                                                          }
                                                       }
                                        }
                          },
                address: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: {
                                        notEmpty: {
                                          // not empty at least 3 words (5 word breaks)
                                                   msg: "Please enter Patron's address"
                                                  },
                                         enoughWordBreaks: function(str){
                                           // checking for enough words breaks to be a full address
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
                               validate: { 
                                         // must be a properly formated email address
                                           isEmail: true

                                         }
                         },
             library_id: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // auto set MCL0100 + patron count + 1
                                        notEmpty: {
                                                   msg: "library_id is auto set, so this error should never happen"
                                                  }
                                        }
                         },
               zip_code: {
                              allowNull: false,
                                   type: DataTypes.INTEGER,
                               validate: {
                                     notEmpty: {  // not empty
                                                msg: "Please enter Patron's zip code or postal code"
                                               },
                                     moreThan5: function(str){  // checking for at least a 5 char long alphanumeric string
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
