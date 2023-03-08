import ProductRegistration from "./product-registration"

describe("Product Registration unit test", () => {

  it("should throw error when id is empty", () => {

    expect(() => {
      const productRegistration = new ProductRegistration("", "DDD", "Domain Driven Design", 25.90)
    }).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {

    expect(() => {
      const productRegistration = new ProductRegistration("1", "", "Domain Driven Design", 25.90)
    }).toThrowError("Name is required")
  })

  it("should throw error when description is empty", () => {

    expect(() => {
      const productRegistration = new ProductRegistration("1", "DDD", "", 25.90)
    }).toThrowError("Description is required")
  })


  it("should throw error when purchase price as zero", () => {

    expect(() => {
      const productRegistration = new ProductRegistration("1", "DDD", "Domain Driven Design", 0)
    }).toThrowError("Purchase Price cannot be zero")
  })
})