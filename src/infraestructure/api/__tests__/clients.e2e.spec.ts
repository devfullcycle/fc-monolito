import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const input = {
      name: 'My client',
      document: '000000000',
      email: 'test@domain.com',
      street: "16 avenus",
      number: "123",
      complement: "Ap 400",
      city: "My city",
      state: "State",
      zipCode: "89777310",
    };
    const response = await request(app)
      .post("/clients")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(input.name);
    expect(response.body.document).toBe(input.document);
    expect(response.body.email).toBe(input.email);
    expect(response.body.street).toBe(input.street)
    expect(response.body.number).toBe(input.number)
    expect(response.body.complement).toBe(input.complement)
    expect(response.body.city).toBe(input.city)
    expect(response.body.state).toBe(input.state)
    expect(response.body.zipCode).toBe(input.zipCode)
  });
});
