import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUsecase = usecasesProps.addUseCase;
    this._checkStockUsecase = usecasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
    return this._addUsecase.execute(input);
  }
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }
}
