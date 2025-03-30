// models/settlement.js
module.exports = (sequelize, DataTypes) => {
    const Settlement = sequelize.define('Settlement', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('town', 'village', 'castle', 'camp', 'compound', 'farm'),
        allowNull: false
      },
      details: {
        type: DataTypes.JSON,
        defaultValue: {}
      }
    }, {});
  
    Settlement.associate = models => {
      // A Settlement is owned by a Subject
      Settlement.belongsTo(models.Player, { foreignKey: 'subjectId', as: 'owner' });
  
      // A Settlement can have many Buildings
      Settlement.hasMany(models.Building, { foreignKey: 'settlementId', as: 'buildings' });
  
      // Optionally, link events to a settlement
      Settlement.hasMany(models.Event, { foreignKey: 'settlementId', as: 'events' });
    };
  
    return Settlement;
  };
  