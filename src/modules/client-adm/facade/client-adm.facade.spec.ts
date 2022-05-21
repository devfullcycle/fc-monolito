import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacade from "./client-adm.facade";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client!.name).toBe(input.name);
    expect(client!.email).toBe(input.email);
    expect(client!.address).toBe(input.address);
  });

  it("it should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    await facade.add(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client!.id).toBe(input.id);
    expect(client!.name).toBe(input.name);
    expect(client!.email).toBe(input.email);
    expect(client!.address).toBe(input.address);
  });
});
