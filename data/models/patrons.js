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
                                           isEmail: true,
                                           isUnique: function(value, next) {
                                                         var db = require('../models/index.js'); /* importing sequelize db  */
                                                         db.Patrons.find({
                                                             where: {email: value},
                                                             attributes: ['id']
                                                         })
                                                             .then(function(error, patron) {

                                                                 if (error)
                                                                     // Some unexpected error occured with the find method
                                                                     return next(error);

                                                                 if (patron)
                                                                     // email already in use by another patron
                                                                     // Pass the error to the next method.
                                                                     return next('Sorry, that email is already in use!');

                                                                 // if we get this far, submitted value for email is ok
                                                                 // send next() empty, so validator will move on
                                                                 next();

                                                             }); // end isUnique call back function

                                                     }
                                         }

                         },
             library_id: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // auto set MCL0100 + patron count + 1
                                           uniqueLibraryId: function(value){  // checking for at least a 5 char long alphanumeric string
                                                                  var alphaNumeric = /[(A-Z0-9)]/g;
                                                                  if (!value){
                                                                        throw new Error("Please enter a library_id");
                                                                  } else if (!value.match(/(\d){4}$/g) || !value.match(/^([A-Z]){3}/gi)){
                                                                        throw new Error("Please enter a unique id starting with 3 letters followed by 4 numbers, or submit with the value autopopulated in the field ");
                                                                  }
                                                            },
                                                  isUnique: function(value, next) {
                                                                var db = require('../models/index.js'); /* importing sequelize db  */
                                                                db.Patrons.find({
                                                                    where: {library_id: value},
                                                                    attributes: ['id']
                                                                })
                                                                    .then(function(error, patron) {

                                                                        if (error)
                                                                            // Some unexpected error occured with the find method
                                                                            return next(error);

                                                                        if (patron)
                                                                            // library_id already in use by another patron
                                                                            // Pass the error to the next method.
                                                                            return next('Sorry, that library_id is already in use!');

                                                                        // if we get this far, submitted value for library_id ok
                                                                        // send next() empty, so validator will move on
                                                                        next();

                                                                    }); // end isUnique call back function

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
