import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"
import Product from "../../../../domain/product/entity/product"

describe("Product repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {

    const input = {
      id: "1",
      name: "DDD",
      description: "Domain Driven Design",
      salePrice: 69.90
    }

    const productRepository = new ProductRepository()
    const product = new Product(input.id, input.name, input.description, input.salePrice)

    await productRepository.create(product)
    
    const productModel = await ProductModel.findOne({
      where: { id: input.id }
    })

    expect(productModel.toJSON()).toStrictEqual({
      id: input.id,
      name: input.name,
      description: input.description,
      salePrice: input.salePrice
    })
  })
})