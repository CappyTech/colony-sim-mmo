// models/inventory.js
module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('Inventory', {
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {
      timestamps: true,  // Adds `createdAt` and `updatedAt`
      paranoid: true     // Adds `deletedAt` for soft deletes
    });
  
    Inventory.associate = models => {
      // Each Inventory record belongs to a Subject and an Item.
      Inventory.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
      Inventory.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
    };
  
    return Inventory;
  };
  