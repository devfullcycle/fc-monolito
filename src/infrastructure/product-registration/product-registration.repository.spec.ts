import { Sequelize } from "sequelize-typescript"
import ProductRegistrationModel from "./product-registration.model"
import ProductRegistrationRepository from "./product-registration.repository"
import ProductRegistration from "../../domain/product-registration/entity/product-registration"

describe("Product registration repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductRegistrationModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product registration", async () => {

    const input = {
      id: "1",
      name: "DDD",
      description: "Domain Driven Design",
      purchasePrice: 25.90
    }

    const productRegistrationRepository = new ProductRegistrationRepository()
    const productRegistration = new ProductRegistration(input.id, input.name, input.description, input.purchasePrice)

    await productRegistrationRepository.create(productRegistration)
    
    const productRegistrationModel = await ProductRegistrationModel.findOne({
      where: { id: input.id }
    })

    expect(productRegistrationModel.toJSON()).toStrictEqual({
      id: input.id,
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice
    })
  })
})