import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
  };
};

describe("GenerateInvoiceUseCase test", () => {
  it("creates an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "invoice name",
      document: "5231632033",
      street: "address X",
      number: "123",
      complement: "house",
      city: "Joinville",
      state: "SC",
      zipCode: "89315963",
      items: [
        { id: "1", name: "product A", price: 200 },
        { id: "2", name: "product B", price: 400 }
      ]
    };

    const result = await usecase.execute(input);

    expect(repository.create).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toEqual(input.name);
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.number).toBe(input.number)
    expect(result.complement).toBe(input.complement)
    expect(result.city).toBe(input.city)
    expect(result.state).toBe(input.state)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.total).toBe(600);
    expect(result.items).toStrictEqual(
      [
        { id: "1", name: "product A", price: 200 },
        { id: "2", name: "product B", price: 400 }
      ]
    );
  });
});
