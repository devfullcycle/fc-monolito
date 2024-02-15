import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Item from "../domain/item.entity";
import Address from "../../@shared/domain/value-object/address";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";
import { ProductModel } from "./product.model";

describe("Invoice Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
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
          name: "Produto 1",
          price: 100,
        }),
        new Item({
          id: new Id("2"),
          name: "Produto 2",
          price: 200,
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new InvoiceRepository();
    await repository.add(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "1" },
      include: [ProductModel],
    });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.id).toEqual(invoice.id.id);
    expect(invoiceDb.name).toEqual(invoice.name);
    expect(invoiceDb.document).toEqual(invoice.document);
    expect(invoiceDb.street).toEqual(invoice.address.street);
    expect(invoiceDb.number).toEqual(invoice.address.number);
    expect(invoiceDb.complement).toEqual(invoice.address.complement);
    expect(invoiceDb.city).toEqual(invoice.address.city);
    expect(invoiceDb.state).toEqual(invoice.address.state);
    expect(invoiceDb.zipCode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.products[0].id).toEqual(invoice.items[0].id.id);
    expect(invoiceDb.products[0].name).toEqual(invoice.items[0].name);
    expect(invoiceDb.products[0].price).toEqual(invoice.items[0].price);
    expect(invoiceDb.products[1].id).toEqual(invoice.items[1].id.id);
    expect(invoiceDb.products[1].name).toEqual(invoice.items[1].name);
    expect(invoiceDb.products[1].price).toEqual(invoice.items[1].price);
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt);
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt);
  });

  it("should find a invoice", async () => {
    const invoice = await InvoiceModel.create(
      {
        id: "1",
        name: "Lucian",
        document: "1234-5678",
        street: "Rua 123",
        number: "99",
        complement: "Casa Verde",
        city: "Criciúma",
        state: "SC",
        zipCode: "88888-888",
        products: [
          {
            id: "1",
            name: "Produto 1",
            price: 100,
          },
          {
            id: "2",
            name: "Produto 2",
            price: 200,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [ProductModel],
      }
    );

    const repository = new InvoiceRepository();
    const result = await repository.find(invoice.id);

    expect(result.id.id).toEqual(invoice.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.street).toEqual(invoice.street);
    expect(result.address.number).toEqual(invoice.number);
    expect(result.address.complement).toEqual(invoice.complement);
    expect(result.address.city).toEqual(invoice.city);
    expect(result.address.state).toEqual(invoice.state);
    expect(result.address.zipCode).toEqual(invoice.zipCode);
    expect(result.items[0].id.id).toEqual(invoice.products[0].id);
    expect(result.items[0].name).toEqual(invoice.products[0].name);
    expect(result.items[0].price).toEqual(invoice.products[0].price);
    expect(result.items[1].id.id).toEqual(invoice.products[1].id);
    expect(result.items[1].name).toEqual(invoice.products[1].name);
    expect(result.items[1].price).toEqual(invoice.products[1].price);
    expect(result.createdAt).toStrictEqual(invoice.createdAt);
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
  });

  it("should throw an error when invoice not found", async () => {
    const repository = new InvoiceRepository();

    try {
      await repository.find("1");
    } catch (error) {
      expect((error as Error).message).toBe("Invoice not found");
    }
  });
});
