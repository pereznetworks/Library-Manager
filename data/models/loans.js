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
                                            // validated as today's date
                                          isTodayDate: function(value){

                                            if (value === 'Invalid date'){
                                              throw new Error('Please enter a date, format: yyyy-mm-dd');
                                            } else {

                                                var Year = parseInt(value.slice(0,4));
                                                var Month = ( parseInt(value.slice(5,7)) - 1);
                                                var Day = parseInt(value.slice(8));

                                                if (isNaN(Year) || isNaN(Month) || isNaN(Day)){

                                                  throw new Error(`Please enter a date. format: yyyy-mm-dd`)
                                                } else {

                                                    var submittedDate = new Date(Year, Month , Day);

                                                    var today = new Date();
                                                    var oneDay = 24*60*60*1000;

                                                    var diffDays = Math.round(Math.abs((submittedDate.getTime() - today.getTime())/(oneDay)));

                                                    if (diffDays > 7 ){
                                                      throw new Error('Please enter a date within the last week');
                                                    }

                                                }

                                            }
                                         }
                                      }
                         },
               return_by: {
                              allowNull: false,
                                   type: DataTypes.DATEONLY,
                               validate: {
                                          // validate as date 7 days after loaned_on date
                                              plus7days: function(value){  // check if loan is for no more than 7 days

                                                  if (value === 'Invalid date'){

                                                      throw new Error('Please, enter a date, format: yyyy-mm-dd');

                                                  } else {

                                                      var lYear = this.loaned_on.slice(0,4);
                                                      var lMonth = ( parseInt(this.loaned_on.slice(5,7)) - 1);
                                                      var lDay = this.loaned_on.slice(8);

                                                      var startLoan = new Date(lYear, lMonth , lDay);

                                                      var rYear = value.slice(0,4);
                                                      var rMonth = ( parseInt(value.slice(5,7)) - 1 );
                                                      var rDay = value.slice(8);

                                                      if (isNaN(rYear) || isNaN(rMonth) || isNaN(rDay)){
                                                        throw new Error('Please, enter a date, format: yyyy-mm-dd');
                                                      }

                                                      var endLoan = new Date(rYear, rMonth, rDay);

                                                      var oneDay = 24*60*60*1000;

                                                      var diffDays = Math.round(Math.abs((startLoan.getTime() - endLoan.getTime())/(oneDay)));

                                                      if (diffDays < 1 || diffDays > 7 ){

                                                        throw new Error('Please, enter a date that is at least 7 days after the loaned on date')
                                                      }

                                                  }

                                              }
                                          }
                         },
             returned_on: {
                                   type: DataTypes.DATEONLY,
                               validate: {
                                            // validated as today's date
                                            isTodayDate: function(value){

                                                if (value === 'Invalid date'){

                                                  throw new Error('Please enter a date, format: yyyy-mm-dd');

                                                } else {
                                                  var Year = parseInt(value.slice(0,4));
                                                  var Month = ( parseInt(value.slice(5,7)) - 1);
                                                  var Day = parseInt(value.slice(8));
                                                  var submittedDate = new Date(Year, Month , Day);

                                                  var now = new Date();
                                                  var testYear = now.getFullYear();
                                                  var testMonth = now.getMonth();
                                                  var testDate = now.getDate();
                                                  if (Year !== testYear || Month !== testMonth || Day !== testDate){
                                                    throw new Error(`Please enter todays date. format: yyyy-mm-dd`)
                                                  }

                                                }

                                            }

                                        }
                      },
             current: {
                             allowNull: false,
                             type: DataTypes.BOOLEAN,
                      }
      },
      {
              timestamps: false,
             underscored: true
      }
  );

  Loans.associate = function(models) {
    // association defined in models/index.js
  };

  return Loans;
};
