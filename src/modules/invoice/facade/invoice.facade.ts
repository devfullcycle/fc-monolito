import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO } from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export interface UseCaseProps {
  findUseCase: FindInvoiceUseCase,
  generateUseCase: GenerateInvoiceUseCase,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: FindInvoiceUseCase;
  private _generateUseCase: GenerateInvoiceUseCase;

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._generateUseCase = props.generateUseCase;
  }

  async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._findUseCase.execute(input);
  }

  async generate(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
    return await this._generateUseCase.execute(input);
  }
}
