// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true,  // Adds `createdAt` and `updatedAt`
      paranoid: true     // Adds `deletedAt` for soft deletes
    });
  
    User.associate = models => {
      // A User controls one or more Subjects (player-controlled NPCs)
      User.hasMany(models.Player, { foreignKey: 'userId', as: 'players' });
    };
  
    return User;
  };
  