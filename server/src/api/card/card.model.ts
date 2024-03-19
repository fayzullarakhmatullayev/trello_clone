import { DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize';
import Task from '../task/task.model';

const Card = sequelize.define('card', {
  card_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});

Card.hasMany(Task, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
    name: 'card_id'
  }
});

export default Card;
