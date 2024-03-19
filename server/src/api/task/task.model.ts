import { DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize';

const Task = sequelize.define('task', {
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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

export default Task;
