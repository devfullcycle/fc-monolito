import { join } from "path";
import { Sequelize } from "sequelize";
import { migrator } from "./migrator";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '../../../database.sqlite'),
  logging: true
})

migrator(sequelize).runAsCLI()