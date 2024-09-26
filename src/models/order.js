const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here si necesitas relacionar con otros modelos
    }
  }

  Order.init({
        orderId: DataTypes.STRING,
        status: DataTypes.ENUM('aceptado', 'rechazado'),
        sku: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        receivedAt: DataTypes.DATE,
        orderMaxDate: DataTypes.DATE
      }, {
        sequelize,
        modelName: 'Order',
      });

  return Order;
};