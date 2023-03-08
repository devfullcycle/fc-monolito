import Product from "../entity/product";

export default interface ProductGateway {
  create(product: Product): Promise<void>
}