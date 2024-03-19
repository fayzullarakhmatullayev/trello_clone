import { DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize';
import Card from '../card/card.model';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});

User.hasMany(Card, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
    name: 'user_id'
  }
});

export default User;
