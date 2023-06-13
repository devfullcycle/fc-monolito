import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import clientEntity from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGateway {
  async add(client: clientEntity): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
  async find(id: string): Promise<clientEntity> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new Error("Client not found");
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
