export default interface UseCaseInterface {
  execute(input: any): Promise<any>;
}
