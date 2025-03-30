// models/party.js
module.exports = (sequelize, DataTypes) => {
    const Party = sequelize.define('Party', {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currentAction: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'completed', 'failed'),
        defaultValue: 'active'
      }
    }, {});
  
    Party.associate = models => {
      // Many-to-many: A Party is composed of many Subjects.
      Party.belongsToMany(models.Subject, {
        through: 'PartySubjects',
        foreignKey: 'partyId',
        as: 'subjects'
      });
  
      // A Party might have a Quest assigned.
      Party.hasOne(models.Quest, { foreignKey: 'partyId', as: 'quest' });
    };
  
    return Party;
  };
  