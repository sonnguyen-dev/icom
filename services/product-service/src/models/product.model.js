const { Sequelize, DataTypes } = require('sequelize');

class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0.0,
        },
        brand: {
          type: DataTypes.STRING, defaultValue: 'No brand',
        },
        color: {
          type: DataTypes.STRING, defaultValue: 'Unspecific',
        },
      },
      { sequelize, indexes: [{ unique: true, fields: ['id'] }] },
    );
  }

  static associate() {
    // associations can be defined here
  }
}

module.exports = Product;
