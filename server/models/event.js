// models/event.js
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      eventType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      data: {
        type: DataTypes.JSON,
        defaultValue: {}
      }
    }, {});
  
    Event.associate = models => {
      // An Event can be associated with a Subject, Settlement, or Faction.
      Event.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
      Event.belongsTo(models.Settlement, { foreignKey: 'settlementId', as: 'settlement' });
      Event.belongsTo(models.Faction, { foreignKey: 'factionId', as: 'faction' });
    };
  
    return Event;
  };
  