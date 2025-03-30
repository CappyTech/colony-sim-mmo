// models/player.js
module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      experience: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {});
  
    Player.associate = models => {
      // Each Player belongs to a User (account)
      Player.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      
      // A Player controls many subjects.
      Player.hasMany(models.subject, { foreignKey: 'playerId', as: 'subjects' });
    };
  
    return Player;
  };
  