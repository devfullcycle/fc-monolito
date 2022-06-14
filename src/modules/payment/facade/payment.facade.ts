import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }
}
