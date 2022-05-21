export interface CheckStockInputDto {
  productId: string;
}

export interface CheckStockOutputDto {
  productId: string;
  stock: number;
}
