// models/faction.js
module.exports = (sequelize, DataTypes) => {
    const Faction = sequelize.define('Faction', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: DataTypes.TEXT,
      // Additional fields like reputation or territory can be added here
    }, {
      timestamps: true,  // Adds `createdAt` and `updatedAt`
      paranoid: true     // Adds `deletedAt` for soft deletes
    });
  
    Faction.associate = models => {
      // A Faction has many Subjects as members.
      Faction.hasMany(models.Subject, { foreignKey: 'factionId', as: 'members' });
  
      // Optionally, a Faction might have events.
      Faction.hasMany(models.Event, { foreignKey: 'factionId', as: 'events' });
    };
  
    return Faction;
  };
  