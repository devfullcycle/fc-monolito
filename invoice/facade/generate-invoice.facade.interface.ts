import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "../usecase/generate-invoice/generate-invoice.usecase.dto";

export default interface GenerateInvoiceFacadeInterface{
    generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>;
}