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
                         validate: { // must have letters, allows numbers
                                              notEmpty: {
                                                         msg: "Please enter a book title"
                                                        },
                                       checkIfNumsOnly: utils.checkIfNumbersOnly(this.title)
                                           wordsCapped: utils.checkifCappedWords(this.title);
                                   }
                   },
           author: {
                        allowNull: false,
                             type: DataTypes.STRING,
                         validate: { // must have letters, allow numbers, words capped
                                             notEmpty: {
                                                        msg: "Please enter the author of the book"
                                                       },
                                      checkIfNumsOnly: utils.checkIfNumbersOnly(this.author)
                                          wordsCapped: utils.checkifCappedWords(this.author);
                                   }
                   },
            genre: {
                        allowNull: false,
                             type: DataTypes.STRING,
                         validate: {  // has letters, allows numbers
                                             notEmpty: {
                                                        msg: "Please enter the genre of the book"
                                                       },
                                      checkIfNumsOnly: utils.checkIfNumbersOnly(this.genre)
                                          wordsCapped: utils.checkifCappedWords(this.genre);
                                   }
                   },
  first_published: {
                        allowNull: false,
                             type: DataTypes.INTEGER,
                         validate: { // force numbers only
                                      isNumeric: {
                                                 msg: "Please enter the year the book first published"
                                                 },
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
