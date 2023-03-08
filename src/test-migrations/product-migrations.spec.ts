import { Sequelize } from "sequelize-typescript"
import express, { Express } from 'express'
import request from 'supertest'
import { migrator } from "./config-migrations/migrator"
import ProductRegistrationModel from "../infrastructure/product-registration/product-registration.model"
import ProductModel from "../infrastructure/product/repository/sequelize/product.model"
import { productRegistrationRoute, productRoute } from "./routeProduct"
import { Umzug } from "umzug"

describe("Products tests", () => {

  const app: Express = express()
  app.use(express.json())
  app.use("/product-registration", productRegistrationRoute)
  app.use("/product", productRoute)

  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false
    })
    
    sequelize.addModels([ProductModel, ProductRegistrationModel])
    migration = migrator(sequelize)
    await migration.up()
  })

  afterEach(async () => {
    if (!migration || !sequelize) {
      return 
    }
    migration = migrator(sequelize)
    await migration.down()
    await sequelize.close()
  })
  it("should create product registration", async () => {

    const response = await request(app).post("/product-registration").send({
      id: "1",
      name: "DDD",
      description: "Domain Driven Design",
      purchasePrice: 25.90
    })

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("DDD")
    expect(response.body.description).toBe("Domain Driven Design")
    expect(response.body.purchasePrice).toBe(25.90)
  })

  it("should create product", async () => {

    const response = await request(app).post("/product").send({
      id: "2",
      name: "DDD",
      description: "Domain Driven Design",
      salePrice: 59.90
    })

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("DDD")
    expect(response.body.description).toBe("Domain Driven Design")
    expect(response.body.salePrice).toBe(59.90)
  })
})