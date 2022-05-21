import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findUsecase = new FindProductUseCase(productRepository);
    const findAllUsecase = new FindAllProductsUseCase(productRepository);

    const facade = new StoreCatalogFacade({
      findUseCase: findUsecase,
      findAllUsecase: findAllUsecase,
    });
    return facade;
  }
}
