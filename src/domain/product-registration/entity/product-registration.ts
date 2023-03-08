import ProductRepositoryInterface from "./product-registration.interface"

export default class ProductRegistration implements ProductRepositoryInterface{

  private _id: string
  private _name: string
  private _description: string
  private _purchasePrice: number

  constructor(id: string, name: string, description: string, purchasePrice: number) {

    this._id = id
    this._name = name
    this._description = description
    this._purchasePrice = purchasePrice
    this.validate()
  }

  get id(): string {
    return this._id
  }  

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get purchasePrice(): number {
    return this._purchasePrice
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required")
    }

    if (this._name.length === 0) {
      throw new Error("Name is required")
    }

    if (this.description.length === 0) {
      throw new Error("Description is required")
    }

    if (this._purchasePrice === 0) {
      throw new Error("Purchase Price cannot be zero")
    }

    return true
  }
}