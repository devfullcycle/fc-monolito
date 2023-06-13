import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("creates a product", async () => {
    const input = {
      name: "Shirt",
      description: "T-Shirt description",
      stock: 1,
      price: 100,
    }

    const response = await request(app)
      .post("/products")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(input.name);
    expect(response.body.description).toBe(input.description);
    expect(response.body.purchasePrice).toBe(input.price);
    expect(response.body.stock).toBe(input.stock);
  });
});
