import { DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize';
import User from '../user/user.model';

const Card = sequelize.define('card', {
  card_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
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

Card.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Card, { foreignKey: 'user_id' });

export default Card;
