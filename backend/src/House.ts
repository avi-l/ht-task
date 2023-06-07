import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./database";

interface HouseAttributes {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  risk: number;
  image: string;
}

interface HouseCreationAttributes extends Optional<HouseAttributes, "id"> {}

interface HouseInstance
  extends Model<HouseAttributes, HouseCreationAttributes>,
    HouseAttributes {}

const House = sequelize.define<HouseInstance>(
  "House",
  {
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: process.env.DB_DATABASE,
  }
);

export default House;
