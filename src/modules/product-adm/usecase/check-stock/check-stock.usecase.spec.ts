import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product",
  description: "Product description",
  purchasePrice: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("CheckStock usecase unit test", () => {
  it("should get stock of a product", async () => {
    const ProductRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(ProductRepository);
    const input = {
      productId: "1",
    };

    const result = await checkStockUseCase.execute(input);

    expect(ProductRepository.find).toHaveBeenCalled();
    expect(result.productId).toBe("1");
    expect(result.stock).toBe(10);
  });
});
