import ProductRegistration from "../entity/product-registration";

export default interface ProductRegistrationGateway {
  create(productRegistration: ProductRegistration): Promise<void>
}