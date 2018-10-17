'use strict';
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
                               validate: { // has letters, allows numbers
                                                   is: /([A-Z])\w+/gi
                                         }
                         },
                 author: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: { // has letters, allows numbers
                                                   is: /([A-Z])\w+/gi
                                         }
                         },
                  genre: {
                              allowNull: false,
                                   type: DataTypes.STRING,
                               validate: {  // has letters, allows numbers
                                                   is: /([A-Z])\w+/gi
                                         }
                         },
        first_published: {
                              allowNull: false,
                                   type: DataTypes.INTEGER,
                               validate: { // forces numbers only
                                            isNumeric: true,
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
