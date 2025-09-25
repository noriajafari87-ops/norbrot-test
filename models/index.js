const { sequelize } = require('../db');
const defineUserModel = require('./user');
const defineOrderModel = require('./order');

const User = defineUserModel(sequelize);
const Order = defineOrderModel(sequelize);

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

module.exports = { sequelize, User, Order };


