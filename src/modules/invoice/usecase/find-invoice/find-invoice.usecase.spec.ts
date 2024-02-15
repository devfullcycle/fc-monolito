import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Item from "../../domain/item.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe("Find invoice use case unit test", () => {
  const invoice = new Invoice({
    id: new Id("1"),
    name: "Lucian",
    document: "1234-5678",
    address: new Address(
      "Rua 123",
      "99",
      "Casa Verde",
      "Criciúma",
      "SC",
      "88888-888"
    ),
    items: [
      new Item({
        id: new Id("1"),
        name: "Product 1",
        price: 100,
      }),
      new Item({
        id: new Id("2"),
        name: "Product 2",
        price: 200,
      }),
    ],
  });

  const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
  };

  it("should find a invoice", async () => {
    const repository = MockRepository();
    const useCase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await useCase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.street).toEqual(invoice.address.street);
    expect(result.number).toEqual(invoice.address.number);
    expect(result.complement).toEqual(invoice.address.complement);
    expect(result.city).toEqual(invoice.address.city);
    expect(result.state).toEqual(invoice.address.state);
    expect(result.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items[0].id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.items[1].id).toEqual(invoice.items[1].id.id);
    expect(result.items[1].name).toEqual(invoice.items[1].name);
    expect(result.items[1].price).toEqual(invoice.items[1].price);
    expect(result.total).toEqual(invoice.total);
    expect(result.createdAt).toEqual(invoice.createdAt);
  });
});
