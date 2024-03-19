import { DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize';
import Card from '../card/card.model';

const Task = sequelize.define('task', {
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Card,
      key: 'card_id'
    }
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});

Task.belongsTo(Card, { foreignKey: 'card_id' });
Card.hasMany(Task, { foreignKey: 'card_id' });

export default Task;
