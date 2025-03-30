// models/quest.js
module.exports = (sequelize, DataTypes) => {
    const Quest = sequelize.define('Quest', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM('pending', 'active', 'completed', 'failed'),
        defaultValue: 'pending'
      },
      rewards: {
        type: DataTypes.JSON,
        defaultValue: {}
      }
    }, {});
  
    Quest.associate = models => {
      // A Quest can be assigned to a Party or directly to a Subject.
      Quest.belongsTo(models.Party, { foreignKey: 'partyId', as: 'party' });
      Quest.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
    };
  
    return Quest;
  };
  