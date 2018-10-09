'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Order belongsTo Customer
    return queryInterface.addColumn(
      'Loans', // name of Source model
      'BookId', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Books', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Loans', // name of Source model
          'PatronId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Patrons', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    // remove Order belongsTo Customer
    return queryInterface.removeColumn(
      'Loans', // name of Source model
      'BookId' // key we want to remove
    )
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          'Loans', // name of the Target model
          'PatronId' // key we want to remove
        );
      });
  }
};
