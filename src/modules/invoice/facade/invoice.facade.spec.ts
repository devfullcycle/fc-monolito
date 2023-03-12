import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import InvoiceProductModel from "../repository/invoice-product.model";
import InvoiceModel from "../repository/invoice.model";
import ProductModel from "../repository/product.model";
import { FindInvoiceFacadeInputDTO, GenerateInvoiceFacadeInputDTO } from "./invoice.facade.dto";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceProductModel, ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  describe("GenerateInvoiceUseCase", () => {
    it("creates an invoice", async () => {
      const facade = InvoiceFacadeFactory.create();

      const input: GenerateInvoiceFacadeInputDTO = {
        name: "John Doe",
        document: "12345678901",
        street: "Street",
        number: "123",
        complement: "Complement",
        city: "City",
        state: "State",
        zipCode: "12345678",
        items: [
          {
            id: "1",
            name: "Product 1",
            price: 100,
          },
          {
            id: "2",
            name: "Product 2",
            price: 200,
          },
        ],
      };

      const output = await facade.generate(input);

      expect(output.id).toBeDefined();
      expect(output.name).toBe(input.name);
      expect(output.document).toBe(input.document);
      expect(output.street).toBe(input.street);
      expect(output.number).toBe(input.number);
      expect(output.complement).toBe(input.complement);
      expect(output.city).toBe(input.city);
      expect(output.state).toBe(input.state);
      expect(output.zipCode).toBe(input.zipCode);
      expect(output.items.length).toBe(2);
      expect(output.items[0].id).toBeDefined();
      expect(output.items[0].name).toBe(input.items[0].name);
      expect(output.items[0].price).toBe(input.items[0].price);
      expect(output.items[1].id).toBeDefined();
      expect(output.items[1].name).toBe(input.items[1].name);
      expect(output.items[1].price).toBe(input.items[1].price);
      expect(output.total).toBe(input.items.reduce((total, item) => total + item.price, 0));
    });
  })

  describe("GenerateInvoiceUseCase", () => {
    it("finds an invoice", async () => {
      const facade = InvoiceFacadeFactory.create();

      const invoice = await InvoiceModel.create({
        id: "1",
        name: "John Doe",
        document: "12345678901",
        address_street: "Street",
        address_number: "123",
        address_complement: "Complement",
        address_city: "City",
        address_state: "State",
        address_zipCode: "12345678",
        items: [
          {
            id: "1",
            name: "product A",
            price: 200
          },
          {
            id: "2",
            name: "product B",
            price: 400
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input: FindInvoiceFacadeInputDTO = { id: "1" };

      const output = await facade.find(input);

      expect(output.id).toBe(invoice.id);
      expect(output.name).toBe(invoice.name);
      expect(output.document).toBe(invoice.document);
      expect(output.address.street).toBe(invoice.address_street);
      expect(output.address.number).toBe(invoice.address_number);
      expect(output.address.complement).toBe(invoice.address_complement);
      expect(output.address.city).toBe(invoice.address_city);
      expect(output.address.state).toBe(invoice.address_state);
      expect(output.address.zipCode).toBe(invoice.address_zipCode);
    });

    it("throws an error when invoice not found", async () => {
      const facade = InvoiceFacadeFactory.create();

      const input: FindInvoiceFacadeInputDTO = { id: "1" };

      await expect(facade.find(input)).rejects.toThrow("Invoice not found");
    });
  })
});
