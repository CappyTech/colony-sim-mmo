// models/building.js
module.exports = (sequelize, DataTypes) => {
    const Building = sequelize.define('Building', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('farm', 'barracks', 'market', 'workshop'),
        allowNull: false
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      attributes: {
        type: DataTypes.JSON,
        defaultValue: {}
      }
    }, {
      timestamps: true,  // Adds `createdAt` and `updatedAt`
      paranoid: true     // Adds `deletedAt` for soft deletes
    });
  
    Building.associate = models => {
      // Each Building belongs to a Settlement.
      Building.belongsTo(models.Settlement, { foreignKey: 'settlementId', as: 'settlement' });
    };
  
    return Building;
  };
  