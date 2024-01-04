import Invoice from "../../domain/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/InvoiceItems.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";


const invoice = new Invoice({
    id: new Id("1"),
    name: "Mathias",
    document: "99-888",
    address: new Address(
        "Rua A",
        "88",
        "Casa Azul",
        "Tallinn",
        "Harjumaa",
        "987556",
    ),
    items: [new InvoiceItems({
        id: new Id("2"),
        name: "Phone",
        price: 500
    }),
        new InvoiceItems({
            id: new Id("3"),
            name: "Phone Cover",
            price: 5
        })],
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("Find invoice use case unit test", () => {
    it("should find a client", async ()=> {
        // const repository = MockRepository();
        // const usecase = new FindInvoiceUsecase(repository);
        //
        // const input = {
        //     id: "1"
        // }

        // const result = await usecase.execute(input);
        //
        // expect(repository.find).toBeCalled()
        // expect(result.id).toEqual(input.id);
        // expect(result.name).toEqual(invoice.name);
        // expect(result.document).toEqual(invoice.document);
        // expect(result.address).toEqual(invoice.address);
        // expect(result.items).toEqual(invoice.items);
        // expect(result.createdAt).toEqual(invoice.createdAt)
        // expect(result.updatedAt).toEqual(invoice.updatedAt)
    })
})
