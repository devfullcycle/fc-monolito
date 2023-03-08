export default interface ProductRepositoryInterface {

  get id(): string
  get name(): string
  get description(): string
  get purchasePrice(): number
}