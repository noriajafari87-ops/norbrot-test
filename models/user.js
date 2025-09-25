const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, unique: true, allowNull: false },
        street: { type: DataTypes.STRING },
        houseNumber: { type: DataTypes.STRING },
        apartment: { type: DataTypes.STRING },
        postalCode: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        country: { type: DataTypes.STRING, defaultValue: 'Deutschland' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'users'
    });

    return User;
};


