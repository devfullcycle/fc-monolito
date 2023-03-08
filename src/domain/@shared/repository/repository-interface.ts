export default interface RepositoryInterface<T> {

  create(entity: T): Promise<void>
}