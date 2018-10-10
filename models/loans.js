'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loans = sequelize.define('Loans', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    book_id: {
      type: DataTypes.INTEGER
    },
    patron_id: {
      type: DataTypes.INTEGER
    },
    loanedBookId: {
      type: DataTypes.UUID,
      references: {
        model: 'Books', // name of Target model
        key: 'id', // key in Target model this is referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    patronLoanedToId: {
      type: DataTypes.UUID,
      references: {
        model: 'Patrons', // name of Target model
        key: 'id', // key in Target model this is referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
  }, {
        timestamps:false
  });
  Loans.associate = function(models) {
    Loans.belongsTo(models.Books);
    Loans.belongsTo(models.Patrons);
  };
  return Loans;
};
