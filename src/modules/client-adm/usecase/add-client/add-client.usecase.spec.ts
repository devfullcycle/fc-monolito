import Address from "../../../@shared/domain/value-object/address"
import AddClientUseCase from "./add-client.usecase"

const MockRepository = () => {
  return {

    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Add Client use case unit test", () => {

  it("should add a client", async () => {

    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)

    const input = {
      name: "Lucian",
      email: "lucian@123.com",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
      )
    }

    const result =  await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.address).toEqual(input.address)

  })
})