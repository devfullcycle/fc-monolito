
import Address from "../../../@shared/domain/value-object/address";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientUseCaseInputDto, FindClientUseCaseOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase {

  private _clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository
  }

  async execute(input: FindClientUseCaseInputDto): Promise<FindClientUseCaseOutputDto> {

    const result = await this._clientRepository.find(input.id)

    return {
      id: result.id.id,
      name: result.name,
      email: result.email,
      document: result.document,
      address: new Address(
        result.address.street,
        result.address.number,
        result.address.complement,
        result.address.city,
        result.address.state,
        result.address.zipCode,
      ),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }
  }
}