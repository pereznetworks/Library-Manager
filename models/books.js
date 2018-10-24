'use strict';
const utils = require('../utils/index.js');

module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books',
      {
               id: {
                        allowNull: false,
                    autoIncrement: true,
                       primaryKey: true,
                             type: DataTypes.INTEGER
                   },
            title: {
                        allowNull: false,
                             type: DataTypes.STRING,
                         validate: {
                                        notEmpty: {
                                          // not empty 
                                                   msg: "Please enter a book title"
                                                  },
                                   }
                   },
           author: {
                        allowNull: false,
                             type: DataTypes.STRING,
                         validate: {
                                       notEmpty: {
                                         // must have letters, allow numbers, words capped
                                                  msg: "Please enter the author of the book"
                                                 },
                                       noNumbers: function(str){
                                          // if any numbers throw error
                                                     if (str.match(/\d/g)) {
                                                       throw new Error('Please enter a name')
                                                     }
                                                   }
                                   }
                   },
            genre: {
                        allowNull: false,
                             type: DataTypes.STRING,
                         validate: {
                                       notEmpty: {
                                         // not empty
                                                  msg: "Please enter the genre of the book"
                                                 },
                                   }
                   },
  first_published: {
                        allowNull: false,
                             type: DataTypes.INTEGER,
                         validate: {
                                      isNumeric: {
                                        // force numbers only
                                                 msg: "Please enter the year the book first published"
                                                 }
                                      }
                   },
      },{
             timestamps: false,
            underscored: true
  });

  Books.associate = function(models) {
    // association defined in models/index.js
  };

  return Books;

};
