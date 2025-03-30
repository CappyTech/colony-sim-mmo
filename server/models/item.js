// models/item.js
module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING, // e.g., "resource", "weapon", "tool"
        allowNull: false
      },
      description: DataTypes.TEXT
      // Additional fields like rarity, value, etc. can be added here.
    }, {});
  
    Item.associate = models => {
      // An Item can appear in many Inventory records
      Item.hasMany(models.Inventory, { foreignKey: 'itemId', as: 'inventoryItems' });
    };
  
    return Item;
  };
  