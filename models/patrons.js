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
                                 unique: true,
                               validate: { // auto set MCL0100 + patron count + 1
                                           uniqueLibraryId: function(value){  // checking for at least a 5 char long alphanumeric string
                                                                  var alphaNumeric = /[(A-Z0-9)]/g;
                                                                  if (!value){
                                                                        throw new Error("Please enter a library_id");
                                                                  } else if (!value.match(/(\d){4}$/g) || !value.match(/^([A-Z]){3}/gi)){
                                                                        throw new Error("Please enter a unique id starting with 3 letters followed by 4 numbers, or submit with the value autopopulated in the field ");
                                                                  } else {

                                                                    var db = require('./index.js');

                                                                    db.Patrons.find({where:{library_id: value}})
                                                                      .then(function (match) { // This gets called
                                                                        if (match){
                                                                          throw new Error(`That library_id, ${value}, is already in use!`);
                                                                        } // But this isn't triggering a validation error.
                                                                      });
                                                                  }
                                                            },
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
