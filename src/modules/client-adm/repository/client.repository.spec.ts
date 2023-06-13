import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientRepository from "./client.repository";
import ClientModel from "./client.model";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      document: "0000000",
      street: "16 avenus",
      number: "123",
      complement: "Ap 400",
      city: "My city",
      state: "State",
      zipCode: "89777310"
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1" } });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.document).toBe(client.document)
    expect(clientDb.street).toBe(client.street)
    expect(clientDb.number).toBe(client.number)
    expect(clientDb.complement).toBe(client.complement)
    expect(clientDb.city).toBe(client.city)
    expect(clientDb.state).toBe(client.state)
    expect(clientDb.zipCode).toBe(client.zipCode)
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      document: "0000000",
      street: "16 avenus",
      number: "123",
      complement: "Ap 400",
      city: "My city",
      state: "State",
      zipCode: "89777310",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document)
    expect(result.street).toEqual(client.street)
    expect(result.number).toEqual(client.number)
    expect(result.complement).toEqual(client.complement)
    expect(result.city).toEqual(client.city)
    expect(result.state).toEqual(client.state)
    expect(result.zipCode).toEqual(client.zipCode)
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});
