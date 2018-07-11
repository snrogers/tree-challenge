module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Factories',
      [
        {
          id: 0,
          name: 'First Factory',
          numChildren: 5,
          rangeMin: 1,
          rangeMax: 5,
          children: JSON.stringify([1, 2, 3, 4, 5]),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 1,
          name: 'Second',
          numChildren: 5,
          rangeMin: 2,
          rangeMax: 10,
          children: JSON.stringify([2, 4, 6, 8, 10]),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Third',
          numChildren: 5,
          rangeMin: 3,
          rangeMax: 15,
          children: JSON.stringify([3, 6, 9, 12, 15]),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Factories', null, {});
  }
};
