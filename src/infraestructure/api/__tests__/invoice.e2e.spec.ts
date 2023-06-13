import { app } from "../express";
import request from "supertest";
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../modules/invoice/repository/product.model';
import InvoiceModel from '../../../modules/invoice/repository/invoice.model';
import InvoiceProductModel from '../../../modules/invoice/repository/invoice-product.model';

describe("E2E test for invoice", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceProductModel, ProductModel]);

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });


  it("creates and get the invoice", async () => {
    const { body: outputInvoiceCreated, status } = await request(app)
    .post("/invoice")
    .send({
        name: "invoice 1",
        document: "document 1",
        street: "data street",
        number: "data number",
        complement: "data complement",
        city: "data city",
        state: "data state",
        zipCode: "data zipCode",
        items: [
            {
                id: "1",
                name: "product 1",
                price: 100
            },
            {
                id: "2",
                name: "product 2",
                price: 200
            }
        ]
    });

    expect(status).toBe(200);

    expect(outputInvoiceCreated.name).toBe("invoice 1");
    expect(outputInvoiceCreated.document).toBe("document 1");
    expect(outputInvoiceCreated.items[0].name).toBe("product 1");
    expect(outputInvoiceCreated.items[0].price).toBe(100);
    expect(outputInvoiceCreated.items[1].name).toBe("product 2");
    expect(outputInvoiceCreated.items[1].price).toBe(200);
    expect(outputInvoiceCreated.street).toBe("data street")
    expect(outputInvoiceCreated.number).toBe("data number")
    expect(outputInvoiceCreated.complement).toBe("data complement")
    expect(outputInvoiceCreated.city).toBe("data city")
    expect(outputInvoiceCreated.state).toBe("data state")
    expect(outputInvoiceCreated.zipCode).toBe("data zipCode")

    const response = await request(app).get(`/invoice/${outputInvoiceCreated.id}`)

    expect(response.status).toBe(200);
  });
});
