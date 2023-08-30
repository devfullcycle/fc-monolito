import ValueObject from "../../../@shared/domain/value-object/value-object.interface"

export default class Address implements ValueObject {
  _street: string = ""
  _number: string = ""
  _complement: string = ""
  _city: string = ""
  _state: string = ""
  _zipCode: string = ""

  constructor(street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
    this._street = street
    this._number = number
    this._complement = complement
    this._city = city
    this._state = state
    this._zipCode = zipCode

  }

  get street(): string {
    return this._street
  }

  get number(): string {
    return this._number
  }

  get complement(): string {
    return this._complement
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zipCode(): string {
    return this._zipCode
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required")
    }
    if (this._number.length === 0) {
      throw new Error("Number is required")
    }
    if (this._complement.length === 0) {
      throw new Error("Complement is required")
    }
    if (this._city.length === 0) {
      throw new Error("City is required")
    }
    if (this._state.length === 0) {
      throw new Error("State is required")
    }
    if (this._zipCode.length === 0) {
      throw new Error("Zip code is required")
    }
  }
}