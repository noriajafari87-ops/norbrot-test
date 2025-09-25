const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('Order', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        productName: { type: DataTypes.STRING, defaultValue: 'Traditionelles Barbari-Brot' },
        quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
        totalPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
        totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        street: { type: DataTypes.STRING },
        houseNumber: { type: DataTypes.STRING },
        apartment: { type: DataTypes.STRING },
        postalCode: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: 'confirmed' },
        deliveredAt: { type: DataTypes.DATE, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'orders'
    });

    return Order;
};


