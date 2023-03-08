import Product from "./product"

describe("Product unit test", () => {

  it("should throw error when id is empty", () => {

    expect(() => {
      const product = new Product("", "DDD", "Domain Driven Design", 69.90)
    }).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {
    
    expect(() => {
      const product = new Product("1", "", "Domain Driven Design", 69.90)
    }).toThrowError("Name is required")
  })

  it("should throw error when description is empty", () => {
    
    expect(() => {
      const product = new Product("1", "DDD", "", 69.90)
    }).toThrowError("Description is required")
  })

  it("should throw error when sale price as zero", () => {
    
    expect(() => {
      const product = new Product("1", "DDD", "Domain Driven Design", 0)
    }).toThrowError("Sale Price cannot be zero")
  })
})