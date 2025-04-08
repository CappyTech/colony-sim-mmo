// models/subject.js
module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Additional attributes, e.g., statistics or resources
      stats: {
        type: DataTypes.JSON,
        defaultValue: {}
      }
    }, {
      timestamps: true,  // Adds `createdAt` and `updatedAt`
      paranoid: true     // Adds `deletedAt` for soft deletes
    });
  
    Subject.associate = models => {
      // A Subject belongs to a User
      Subject.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  
      // A Subject may own one or more Settlements
      Subject.hasMany(models.Settlement, { foreignKey: 'subjectId', as: 'settlements' });
  
      // A Subject may belong to a Faction
      Subject.belongsTo(models.Faction, { foreignKey: 'factionId', as: 'faction' });
  
      // Many-to-many association with Parties via a join table
      Subject.belongsToMany(models.Party, {
        through: 'PartySubjects',
        foreignKey: 'subjectId',
        as: 'parties'
      });
  
      // A Subject can have an Inventory (see Inventory model)
      Subject.hasMany(models.Inventory, { foreignKey: 'subjectId', as: 'inventoryItems' });
    };
  
    return Subject;
  };
  