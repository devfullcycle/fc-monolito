import Address from "../../@shared/domain/value-object/address"

export interface AddClientFacadeInputDto {
  id?: string
  name: string
  email: string
  document: string
  address: Address
}

export interface FindClientFacadeInputDto {
  id: string
}

export interface FindClientFacadeOutputDto {
  id: string
  name: string
  email: string
  document: string
  address: Address
  createdAt: Date
  updatedAt: Date
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}
