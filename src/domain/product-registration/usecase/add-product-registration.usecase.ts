import Id from "../../@shared/value-object/id.value-object";
import ProductRegistration from "../entity/product-registration";
import ProductRegistrationGateway from "../gateway/product-registration.gateway";
import { AddProductRegistrationInputDto, AddProductRegistrationOutputDto } from "./add-product-registration.dto";

export default class AddProductRegistrationUseCase {
  
  private productRegistrationRepository: ProductRegistrationGateway

  constructor(productRegistrationRepository: ProductRegistrationGateway) {
    this.productRegistrationRepository = productRegistrationRepository
  }

  async execute(input: AddProductRegistrationInputDto): Promise<AddProductRegistrationOutputDto> {

    const props = {
      id: input.id,
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice
    }

    const product = new ProductRegistration(props.id, props.name, props.description, props.purchasePrice)

    await this.productRegistrationRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice
    }
  }
}