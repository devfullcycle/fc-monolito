import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsOutputDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(): Promise<FindAllProductsOutputDto> {
    const product = await this.productRepository.findAll();

    return {
      products: product.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
