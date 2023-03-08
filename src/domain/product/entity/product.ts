import ProductInterface from "./product.interface"

export default class Product implements ProductInterface {

  private _id: string
  private _name: string
  private _description: string
  private _salePrice: number

  constructor(id: string ,name: string, description: string ,salePrice: number) {

    this._id = id
    this._name = name
    this._description = description
    this._salePrice = salePrice
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

  get salePrice(): number {
    return this._salePrice
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

    if (this._salePrice === 0) {
      throw new Error("Sale Price cannot be zero")
    }

    return true
  }
}