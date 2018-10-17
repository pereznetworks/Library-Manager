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
                                   type: DataTypes.STRING
                         },
                 author: {
                              allowNull: false,
                                   type: DataTypes.STRING
                         },
                  genre: {
                              allowNull: false,
                                   type: DataTypes.STRING
                         },
        first_published: {
                              allowNull: false,
                                   type: DataTypes.INTEGER
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
