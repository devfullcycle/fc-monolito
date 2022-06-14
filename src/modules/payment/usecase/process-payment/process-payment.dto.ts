export interface ProcessPaymentInputDto {
  orderId: string;
  amount: number;
}

export interface ProcessPaymentOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
