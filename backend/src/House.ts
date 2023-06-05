import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database';


interface HouseAttributes {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  risk: number;
}

interface HouseCreationAttributes extends Optional<HouseAttributes, 'id'> {}

interface HouseInstance
  extends Model<HouseAttributes, HouseCreationAttributes>,
    HouseAttributes {}

const House = sequelize.define<HouseInstance>('House', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  loanAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  risk: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: process.env.DB_DATABASE,
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
  
      // Perform a test query
      const house = await House.findOne();
      console.log('First house record:', house?.toJSON());
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

export default House;
