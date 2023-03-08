import ProductRegistration from "../../domain/product-registration/entity/product-registration";
import ProductRegistrationRepositoryInterface from "../../domain/product-registration/repository/product-registration.interface";
import ProductRegistrationModel from "./product-registration.model";

export default class ProductRegistrationRepository implements ProductRegistrationRepositoryInterface {

  async create(entity: ProductRegistration): Promise<void> {
    await ProductRegistrationModel.create({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      purchasePrice: entity.purchasePrice
    })
  }
}