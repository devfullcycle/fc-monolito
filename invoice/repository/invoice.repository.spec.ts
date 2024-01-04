import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "../../client-adm/repository/client.model";
import {InvoiceModel} from "./invoice.model";
import {InvoiceItemsModel} from "./invoice.items.model";
import InvoiceRepository from "./invoice.repository";
import * as Console from "console";


describe("Invoice repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    });

    it("Should find an invoice", async () => {

        const invoice = await InvoiceModel.create({
                id: "1",
                name: "Invoice 1",
                document: "doc 1",
                street: "Rua da Praia",
                number: "2034",
                complement: "Melhor AP",
                city: "Florianopolis",
                state: "SC",
                zipcode: "88888-123",
                items: [{
                    id: "item1",
                    name: "item 1",
                    price: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }],
                total:100,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {include: [InvoiceItemsModel]}
        )

        const repository = new InvoiceRepository();
        const result = await repository.find(invoice.id);

        expect(result.id.id).toEqual(invoice.id);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.street);
        expect(result.address.number).toEqual(invoice.number);
        expect(result.address.complement).toEqual(invoice.complement);
        expect(result.address.city).toEqual(invoice.city);
        expect(result.address.state).toEqual(invoice.state);
        expect(result.address.zipCode).toEqual(invoice.zipcode);

    })

})
