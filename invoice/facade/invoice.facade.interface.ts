import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "../usecase/find-invoice/find-invoice.usecase.dto";

export default interface InvoiceFacadeInterface {
    find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO>;
}