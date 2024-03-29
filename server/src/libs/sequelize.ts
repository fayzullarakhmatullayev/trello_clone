import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_HOST!, {
  dialect: 'postgres',
  logging: false,
  retry: { max: 10 }
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const performMigration = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Migration successful!');
  } catch (error) {
    console.error('Error performing migration:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
};

export default sequelize;
