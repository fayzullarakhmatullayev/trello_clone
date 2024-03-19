import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false
  }
);

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
