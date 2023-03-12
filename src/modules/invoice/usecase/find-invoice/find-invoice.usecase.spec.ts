import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../../@shared/domain/value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "invoice name",
  document: "5231632033",
  address: new Address({
    street: "address X",
    number: "123",
    complement: "house",
    city: "Joinville",
    state: "SC",
    zipCode: "89315963"
  }),
  items: [
    new Product({
      id: new Id("1"),
      name: "product A",
      price: 200
    }),
    new Product({
      id: new Id("2"),
      name: "product B",
      price: 400
    })
  ]
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("FindInvoiceUseCase test", () => {
  it("finds an invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = { id: "1" };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address).toBe(invoice.address);
    expect(result.total).toBe(600);
    expect(result.items).toStrictEqual(
      [
        { id: "1", name: "product A", price: 200 },
        { id: "2", name: "product B", price: 400 }
      ]
    );
  });
});
